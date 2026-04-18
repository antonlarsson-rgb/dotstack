"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface AppContextType {
  contextRailOpen: boolean;
  setContextRailOpen: (open: boolean) => void;
  agentMessages: { role: "user" | "assistant"; content: string }[];
  setAgentMessages: React.Dispatch<React.SetStateAction<{ role: "user" | "assistant"; content: string }[]>>;
  selectedItem: { type: string; id: string; label: string } | null;
  setSelectedItem: (item: { type: string; id: string; label: string } | null) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [contextRailOpen, setContextRailOpen] = useState(true);
  const [agentMessages, setAgentMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [selectedItem, setSelectedItem] = useState<{ type: string; id: string; label: string } | null>(null);

  return (
    <AppContext.Provider value={{ contextRailOpen, setContextRailOpen, agentMessages, setAgentMessages, selectedItem, setSelectedItem }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
}
