export function formatSek(n: number, options?: { compact?: boolean }) {
  if (options?.compact && Math.abs(n) >= 1_000_000) {
    return `${(n / 1_000_000).toFixed(1)}M SEK`;
  }
  if (options?.compact && Math.abs(n) >= 1_000) {
    return `${(n / 1_000).toFixed(0)}k SEK`;
  }
  return `${n.toLocaleString("sv-SE")} SEK`;
}
