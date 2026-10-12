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
  assembleias as seedAssembleias,
  comunicados as seedComunicados,
  courses as seedCourses,
  eventos as seedEventos,
  members as seedMembers,
  protectCases as seedProtect,
  quotas as seedQuotas,
} from "./aja";

export type Member = {
  id: string;
  name: string;
  province: string;
  instance: string;
  quota: string;
  email?: string;
  memberId?: string;
  active?: boolean;
  title?: string;
  phone?: string;
  since?: string;
};

export type Comunicado = {
  id: string;
  title: string;
  date: string;
  audience: string;
  channels: string[];
  body: string;
  author: string;
};

export type Evento = {
  id: string;
  date: string;
  title: string;
  place: string;
  time: string;
  type: string;
  seats: number;
  enrolled: number;
  status: "inscrito" | "aberto" | "breve" | "encerrado";
  enrolledIds?: string[];
  description?: string;
  isAssembleia?: boolean;
  orderOfBusiness?: string[];
};

export type ProtectCase = {
  id: string;
  ref: string;
  subject: string;
  status: string;
  updated: string;
  body?: string;
  category?: string;
  urgency?: "normal" | "alta" | "urgente";
  timeline?: { at: string; note: string }[];
};

export type QuotaRow = {
  period: string;
  status: string;
  amount: string;
  paidAt: string;
  memberId?: string;
};

export type VoteOption = {
  id: string;
  label: string;
  votes: number;
};

export type Voting = {
  id: string;
  title: string;
  assembleiaId?: string;
  assembleiaTitle: string;
  description: string;
  status: "rascunho" | "aberta" | "encerrada";
  opensAt: string;
  closesAt: string;
  options: VoteOption[];
  votedBy: string[];
  quorum: number;
  eligible: number;
};

export type FinanceEntry = {
  id: string;
  date: string;
  type: "receita" | "despesa";
  category: string;
  description: string;
  amount: number;
  method: string;
  ref?: string;
};

type Store = {
  members: Member[];
  comunicados: Comunicado[];
  eventos: Evento[];
  quotas: QuotaRow[];
  protect: ProtectCase[];
  votings: Voting[];
  finances: FinanceEntry[];
  courses: typeof seedCourses;
  assembleias: typeof seedAssembleias;
  addMember: (m: Omit<Member, "id">) => void;
  importMembers: (rows: Omit<Member, "id">[]) => void;
  updateMember: (id: string, patch: Partial<Member>) => void;
  removeMember: (id: string) => void;
  addComunicado: (c: Omit<Comunicado, "id" | "date">) => void;
  addEvento: (e: Omit<Evento, "id" | "enrolled" | "status"> & { status?: Evento["status"] }) => void;
  importEventos: (rows: Omit<Evento, "id" | "enrolled" | "status">[]) => void;
  enrollEvento: (eventId: string, memberId: string) => void;
  markQuotaPaid: (period: string) => void;
  importQuotas: (rows: QuotaRow[]) => void;
  addProtect: (input: {
    subject: string;
    body: string;
    category?: string;
    urgency?: ProtectCase["urgency"];
  }) => void;
  updateProtectStatus: (id: string, status: string, note?: string) => void;
  addVoting: (v: Omit<Voting, "id" | "votedBy" | "options"> & { options: string[] }) => void;
  openVoting: (id: string) => void;
  closeVoting: (id: string) => void;
  castVote: (votingId: string, optionId: string, memberId: string) => void;
  addFinance: (e: Omit<FinanceEntry, "id">) => void;
  importFinances: (rows: Omit<FinanceEntry, "id">[]) => void;
  ready: boolean;
};

const StoreContext = createContext<Store | null>(null);
const KEY = "aja-digital-live-store-v2";

function uid(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}

