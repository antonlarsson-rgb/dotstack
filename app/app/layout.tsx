import { AppProvider } from "@/lib/app/AppContext";
import { NavigationRail } from "@/components/app/NavigationRail";
import { AppTopBar } from "@/components/app/TopBar";
import { ContextRail } from "@/components/app/ContextRail";
import { StatusStrip } from "@/components/app/StatusStrip";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <div className="h-screen flex flex-col bg-[var(--app-bg)] overflow-hidden">
        <AppTopBar />
        <div className="flex flex-1 min-h-0">
          <NavigationRail />
          <main className="flex-1 min-w-0 overflow-y-auto bg-[var(--app-surface)]">
            {children}
          </main>
          <ContextRail />
        </div>
        <StatusStrip />
      </div>
    </AppProvider>
  );
}
