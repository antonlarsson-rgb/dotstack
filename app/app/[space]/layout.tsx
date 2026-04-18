import { SpaceNav } from "@/components/app/SpaceNav";

export default function SpaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-full">
      <SpaceNav />
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}