const seedVotings: Voting[] = [
  {
    id: "v1",
    title: "Aprovação da ordem de trabalhos",
    assembleiaTitle: "Assembleia Geral Ordinária 2026",
    assembleiaId: "g1",
    description:
      "Votação preliminar da ordem de trabalhos da AG Ordinária de 18 de Novembro de 2026.",
    status: "aberta",
    opensAt: "2026-11-18T09:30",
    closesAt: "2026-11-18T10:00",
    options: [
      { id: "o1", label: "Aprovar", votes: 89 },
      { id: "o2", label: "Rejeitar", votes: 4 },
      { id: "o3", label: "Abstenção", votes: 7 },
    ],
    votedBy: [],
    quorum: 50,
    eligible: 300,
  },
  {
    id: "v2",
    title: "Aprovação do relatório de contas 2025",
    assembleiaTitle: "Assembleia Geral Ordinária 2026",
    assembleiaId: "g1",
    description: "Deliberação sobre o relatório de contas apresentado pela Tesouraria.",
    status: "rascunho",
    opensAt: "2026-11-18T11:00",
    closesAt: "2026-11-18T11:45",
    options: [
      { id: "o1", label: "Aprovar", votes: 0 },
      { id: "o2", label: "Rejeitar", votes: 0 },
      { id: "o3", label: "Abstenção", votes: 0 },
    ],
    votedBy: [],
    quorum: 50,
    eligible: 300,
  },
];

const seedFinances: FinanceEntry[] = [
  {
    id: "f1",
    date: "2026-10-02",
    type: "receita",
    category: "Quotas",
    description: "Quotas 4.º trim. — lote bancário",
    amount: 2450000,
    method: "Transferência",
    ref: "TRF-4412",
  },
  {
    id: "f2",
    date: "2026-09-28",
    type: "despesa",
    category: "Eventos",
    description: "Sala e logística UIJLP (preparativos)",
    amount: 380000,
    method: "Transferência",
    ref: "DES-882",
  },
  {
    id: "f3",
    date: "2026-09-15",
    type: "despesa",
    category: "Formação",
    description: "Material Academy · Dialéctica",
    amount: 125000,
    method: "Numerário",
    ref: "DES-871",
  },
  {
    id: "f4",
    date: "2026-08-20",
    type: "receita",
    category: "Quotas",
    description: "Quotas 3.º trim. — regularizações",
    amount: 1890000,
    method: "Transferência",
    ref: "TRF-4390",
  },
  {
    id: "f5",
    date: "2026-08-01",
    type: "despesa",
    category: "Institucional",
    description: "Deslocações representantes provinciais",
    amount: 210000,
    method: "Transferência",
    ref: "DES-850",
  },
];

