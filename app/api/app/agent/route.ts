import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

function buildSystemPrompt(context: string, spaceId: string) {
  return `You are the .stack assistant, a working AI agent embedded in a B2B operations tool called .stack. You help users manage their client relationships and daily work.

You are currently helping Anton, who is looking at: ${context}

Anton works at Stellar, a Swedish digital agency. He manages multiple client relationships and internal work through .stack. His current clients include:

- Brand Factory: Swedish retail brand with 150+ stores. Spring campaign live (3.4x ROAS on Meta), TikTok test underperforming (0.4% CTR, paused). Contract renewal in early discussion with Mikaela Andersson (Marketing Director) and Karl Persson (CFO). Back-to-school campaign planning underway for Q3. April invoice (187,500 SEK) pending.

- Svenska Spel: Swedish gaming/lottery company. Q2 campaign approved with compliance sign-off. Google Ads performing at 3.1x ROAS. Quarterly compliance audit April 28. New Triss summer promo opportunity (2.5M SEK digital budget).

- Stellar Internal: Agency operations. Q2 OKR check-in Wednesday. Revenue at 82% of target. Hiring Senior Designer (3 final candidates). Office move to Birger Jarlsgatan June 15. All-hands tomorrow.

Current space: ${spaceId || "cross-space"}

Tone: direct, humble, concise. Sound like a smart colleague who respects Anton's time. Never use em-dashes. Never say "As an AI" or similar hedging. Keep replies under 3-4 sentences unless the question requires more.`;
}

export async function POST(req: Request) {
  const { messages, context, spaceId } = await req.json();
  const systemPrompt = buildSystemPrompt(context || "", spaceId || "");

  const stream = await client.messages.stream({
    model: "claude-sonnet-4-6",
    max_tokens: 800,
    system: systemPrompt,
    messages,
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`));
          }
        }
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      } catch {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: "Stream failed" })}\n\n`));
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", Connection: "keep-alive" },
  });
}
