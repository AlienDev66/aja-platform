"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  defaultSettings,
  type AppSettings,
  organigram as defaultOrg,
  type OrgNode,
} from "./aja";

type Ctx = {
  settings: AppSettings;
  setSettings: (s: AppSettings | ((prev: AppSettings) => AppSettings)) => void;
  org: OrgNode;
  setOrg: (o: OrgNode | ((prev: OrgNode) => OrgNode)) => void;
  reset: () => void;
};

const SettingsContext = createContext<Ctx | null>(null);

const SK = "aja-digital-settings";
const OK = "aja-digital-organigram";

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettingsState] = useState<AppSettings>(defaultSettings);
  const [org, setOrgState] = useState<OrgNode>(defaultOrg);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const s = localStorage.getItem(SK);
      const o = localStorage.getItem(OK);
      if (s) setSettingsState({ ...defaultSettings, ...JSON.parse(s) });
      if (o) setOrgState(JSON.parse(o));
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const setSettings = useCallback((s: AppSettings | ((p: AppSettings) => AppSettings)) => {
    setSettingsState((prev) => {
      const next = typeof s === "function" ? s(prev) : s;
      localStorage.setItem(SK, JSON.stringify(next));
      return next;
    });
  }, []);

  const setOrg = useCallback((o: OrgNode | ((p: OrgNode) => OrgNode)) => {
    setOrgState((prev) => {
      const next = typeof o === "function" ? o(prev) : o;
      localStorage.setItem(OK, JSON.stringify(next));
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setSettingsState(defaultSettings);
    setOrgState(defaultOrg);
    localStorage.removeItem(SK);
    localStorage.removeItem(OK);
  }, []);

  const value = useMemo(
    () => ({ settings, setSettings, org, setOrg, reset }),
    [settings, setSettings, org, setOrg, reset]
  );

  if (!ready) {
    return <div className="min-h-screen bg-navy" />;
  }

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings outside provider");
  return ctx;
}
