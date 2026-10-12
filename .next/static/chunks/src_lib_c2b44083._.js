(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/rbac.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "can",
    ()=>can,
    "demoAccounts",
    ()=>demoAccounts,
    "permissionMatrix",
    ()=>permissionMatrix,
    "roleLabels",
    ()=>roleLabels,
    "rolePermissions",
    ()=>rolePermissions
]);
const ALL = [
    "view_own",
    "view_members",
    "manage_members",
    "publish_comunicados",
    "manage_events",
    "manage_quotas",
    "view_quotas_all",
    "manage_protect",
    "view_protect",
    "edit_organigram",
    "manage_settings",
    "manage_whatsapp",
    "view_intelligence",
    "manage_academy",
    "manage_governance",
    "access_admin"
];
const rolePermissions = {
    presidente: ALL,
    vice_presidente: ALL.filter((p)=>p !== "manage_settings"),
    secretario_geral: [
        "view_own",
        "view_members",
        "manage_members",
        "publish_comunicados",
        "manage_events",
        "view_quotas_all",
        "view_protect",
        "manage_protect",
        "edit_organigram",
        "manage_whatsapp",
        "view_intelligence",
        "manage_academy",
        "manage_governance",
        "access_admin"
    ],
    tesoureiro: [
        "view_own",
        "view_members",
        "manage_quotas",
        "view_quotas_all",
        "view_intelligence",
        "access_admin"
    ],
    comissao: [
        "view_own",
        "view_members",
        "publish_comunicados",
        "manage_events",
        "manage_academy",
        "view_protect",
        "access_admin"
    ],
    associado: [
        "view_own",
        "view_protect"
    ]
};
const roleLabels = {
    presidente: "Presidente",
    vice_presidente: "Vice-Presidente",
    secretario_geral: "Secretário-Geral",
    tesoureiro: "Tesoureiro/a",
    comissao: "Comissão",
    associado: "Associado"
};
const demoAccounts = [
    {
        role: "presidente",
        name: "Esmael Diogo da Silva",
        email: "presidente@aja.org.ao",
        title: "Presidente da AJA",
        province: "Luanda",
        memberId: "AJA-2015-0001"
    },
    {
        role: "vice_presidente",
        name: "Elisandra Manuel",
        email: "vice@aja.org.ao",
        title: "Vice-Presidente",
        province: "Benguela",
        memberId: "AJA-2016-0042"
    },
    {
        role: "secretario_geral",
        name: "Jacinto Figueira",
        email: "sg@aja.org.ao",
        title: "Secretário-Geral",
        province: "Luanda",
        memberId: "AJA-2018-0110"
    },
    {
        role: "tesoureiro",
        name: "Tesoureiro Associado",
        email: "tesouraria@aja.org.ao",
        title: "Tesoureiro/a",
        province: "Luanda",
        memberId: "AJA-2017-0088"
    },
    {
        role: "comissao",
        name: "Comissão de Formação",
        email: "formacao@aja.org.ao",
        title: "Comissão de Formação",
        province: "Huambo",
        memberId: "AJA-2019-0201"
    },
    {
        role: "associado",
        name: "Magistrado Associado",
        email: "associado@aja.org.ao",
        title: "Juiz de Direito",
        province: "Luanda",
        memberId: "AJA-2015-0847"
    }
];
function can(role, permission) {
    return rolePermissions[role].includes(permission);
}
function permissionMatrix() {
    return Object.keys(rolePermissions).map((role)=>({
            role,
            label: roleLabels[role],
            permissions: rolePermissions[role]
        }));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/auth.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rbac$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/rbac.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
const KEY = "aja-digital-session";
function AuthProvider(param) {
    let { children } = param;
    _s();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [ready, setReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            try {
                const raw = localStorage.getItem(KEY);
                if (raw) setUser(JSON.parse(raw));
            } catch (e) {
            /* ignore */ }
            setReady(true);
        }
    }["AuthProvider.useEffect"], []);
    const login = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[login]": (role)=>{
            const account = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rbac$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["demoAccounts"].find({
                "AuthProvider.useCallback[login].account": (a)=>a.role === role
            }["AuthProvider.useCallback[login].account"]);
            const session = {
                ...account
            };
            localStorage.setItem(KEY, JSON.stringify(session));
            setUser(session);
        }
    }["AuthProvider.useCallback[login]"], []);
    const logout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[logout]": ()=>{
            localStorage.removeItem(KEY);
            setUser(null);
        }
    }["AuthProvider.useCallback[logout]"], []);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AuthProvider.useMemo[value]": ()=>({
                user,
                ready,
                login,
                logout,
                can: ({
                    "AuthProvider.useMemo[value]": (p)=>user ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rbac$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["can"])(user.role, p) : false
                })["AuthProvider.useMemo[value]"],
                roleLabel: user ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rbac$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["roleLabels"][user.role] : ""
            })
    }["AuthProvider.useMemo[value]"], [
        user,
        ready,
        login,
        logout
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/lib/auth.tsx",
        lineNumber: 78,
        columnNumber: 10
    }, this);
}
_s(AuthProvider, "uKGl1a3dpH/qmooDxCm83zBGhvI=");
_c = AuthProvider;
function useAuth() {
    _s1();
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (!ctx) throw new Error("useAuth outside provider");
    return ctx;
}
_s1(useAuth, "/dMy7t63NXD4eYACoT93CePwGrg=");
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/aja.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** Dados institucionais AJA — fontes públicas (aja.org.ao, ANGOP, OPaís, LinkedIn, Tribunal Constitucional).
 *  Cargos sem confirmação pública ficam editáveis em Admin → Organigrama / Configurações.
 */ __turbopack_context__.s([
    "agendaNacional",
    ()=>agendaNacional,
    "aja",
    ()=>aja,
    "assembleias",
    ()=>assembleias,
    "comunicados",
    ()=>comunicados,
    "courses",
    ()=>courses,
    "currentUser",
    ()=>currentUser,
    "defaultSettings",
    ()=>defaultSettings,
    "eventos",
    ()=>eventos,
    "library",
    ()=>library,
    "members",
    ()=>members,
    "news",
    ()=>news,
    "notifications",
    ()=>notifications,
    "organigram",
    ()=>organigram,
    "partners",
    ()=>partners,
    "protectCases",
    ()=>protectCases,
    "provinces",
    ()=>provinces,
    "quotas",
    ()=>quotas,
    "whatsappChannels",
    ()=>whatsappChannels
]);
const aja = {
    name: "Associação dos Juízes de Angola",
    short: "AJA",
    founded: "11 de Dezembro de 2015",
    slogan: "Por uma Magistratura de Excelência",
    legal: "Entidade privada de âmbito nacional, sem fins lucrativos e sem orientação político-partidária ou religiosa, constituída à luz do direito angolano.",
    mission: "Defender os princípios de independência, imparcialidade e integridade judicial — pilares essenciais para a construção de uma sociedade justa e democrática e para a consolidação do Estado de Direito.",
    pillars: [
        "Independência",
        "Imparcialidade",
        "Integridade",
        "Excelência",
        "Solidariedade"
    ],
    mandate: "2025–2028",
    membersEstimate: "300+",
    membersNote: "Fontes públicas referem mais de 300 associados; em alguns momentos a associação comunicou alcance alargado junto de magistrados nas 18 províncias.",
    website: "https://aja.org.ao",
    focusAreas: [
        "Defesa dos Magistrados",
        "Capacitação de Magistrados",
        "Defesa da Soberania / Estado de Direito",
        "Ética e deontologia",
        "Cooperação lusófona (UIJLP)"
    ]
};
const provinces = [
    "Bengo",
    "Benguela",
    "Bié",
    "Cabinda",
    "Cuando Cubango",
    "Cuanza Norte",
    "Cuanza Sul",
    "Cunene",
    "Huambo",
    "Huíla",
    "Luanda",
    "Lunda Norte",
    "Lunda Sul",
    "Malanje",
    "Moxico",
    "Namibe",
    "Uíge",
    "Zaire"
];
const organigram = {
    id: "ag",
    role: "Assembleia Geral",
    name: "Órgão soberano dos associados",
    confirmed: true,
    children: [
        {
            id: "direccao",
            role: "Direcção · Triénio 2025–2028",
            name: "Reconduzida para o mandato actual",
            confirmed: true,
            children: [
                {
                    id: "pres",
                    role: "Presidente",
                    name: "Esmael Diogo da Silva",
                    note: "Presidente da AJA (fontes públicas ANGOP, Tribunal Constitucional, LinkedIn)",
                    confirmed: true
                },
                {
                    id: "vp1",
                    role: "Vice-Presidente",
                    name: "Elisandra Manuel",
                    note: "Intervenções públicas sobre ética e independência (Benguela)",
                    confirmed: true
                },
                {
                    id: "vp2",
                    role: "Vice-Presidente",
                    name: "Neide Sebastião",
                    note: "Referida como 2.ª/3.ª Vice-Presidente em comunicações oficiais",
                    confirmed: true
                },
                {
                    id: "sg",
                    role: "Secretário-Geral",
                    name: "Jacinto Figueira",
                    note: "Secretário-Geral desde 2022 (perfil profissional público)",
                    confirmed: true
                },
                {
                    id: "tes",
                    role: "Tesoureiro/a",
                    name: "A definir / editar",
                    note: "Cargo editável — preencher após validação estatutária",
                    confirmed: false
                }
            ]
        },
        {
            id: "comissoes",
            role: "Comissões permanentes",
            name: "Estruturas de trabalho",
            confirmed: true,
            children: [
                {
                    id: "c-etica",
                    role: "Comissão de Ética e Deontologia",
                    name: "Código de Ética · auscultações provinciais",
                    confirmed: true
                },
                {
                    id: "c-form",
                    role: "Comissão de Formação",
                    name: "Academy · Dialéctica · parcerias académicas",
                    confirmed: true
                },
                {
                    id: "c-com",
                    role: "Gabinete de Comunicação",
                    name: "Notas públicas · WhatsApp · imprensa",
                    confirmed: true
                },
                {
                    id: "c-def",
                    role: "Comissão de Defesa dos Magistrados",
                    name: "Apoio institucional e independência",
                    confirmed: true
                },
                {
                    id: "c-int",
                    role: "Cooperação Internacional",
                    name: "UIJLP · diálogos Angola–Brasil",
                    confirmed: true
                }
            ]
        },
        {
            id: "prov",
            role: "Representantes provinciais",
            name: "Rede nas 18 províncias",
            confirmed: true,
            children: provinces.map((p)=>({
                    id: "prov-".concat(p.toLowerCase().replace(/\s+/g, "-")),
                    role: "Representante · ".concat(p),
                    name: "Associado designado",
                    confirmed: false,
                    note: "Editável por província"
                }))
        }
    ]
};
const news = [
    {
        id: "n1",
        date: "2025-09-11",
        title: "UIJLP aprova Compromisso Ético em Luanda",
        summary: "Assembleia Geral da União Internacional de Juízes de Língua Portuguesa, acolhida em Angola, adopta 15 princípios éticos comuns — incluindo independência, imparcialidade e uso responsável de IA.",
        tag: "UIJLP"
    },
    {
        id: "n2",
        date: "2025-02-18",
        title: "AJA recebida no Tribunal Constitucional",
        summary: "Audiência com a Vice-Presidente do TC sobre a Assembleia Geral da UIJLP em Luanda. Presidente Esmael Diogo da Silva liderou a delegação.",
        tag: "Institucional"
    },
    {
        id: "n3",
        date: "2025-01-01",
        title: "Direcção reconduzida para o triénio 2025–2028",
        summary: "Continuidade do mandato associativo com foco em capacitação, defesa dos magistrados e modernização institucional.",
        tag: "Governação"
    },
    {
        id: "n4",
        date: "2026-06-18",
        title: "Audiência com o Presidente do Tribunal Supremo e CSMJ",
        summary: "Agenda: II Congresso Nacional dos Magistrados Judiciais (CONMAJ), condições de trabalho e entrega de publicações jurídicas da AJA.",
        tag: "Institucional"
    },
    {
        id: "n5",
        date: "2026-01-30",
        title: "Protocolo com o ISP Sol Nascente (Huambo)",
        summary: "Cooperação académica, científica e jurídica — formação, investigação e aproximação academia–judiciário.",
        tag: "Parceria"
    },
    {
        id: "n6",
        date: "2024-08-02",
        title: "Mesas-redondas sobre Código de Ética",
        summary: "Auscultação em Luanda e Benguela; Angola ainda sem código de conduta próprio face aos demais países CPLP. Extensão a outras províncias limitada por logística.",
        tag: "Ética"
    }
];
const agendaNacional = [
    {
        title: "Campus da Justiça em Luanda",
        text: "A AJA defende a concentração de serviços judiciais dispersos (Família, Cível, Comércio, Contencioso, Crime, Garantias) num campus moderno — celeridade, custos e tecnologia."
    },
    {
        title: "Código de Ética e Deontologia",
        text: "Auscultação nacional de juízes; reforço da imagem pública, redes sociais e confiança do cidadão. Formação ética como missão associativa."
    },
    {
        title: "Digitalização e juiz de garantias",
        text: "Apoio à modernização do sistema e à capacitação tecnológica dos magistrados — sem a associação gerir processos judiciais."
    },
    {
        title: "II CONMAJ",
        text: "Preparação do II Congresso Nacional dos Magistrados Judiciais junto do Tribunal Supremo / CSMJ."
    }
];
const partners = [
    {
        name: "UIJLP",
        desc: "União Internacional de Juízes de Língua Portuguesa"
    },
    {
        name: "ISP Sol Nascente",
        desc: "Protocolo de cooperação · Huambo"
    },
    {
        name: "Tribunal Supremo / CSMJ",
        desc: "Diálogo institucional permanente"
    },
    {
        name: "Tribunal Constitucional",
        desc: "Audiências e cooperação institucional"
    }
];
const defaultSettings = {
    brandName: "AJA Digital",
    primaryColor: "#b8a178",
    accentColor: "#5ec8d8",
    quotaAmount: "15.000 Kz",
    quotaPeriod: "Trimestral",
    modules: {
        members: true,
        connect: true,
        governance: true,
        academy: true,
        protect: true,
        intelligence: true,
        organigram: true
    },
    whatsappCoexist: true,
    allowPublicNews: true,
    mfaRequired: true,
    locale: "pt-AO"
};
const currentUser = {
    id: "AJA-2015-0847",
    name: "Magistrado Associado",
    title: "Juiz de Direito",
    province: "Luanda",
    instance: "1.ª Instância",
    email: "associado@aja.org.ao",
    phone: "+244 900 000 000",
    memberSince: "2018",
    role: "associado"
};
const comunicados = [
    {
        id: "c1",
        title: "Convocatória — Assembleia Geral Ordinária",
        date: "2026-10-12",
        audience: "Associados",
        channels: [
            "portal",
            "whatsapp"
        ],
        body: "A Direcção convoca os associados para Assembleia Geral a 18 de Novembro de 2026, em Luanda, pelas 09h30.",
        author: "Secretariado Geral"
    },
    {
        id: "c2",
        title: "Preparativos UIJLP e Compromisso Ético",
        date: "2026-09-20",
        audience: "Público",
        channels: [
            "portal",
            "whatsapp"
        ],
        body: "Informação aos associados e ao público sobre o acompanhamento do Compromisso Ético da UIJLP e iniciativas nacionais de deontologia.",
        author: "Gabinete de Comunicação"
    },
    {
        id: "c3",
        title: "Actualização de quotas — 4.º trimestre",
        date: "2026-09-28",
        audience: "Associados",
        channels: [
            "portal"
        ],
        body: "Informação reservada sobre regularização de quotas. Consulte o histórico na área de Quotas.",
        author: "Tesouraria"
    },
    {
        id: "c4",
        title: "Programa Dialéctica — próxima mesa redonda",
        date: "2026-10-01",
        audience: "Associados",
        channels: [
            "portal",
            "whatsapp"
        ],
        body: "Inscrições abertas para a próxima edição do Programa Dialéctica (formação e debate técnico).",
        author: "Comissão de Formação"
    }
];
const eventos = [
    {
        id: "e1",
        date: "2026-11-18",
        title: "Assembleia Geral Ordinária",
        place: "Luanda",
        time: "09h30",
        type: "Governação",
        seats: 200,
        enrolled: 146,
        status: "inscrito"
    },
    {
        id: "e2",
        date: "2026-12-05",
        title: "Programa Dialéctica",
        place: "Online",
        time: "16h00",
        type: "Formação",
        seats: 500,
        enrolled: 218,
        status: "aberto"
    },
    {
        id: "e3",
        date: "2027-01-22",
        title: "Código de Ética — Sessão provincial",
        place: "Benguela",
        time: "10h00",
        type: "Ética",
        seats: 80,
        enrolled: 34,
        status: "aberto"
    },
    {
        id: "e4",
        date: "2027-02-10",
        title: "Encontro de representantes provinciais",
        place: "Huambo",
        time: "09h00",
        type: "Rede nacional",
        seats: 60,
        enrolled: 41,
        status: "breve"
    }
];
const quotas = [
    {
        period: "2026 · 4.º trim.",
        status: "Pago",
        amount: "15.000 Kz",
        paidAt: "2026-10-02"
    },
    {
        period: "2026 · 3.º trim.",
        status: "Pago",
        amount: "15.000 Kz",
        paidAt: "2026-07-08"
    },
    {
        period: "2026 · 2.º trim.",
        status: "Pago",
        amount: "15.000 Kz",
        paidAt: "2026-04-11"
    },
    {
        period: "2026 · 1.º trim.",
        status: "Pago",
        amount: "15.000 Kz",
        paidAt: "2026-01-14"
    }
];
const courses = [
    {
        id: "a1",
        title: "Ética e deontologia do magistrado",
        hours: 8,
        progress: 100,
        cert: true
    },
    {
        id: "a2",
        title: "Videoconferência e actos digitais",
        hours: 6,
        progress: 65,
        cert: false
    },
    {
        id: "a3",
        title: "Independência judicial e garantias",
        hours: 10,
        progress: 20,
        cert: false
    },
    {
        id: "a4",
        title: "Redes sociais e imagem pública",
        hours: 4,
        progress: 0,
        cert: false
    },
    {
        id: "a5",
        title: "Direito de família e pluriculturalismo",
        hours: 6,
        progress: 0,
        cert: false
    }
];
const library = [
    {
        title: "Estatutos da AJA",
        type: "PDF",
        updated: "2025"
    },
    {
        title: "Anteprojecto — Código de Ética",
        type: "PDF",
        updated: "2024"
    },
    {
        title: "Compromisso Ético UIJLP",
        type: "PDF",
        updated: "2025"
    },
    {
        title: "Guia do associado",
        type: "PDF",
        updated: "2026"
    },
    {
        title: "Arquivo de comunicados 2025",
        type: "ZIP",
        updated: "2026"
    }
];
const protectCases = [
    {
        id: "p1",
        ref: "PROT-2026-014",
        subject: "Pedido de apoio institucional",
        status: "Em análise",
        updated: "2026-10-08"
    },
    {
        id: "p2",
        ref: "PROT-2026-009",
        subject: "Esclarecimento sobre independência funcional",
        status: "Encaminhado",
        updated: "2026-09-21"
    }
];
const assembleias = [
    {
        id: "g1",
        title: "Assembleia Geral Ordinária 2026",
        date: "2026-11-18",
        status: "Convocada",
        docs: [
            "Convocatória",
            "Ordem de trabalhos",
            "Relatório de contas"
        ]
    },
    {
        id: "g2",
        title: "Assembleia — UIJLP / Compromisso Ético",
        date: "2025-09-11",
        status: "Encerrada",
        docs: [
            "Acta",
            "Compromisso Ético",
            "Deliberações"
        ]
    }
];
const members = [
    {
        id: "1",
        name: "António Silva",
        province: "Luanda",
        instance: "1.ª",
        quota: "Em dia",
        title: "Juiz de Direito"
    },
    {
        id: "2",
        name: "Maria Costa",
        province: "Benguela",
        instance: "Relação",
        quota: "Em dia",
        title: "Desembargadora"
    },
    {
        id: "3",
        name: "Pedro Mendes",
        province: "Huambo",
        instance: "1.ª",
        quota: "Pendente",
        title: "Juiz de Direito"
    },
    {
        id: "4",
        name: "Sara Neto",
        province: "Cabinda",
        instance: "1.ª",
        quota: "Em dia",
        title: "Juíza de Direito"
    },
    {
        id: "5",
        name: "Rui Dias",
        province: "Huíla",
        instance: "1.ª",
        quota: "Em dia",
        title: "Juiz de Direito"
    },
    {
        id: "6",
        name: "Lúcia Ferreira",
        province: "Malanje",
        instance: "1.ª",
        quota: "Atraso",
        title: "Juíza de Direito"
    },
    {
        id: "7",
        name: "Tiago Borges",
        province: "Uíge",
        instance: "1.ª",
        quota: "Em dia",
        title: "Juiz de Direito"
    },
    {
        id: "8",
        name: "Carla Almeida",
        province: "Namibe",
        instance: "1.ª",
        quota: "Em dia",
        title: "Juíza de Direito"
    },
    {
        id: "9",
        name: "Esmael Diogo da Silva",
        province: "Luanda",
        instance: "Relação",
        quota: "Em dia",
        title: "Presidente da AJA"
    },
    {
        id: "10",
        name: "Elisandra Manuel",
        province: "Benguela",
        instance: "1.ª",
        quota: "Em dia",
        title: "Vice-Presidente"
    },
    {
        id: "11",
        name: "Jacinto Figueira",
        province: "Luanda",
        instance: "Relação",
        quota: "Em dia",
        title: "Secretário-Geral"
    },
    {
        id: "12",
        name: "Neide Sebastião",
        province: "Luanda",
        instance: "1.ª",
        quota: "Em dia",
        title: "Vice-Presidente"
    }
];
const whatsappChannels = [
    {
        name: "Canal público AJA",
        kind: "Público",
        members: "—",
        synced: true
    },
    {
        name: "Direcção",
        kind: "Interno",
        members: "12",
        synced: true
    },
    {
        name: "Representantes provinciais",
        kind: "Interno",
        members: "18",
        synced: true
    },
    {
        name: "Comissão de Formação",
        kind: "Interno",
        members: "9",
        synced: false
    },
    {
        name: "Comissão de Ética",
        kind: "Interno",
        members: "7",
        synced: true
    }
];
const notifications = [
    {
        id: "n1",
        text: "Nova convocatória — Assembleia Geral",
        time: "Há 2 h",
        unread: true
    },
    {
        id: "n2",
        text: "Certificado: Ética e deontologia",
        time: "Ontem",
        unread: true
    },
    {
        id: "n3",
        text: "Dialéctica a 5 Dez — confirme presença",
        time: "Há 3 dias",
        unread: false
    },
    {
        id: "n4",
        text: "Actualização do organigrama provincial",
        time: "Há 5 dias",
        unread: false
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/settings.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SettingsProvider",
    ()=>SettingsProvider,
    "useSettings",
    ()=>useSettings
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$aja$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/aja.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
const SettingsContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
const SK = "aja-digital-settings";
const OK = "aja-digital-organigram";
function SettingsProvider(param) {
    let { children } = param;
    _s();
    const [settings, setSettingsState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$aja$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultSettings"]);
    const [org, setOrgState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$aja$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["organigram"]);
    const [ready, setReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SettingsProvider.useEffect": ()=>{
            try {
                const s = localStorage.getItem(SK);
                const o = localStorage.getItem(OK);
                if (s) setSettingsState({
                    ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$aja$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultSettings"],
                    ...JSON.parse(s)
                });
                if (o) setOrgState(JSON.parse(o));
            } catch (e) {
            /* ignore */ }
            setReady(true);
        }
    }["SettingsProvider.useEffect"], []);
    const setSettings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SettingsProvider.useCallback[setSettings]": (s)=>{
            setSettingsState({
                "SettingsProvider.useCallback[setSettings]": (prev)=>{
                    const next = typeof s === "function" ? s(prev) : s;
                    localStorage.setItem(SK, JSON.stringify(next));
                    return next;
                }
            }["SettingsProvider.useCallback[setSettings]"]);
        }
    }["SettingsProvider.useCallback[setSettings]"], []);
    const setOrg = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SettingsProvider.useCallback[setOrg]": (o)=>{
            setOrgState({
                "SettingsProvider.useCallback[setOrg]": (prev)=>{
                    const next = typeof o === "function" ? o(prev) : o;
                    localStorage.setItem(OK, JSON.stringify(next));
                    return next;
                }
            }["SettingsProvider.useCallback[setOrg]"]);
        }
    }["SettingsProvider.useCallback[setOrg]"], []);
    const reset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SettingsProvider.useCallback[reset]": ()=>{
            setSettingsState(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$aja$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultSettings"]);
            setOrgState(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$aja$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["organigram"]);
            localStorage.removeItem(SK);
            localStorage.removeItem(OK);
        }
    }["SettingsProvider.useCallback[reset]"], []);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SettingsProvider.useMemo[value]": ()=>({
                settings,
                setSettings,
                org,
                setOrg,
                reset
            })
    }["SettingsProvider.useMemo[value]"], [
        settings,
        setSettings,
        org,
        setOrg,
        reset
    ]);
    if (!ready) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-navy"
        }, void 0, false, {
            fileName: "[project]/src/lib/settings.tsx",
            lineNumber: 77,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SettingsContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/lib/settings.tsx",
        lineNumber: 80,
        columnNumber: 10
    }, this);
}
_s(SettingsProvider, "JYMf68RHh2q9ObxhWXDxlvaNY0w=");
_c = SettingsProvider;
function useSettings() {
    _s1();
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(SettingsContext);
    if (!ctx) throw new Error("useSettings outside provider");
    return ctx;
}
_s1(useSettings, "/dMy7t63NXD4eYACoT93CePwGrg=");
var _c;
__turbopack_context__.k.register(_c, "SettingsProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/store.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StoreProvider",
    ()=>StoreProvider,
    "formatKz",
    ()=>formatKz,
    "useStore",
    ()=>useStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$aja$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/aja.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
const StoreContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
const KEY = "aja-digital-live-store-v2";
function uid(prefix) {
    return "".concat(prefix, "-").concat(Date.now().toString(36), "-").concat(Math.random().toString(36).slice(2, 6));
}
const seedVotings = [
    {
        id: "v1",
        title: "Aprovação da ordem de trabalhos",
        assembleiaTitle: "Assembleia Geral Ordinária 2026",
        assembleiaId: "g1",
        description: "Votação preliminar da ordem de trabalhos da AG Ordinária de 18 de Novembro de 2026.",
        status: "aberta",
        opensAt: "2026-11-18T09:30",
        closesAt: "2026-11-18T10:00",
        options: [
            {
                id: "o1",
                label: "Aprovar",
                votes: 89
            },
            {
                id: "o2",
                label: "Rejeitar",
                votes: 4
            },
            {
                id: "o3",
                label: "Abstenção",
                votes: 7
            }
        ],
        votedBy: [],
        quorum: 50,
        eligible: 300
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
            {
                id: "o1",
                label: "Aprovar",
                votes: 0
            },
            {
                id: "o2",
                label: "Rejeitar",
                votes: 0
            },
            {
                id: "o3",
                label: "Abstenção",
                votes: 0
            }
        ],
        votedBy: [],
        quorum: 50,
        eligible: 300
    }
];
const seedFinances = [
    {
        id: "f1",
        date: "2026-10-02",
        type: "receita",
        category: "Quotas",
        description: "Quotas 4.º trim. — lote bancário",
        amount: 2450000,
        method: "Transferência",
        ref: "TRF-4412"
    },
    {
        id: "f2",
        date: "2026-09-28",
        type: "despesa",
        category: "Eventos",
        description: "Sala e logística UIJLP (preparativos)",
        amount: 380000,
        method: "Transferência",
        ref: "DES-882"
    },
    {
        id: "f3",
        date: "2026-09-15",
        type: "despesa",
        category: "Formação",
        description: "Material Academy · Dialéctica",
        amount: 125000,
        method: "Numerário",
        ref: "DES-871"
    },
    {
        id: "f4",
        date: "2026-08-20",
        type: "receita",
        category: "Quotas",
        description: "Quotas 3.º trim. — regularizações",
        amount: 1890000,
        method: "Transferência",
        ref: "TRF-4390"
    },
    {
        id: "f5",
        date: "2026-08-01",
        type: "despesa",
        category: "Institucional",
        description: "Deslocações representantes provinciais",
        amount: 210000,
        method: "Transferência",
        ref: "DES-850"
    }
];
const seedProtectFull = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$aja$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["protectCases"].map((p, i)=>({
        ...p,
        category: i === 0 ? "Apoio institucional" : "Independência funcional",
        urgency: i === 0 ? "alta" : "normal",
        body: "Pedido registado pelo canal Protect. Conteúdo confidencial visível apenas à Direcção autorizada.",
        timeline: [
            {
                at: p.updated,
                note: "Estado: ".concat(p.status)
            },
            {
                at: "2026-09-18",
                note: "Pedido recebido e numerado"
            }
        ]
    }));