const seedProtectFull: ProtectCase[] = seedProtect.map((p, i) => ({
  ...p,
  category: i === 0 ? "Apoio institucional" : "Independência funcional",
  urgency: (i === 0 ? "alta" : "normal") as ProtectCase["urgency"],
  body: "Pedido registado pelo canal Protect. Conteúdo confidencial visível apenas à Direcção autorizada.",
  timeline: [
    { at: p.updated, note: `Estado: ${p.status}` },
    { at: "2026-09-18", note: "Pedido recebido e numerado" },
  ],
}));

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [members, setMembers] = useState<Member[]>(
    seedMembers.map((m) => ({
      ...m,
      active: true,
      memberId: `AJA-2015-${m.id.padStart(4, "0")}`,
      title: (m as { title?: string }).title || "Juiz de Direito",
      since: "2018",
    }))
  );
  const [comunicados, setComunicados] = useState<Comunicado[]>(seedComunicados);
  const [eventos, setEventos] = useState<Evento[]>(
    seedEventos.map((e) => ({
      ...e,
      enrolledIds: [],
      isAssembleia: e.type === "Governação",
      description:
        e.type === "Governação"
          ? "Assembleia com ordem de trabalhos e votações eletrónicas."
          : undefined,
      orderOfBusiness:
        e.type === "Governação"
          ? ["Abertura", "Ordem de trabalhos", "Relatório de contas", "Deliberações", "Encerramento"]
          : undefined,
    }))
  );
  const [quotas, setQuotas] = useState<QuotaRow[]>(seedQuotas);
  const [protect, setProtect] = useState<ProtectCase[]>(seedProtectFull);
  const [votings, setVotings] = useState<Voting[]>(seedVotings);
  const [finances, setFinances] = useState<FinanceEntry[]>(seedFinances);
  const [courses] = useState(seedCourses);
  const [assembleias] = useState(seedAssembleias);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const data = JSON.parse(raw);
        if (data.members) setMembers(data.members);
        if (data.comunicados) setComunicados(data.comunicados);
        if (data.eventos) setEventos(data.eventos);
        if (data.quotas) setQuotas(data.quotas);
        if (data.protect) setProtect(data.protect);
        if (data.votings) setVotings(data.votings);
        if (data.finances) setFinances(data.finances);
      }
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(
      KEY,
      JSON.stringify({ members, comunicados, eventos, quotas, protect, votings, finances })
    );
  }, [ready, members, comunicados, eventos, quotas, protect, votings, finances]);

  const addMember = useCallback((m: Omit<Member, "id">) => {
    setMembers((prev) => [
      { ...m, id: uid("m"), active: true, memberId: m.memberId || uid("AJA").toUpperCase() },
      ...prev,
    ]);
  }, []);

  const importMembers = useCallback((rows: Omit<Member, "id">[]) => {
    setMembers((prev) => [
      ...rows.map((m) => ({
        ...m,
        id: uid("m"),
        active: true,
        memberId: m.memberId || uid("AJA").toUpperCase(),
      })),
      ...prev,
    ]);
  }, []);

  const updateMember = useCallback((id: string, patch: Partial<Member>) => {
    setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, ...patch } : m)));
  }, []);

  const removeMember = useCallback((id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const addComunicado = useCallback((c: Omit<Comunicado, "id" | "date">) => {
    setComunicados((prev) => [
      {
        ...c,
        id: uid("c"),
        date: new Date().toISOString().slice(0, 10),
      },
      ...prev,
    ]);
  }, []);

  const addEvento = useCallback(
    (e: Omit<Evento, "id" | "enrolled" | "status"> & { status?: Evento["status"] }) => {
      setEventos((prev) => [
        {
          ...e,
          id: uid("e"),
          enrolled: 0,
          status: e.status || "aberto",
          enrolledIds: [],
        },
        ...prev,
      ]);
    },
    []
  );

  const importEventos = useCallback((rows: Omit<Evento, "id" | "enrolled" | "status">[]) => {
    setEventos((prev) => [
      ...rows.map((e) => ({
        ...e,
        id: uid("e"),
        enrolled: 0,
        status: "aberto" as const,
        enrolledIds: [],
      })),
      ...prev,
    ]);
  }, []);

  const enrollEvento = useCallback((eventId: string, memberId: string) => {
    setEventos((prev) =>
      prev.map((e) => {
        if (e.id !== eventId) return e;
        const ids = e.enrolledIds || [];
        if (ids.includes(memberId)) {
          return {
            ...e,
            enrolledIds: ids.filter((x) => x !== memberId),
            enrolled: Math.max(0, e.enrolled - 1),
          };
        }
        return {
          ...e,
          enrolledIds: [...ids, memberId],
          enrolled: e.enrolled + 1,
        };
      })
    );
  }, []);

  const markQuotaPaid = useCallback((period: string) => {
    setQuotas((prev) =>
      prev.map((q) =>
        q.period === period
          ? { ...q, status: "Pago", paidAt: new Date().toISOString().slice(0, 10) }
          : q
      )
    );
  }, []);

  const importQuotas = useCallback((rows: QuotaRow[]) => {
    setQuotas((prev) => [...rows, ...prev]);
  }, []);

  const addProtect = useCallback(
    (input: {
      subject: string;
      body: string;
      category?: string;
      urgency?: ProtectCase["urgency"];
    }) => {
      const today = new Date().toISOString().slice(0, 10);
      setProtect((prev) => {
        const n = prev.length + 15;
        return [
          {
            id: uid("p"),
            ref: `PROT-${new Date().getFullYear()}-${String(n).padStart(3, "0")}`,
            subject: input.subject,
            body: input.body,
            category: input.category || "Geral",
            urgency: input.urgency || "normal",
            status: "Recebido",
            updated: today,
            timeline: [
              { at: today, note: "Pedido recebido e numerado" },
              { at: today, note: "Aguarda triagem da Comissão de Defesa" },
            ],
          },
          ...prev,
        ];
      });
    },
    []
  );

  const updateProtectStatus = useCallback((id: string, status: string, note?: string) => {
    const today = new Date().toISOString().slice(0, 10);
    setProtect((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              status,
              updated: today,
              timeline: [
                { at: today, note: note || `Estado actualizado para: ${status}` },
                ...(p.timeline || []),
              ],
            }
          : p
      )
    );
  }, []);

  const addVoting = useCallback(
    (v: Omit<Voting, "id" | "votedBy" | "options"> & { options: string[] }) => {
      setVotings((prev) => [
        {
          ...v,
          id: uid("v"),
          votedBy: [],
          options: v.options.map((label, i) => ({
            id: `opt-${i}`,
            label,
            votes: 0,
          })),
        },
        ...prev,
      ]);
    },
    []
  );

  const openVoting = useCallback((id: string) => {
    setVotings((prev) => prev.map((v) => (v.id === id ? { ...v, status: "aberta" } : v)));
  }, []);

  const closeVoting = useCallback((id: string) => {
    setVotings((prev) => prev.map((v) => (v.id === id ? { ...v, status: "encerrada" } : v)));
  }, []);

  const castVote = useCallback((votingId: string, optionId: string, memberId: string) => {
    setVotings((prev) =>
      prev.map((v) => {
        if (v.id !== votingId || v.status !== "aberta" || v.votedBy.includes(memberId)) return v;
        return {
          ...v,
          votedBy: [...v.votedBy, memberId],
          options: v.options.map((o) =>
            o.id === optionId ? { ...o, votes: o.votes + 1 } : o
          ),
        };
      })
    );
  }, []);

  const addFinance = useCallback((e: Omit<FinanceEntry, "id">) => {
    setFinances((prev) => [{ ...e, id: uid("f") }, ...prev]);
  }, []);

  const importFinances = useCallback((rows: Omit<FinanceEntry, "id">[]) => {
    setFinances((prev) => [...rows.map((r) => ({ ...r, id: uid("f") })), ...prev]);
  }, []);

  const value = useMemo(
    () => ({
      members,
      comunicados,
      eventos,
      quotas,
      protect,
      votings,
      finances,
      courses,
      assembleias,
      addMember,
      importMembers,
      updateMember,
      removeMember,
      addComunicado,
      addEvento,
      importEventos,
      enrollEvento,
      markQuotaPaid,
      importQuotas,
      addProtect,
      updateProtectStatus,
      addVoting,
      openVoting,
      closeVoting,
      castVote,
      addFinance,
      importFinances,
      ready,
    }),
    [
      members,
      comunicados,
      eventos,
      quotas,
      protect,
      votings,
      finances,
      courses,
      assembleias,
      addMember,
      importMembers,
      updateMember,
      removeMember,
      addComunicado,
      addEvento,
      importEventos,
      enrollEvento,
      markQuotaPaid,
      importQuotas,
      addProtect,
      updateProtectStatus,
      addVoting,
      openVoting,
      closeVoting,
      castVote,
      addFinance,
      importFinances,
      ready,
    ]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore outside provider");
  return ctx;
}

export function formatKz(n: number) {
  return `${n.toLocaleString("pt-AO")} Kz`;
}