function StoreProvider(param) {
    let { children } = param;
    _s();
    const [ready, setReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [members, setMembers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$aja$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["members"].map({
        "StoreProvider.useState": (m)=>({
                ...m,
                active: true,
                memberId: "AJA-2015-".concat(m.id.padStart(4, "0")),
                title: m.title || "Juiz de Direito",
                since: "2018"
            })
    }["StoreProvider.useState"]));
    const [comunicados, setComunicados] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$aja$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["comunicados"]);
    const [eventos, setEventos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$aja$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["eventos"].map({
        "StoreProvider.useState": (e)=>({
                ...e,
                enrolledIds: [],
                isAssembleia: e.type === "Governação",
                description: e.type === "Governação" ? "Assembleia com ordem de trabalhos e votações eletrónicas." : undefined,
                orderOfBusiness: e.type === "Governação" ? [
                    "Abertura",
                    "Ordem de trabalhos",
                    "Relatório de contas",
                    "Deliberações",
                    "Encerramento"
                ] : undefined
            })
    }["StoreProvider.useState"]));
    const [quotas, setQuotas] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$aja$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["quotas"]);
    const [protect, setProtect] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(seedProtectFull);
    const [votings, setVotings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(seedVotings);
    const [finances, setFinances] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(seedFinances);
    const [courses] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$aja$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["courses"]);
    const [assembleias] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$aja$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assembleias"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StoreProvider.useEffect": ()=>{
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
            } catch (e) {
            /* ignore */ }
            setReady(true);
        }
    }["StoreProvider.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StoreProvider.useEffect": ()=>{
            if (!ready) return;
            localStorage.setItem(KEY, JSON.stringify({
                members,
                comunicados,
                eventos,
                quotas,
                protect,
                votings,
                finances
            }));
        }
    }["StoreProvider.useEffect"], [
        ready,
        members,
        comunicados,
        eventos,
        quotas,
        protect,
        votings,
        finances
    ]);
    const addMember = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[addMember]": (m)=>{
            setMembers({
                "StoreProvider.useCallback[addMember]": (prev)=>[
                        {
                            ...m,
                            id: uid("m"),
                            active: true,
                            memberId: m.memberId || uid("AJA").toUpperCase()
                        },
                        ...prev
                    ]
            }["StoreProvider.useCallback[addMember]"]);
        }
    }["StoreProvider.useCallback[addMember]"], []);
    const importMembers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[importMembers]": (rows)=>{
            setMembers({
                "StoreProvider.useCallback[importMembers]": (prev)=>[
                        ...rows.map({
                            "StoreProvider.useCallback[importMembers]": (m)=>({
                                    ...m,
                                    id: uid("m"),
                                    active: true,
                                    memberId: m.memberId || uid("AJA").toUpperCase()
                                })
                        }["StoreProvider.useCallback[importMembers]"]),
                        ...prev
                    ]
            }["StoreProvider.useCallback[importMembers]"]);
        }
    }["StoreProvider.useCallback[importMembers]"], []);
    const updateMember = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[updateMember]": (id, patch)=>{
            setMembers({
                "StoreProvider.useCallback[updateMember]": (prev)=>prev.map({
                        "StoreProvider.useCallback[updateMember]": (m)=>m.id === id ? {
                                ...m,
                                ...patch
                            } : m
                    }["StoreProvider.useCallback[updateMember]"])
            }["StoreProvider.useCallback[updateMember]"]);
        }
    }["StoreProvider.useCallback[updateMember]"], []);
    const removeMember = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[removeMember]": (id)=>{
            setMembers({
                "StoreProvider.useCallback[removeMember]": (prev)=>prev.filter({
                        "StoreProvider.useCallback[removeMember]": (m)=>m.id !== id
                    }["StoreProvider.useCallback[removeMember]"])
            }["StoreProvider.useCallback[removeMember]"]);
        }
    }["StoreProvider.useCallback[removeMember]"], []);
    const addComunicado = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[addComunicado]": (c)=>{
            setComunicados({
                "StoreProvider.useCallback[addComunicado]": (prev)=>[
                        {
                            ...c,
                            id: uid("c"),
                            date: new Date().toISOString().slice(0, 10)
                        },
                        ...prev
                    ]
            }["StoreProvider.useCallback[addComunicado]"]);
        }
    }["StoreProvider.useCallback[addComunicado]"], []);
    const addEvento = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[addEvento]": (e)=>{
            setEventos({
                "StoreProvider.useCallback[addEvento]": (prev)=>[
                        {
                            ...e,
                            id: uid("e"),
                            enrolled: 0,
                            status: e.status || "aberto",
                            enrolledIds: []
                        },
                        ...prev
                    ]
            }["StoreProvider.useCallback[addEvento]"]);
        }
    }["StoreProvider.useCallback[addEvento]"], []);
    const importEventos = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[importEventos]": (rows)=>{
            setEventos({
                "StoreProvider.useCallback[importEventos]": (prev)=>[
                        ...rows.map({
                            "StoreProvider.useCallback[importEventos]": (e)=>({
                                    ...e,
                                    id: uid("e"),
                                    enrolled: 0,
                                    status: "aberto",
                                    enrolledIds: []
                                })
                        }["StoreProvider.useCallback[importEventos]"]),
                        ...prev
                    ]
            }["StoreProvider.useCallback[importEventos]"]);
        }
    }["StoreProvider.useCallback[importEventos]"], []);
    const enrollEvento = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[enrollEvento]": (eventId, memberId)=>{
            setEventos({
                "StoreProvider.useCallback[enrollEvento]": (prev)=>prev.map({
                        "StoreProvider.useCallback[enrollEvento]": (e)=>{
                            if (e.id !== eventId) return e;
                            const ids = e.enrolledIds || [];
                            if (ids.includes(memberId)) {
                                return {
                                    ...e,
                                    enrolledIds: ids.filter({
                                        "StoreProvider.useCallback[enrollEvento]": (x)=>x !== memberId
                                    }["StoreProvider.useCallback[enrollEvento]"]),
                                    enrolled: Math.max(0, e.enrolled - 1)
                                };
                            }
                            return {
                                ...e,
                                enrolledIds: [
                                    ...ids,
                                    memberId
                                ],
                                enrolled: e.enrolled + 1
                            };
                        }
                    }["StoreProvider.useCallback[enrollEvento]"])
            }["StoreProvider.useCallback[enrollEvento]"]);
        }
    }["StoreProvider.useCallback[enrollEvento]"], []);
    const markQuotaPaid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[markQuotaPaid]": (period)=>{
            setQuotas({
                "StoreProvider.useCallback[markQuotaPaid]": (prev)=>prev.map({
                        "StoreProvider.useCallback[markQuotaPaid]": (q)=>q.period === period ? {
                                ...q,
                                status: "Pago",
                                paidAt: new Date().toISOString().slice(0, 10)
                            } : q
                    }["StoreProvider.useCallback[markQuotaPaid]"])
            }["StoreProvider.useCallback[markQuotaPaid]"]);
        }
    }["StoreProvider.useCallback[markQuotaPaid]"], []);
    const importQuotas = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[importQuotas]": (rows)=>{
            setQuotas({
                "StoreProvider.useCallback[importQuotas]": (prev)=>[
                        ...rows,
                        ...prev
                    ]
            }["StoreProvider.useCallback[importQuotas]"]);
        }
    }["StoreProvider.useCallback[importQuotas]"], []);
    const addProtect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[addProtect]": (input)=>{
            const today = new Date().toISOString().slice(0, 10);
            setProtect({
                "StoreProvider.useCallback[addProtect]": (prev)=>{
                    const n = prev.length + 15;
                    return [
                        {
                            id: uid("p"),
                            ref: "PROT-".concat(new Date().getFullYear(), "-").concat(String(n).padStart(3, "0")),
                            subject: input.subject,
                            body: input.body,
                            category: input.category || "Geral",
                            urgency: input.urgency || "normal",
                            status: "Recebido",
                            updated: today,
                            timeline: [
                                {
                                    at: today,
                                    note: "Pedido recebido e numerado"
                                },
                                {
                                    at: today,
                                    note: "Aguarda triagem da Comissão de Defesa"
                                }
                            ]
                        },
                        ...prev
                    ];
                }
            }["StoreProvider.useCallback[addProtect]"]);
        }
    }["StoreProvider.useCallback[addProtect]"], []);
    const updateProtectStatus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[updateProtectStatus]": (id, status, note)=>{
            const today = new Date().toISOString().slice(0, 10);
            setProtect({
                "StoreProvider.useCallback[updateProtectStatus]": (prev)=>prev.map({
                        "StoreProvider.useCallback[updateProtectStatus]": (p)=>p.id === id ? {
                                ...p,
                                status,
                                updated: today,
                                timeline: [
                                    {
                                        at: today,
                                        note: note || "Estado actualizado para: ".concat(status)
                                    },
                                    ...p.timeline || []
                                ]
                            } : p
                    }["StoreProvider.useCallback[updateProtectStatus]"])
            }["StoreProvider.useCallback[updateProtectStatus]"]);
        }
    }["StoreProvider.useCallback[updateProtectStatus]"], []);
    const addVoting = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[addVoting]": (v)=>{
            setVotings({
                "StoreProvider.useCallback[addVoting]": (prev)=>[
                        {
                            ...v,
                            id: uid("v"),
                            votedBy: [],
                            options: v.options.map({
                                "StoreProvider.useCallback[addVoting]": (label, i)=>({
                                        id: "opt-".concat(i),
                                        label,
                                        votes: 0
                                    })
                            }["StoreProvider.useCallback[addVoting]"])
                        },
                        ...prev
                    ]
            }["StoreProvider.useCallback[addVoting]"]);
        }
    }["StoreProvider.useCallback[addVoting]"], []);
    const openVoting = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[openVoting]": (id)=>{
            setVotings({
                "StoreProvider.useCallback[openVoting]": (prev)=>prev.map({
                        "StoreProvider.useCallback[openVoting]": (v)=>v.id === id ? {
                                ...v,
                                status: "aberta"
                            } : v
                    }["StoreProvider.useCallback[openVoting]"])
            }["StoreProvider.useCallback[openVoting]"]);
        }
    }["StoreProvider.useCallback[openVoting]"], []);
    const closeVoting = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[closeVoting]": (id)=>{
            setVotings({
                "StoreProvider.useCallback[closeVoting]": (prev)=>prev.map({
                        "StoreProvider.useCallback[closeVoting]": (v)=>v.id === id ? {
                                ...v,
                                status: "encerrada"
                            } : v
                    }["StoreProvider.useCallback[closeVoting]"])
            }["StoreProvider.useCallback[closeVoting]"]);
        }
    }["StoreProvider.useCallback[closeVoting]"], []);
    const castVote = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[castVote]": (votingId, optionId, memberId)=>{
            setVotings({
                "StoreProvider.useCallback[castVote]": (prev)=>prev.map({
                        "StoreProvider.useCallback[castVote]": (v)=>{
                            if (v.id !== votingId || v.status !== "aberta" || v.votedBy.includes(memberId)) return v;
                            return {
                                ...v,
                                votedBy: [
                                    ...v.votedBy,
                                    memberId
                                ],
                                options: v.options.map({
                                    "StoreProvider.useCallback[castVote]": (o)=>o.id === optionId ? {
                                            ...o,
                                            votes: o.votes + 1
                                        } : o
                                }["StoreProvider.useCallback[castVote]"])
                            };
                        }
                    }["StoreProvider.useCallback[castVote]"])
            }["StoreProvider.useCallback[castVote]"]);
        }
    }["StoreProvider.useCallback[castVote]"], []);
    const addFinance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[addFinance]": (e)=>{
            setFinances({
                "StoreProvider.useCallback[addFinance]": (prev)=>[
                        {
                            ...e,
                            id: uid("f")
                        },
                        ...prev
                    ]
            }["StoreProvider.useCallback[addFinance]"]);
        }
    }["StoreProvider.useCallback[addFinance]"], []);
    const importFinances = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[importFinances]": (rows)=>{
            setFinances({
                "StoreProvider.useCallback[importFinances]": (prev)=>[
                        ...rows.map({
                            "StoreProvider.useCallback[importFinances]": (r)=>({
                                    ...r,
                                    id: uid("f")
                                })
                        }["StoreProvider.useCallback[importFinances]"]),
                        ...prev
                    ]
            }["StoreProvider.useCallback[importFinances]"]);
        }
    }["StoreProvider.useCallback[importFinances]"], []);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "StoreProvider.useMemo[value]": ()=>({
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
                ready
            })
    }["StoreProvider.useMemo[value]"], [
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
        ready
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StoreContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/lib/store.tsx",
        lineNumber: 587,
        columnNumber: 10
    }, this);
}
_s(StoreProvider, "SBO4GKE15oxY6zktqI/wUZ45ZPU=");
_c = StoreProvider;
function useStore() {
    _s1();
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(StoreContext);
    if (!ctx) throw new Error("useStore outside provider");
    return ctx;
}
_s1(useStore, "/dMy7t63NXD4eYACoT93CePwGrg=");
function formatKz(n) {
    return "".concat(n.toLocaleString("pt-AO"), " Kz");
}
var _c;
__turbopack_context__.k.register(_c, "StoreProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_lib_c2b44083._.js.map