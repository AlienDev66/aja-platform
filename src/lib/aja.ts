/** Dados institucionais AJA — fontes públicas (aja.org.ao, ANGOP, OPaís, LinkedIn, Tribunal Constitucional).
 *  Cargos sem confirmação pública ficam editáveis em Admin → Organigrama / Configurações.
 */

export const aja = {
  name: "Associação dos Juízes de Angola",
  short: "AJA",
  founded: "11 de Dezembro de 2015",
  slogan: "Por uma Magistratura de Excelência",
  legal:
    "Entidade privada de âmbito nacional, sem fins lucrativos e sem orientação político-partidária ou religiosa, constituída à luz do direito angolano.",
  mission:
    "Defender os princípios de independência, imparcialidade e integridade judicial — pilares essenciais para a construção de uma sociedade justa e democrática e para a consolidação do Estado de Direito.",
  pillars: ["Independência", "Imparcialidade", "Integridade", "Excelência", "Solidariedade"],
  mandate: "2025–2028",
  membersEstimate: "300+",
  membersNote:
    "Fontes públicas referem mais de 300 associados; em alguns momentos a associação comunicou alcance alargado junto de magistrados nas 18 províncias.",
  website: "https://aja.org.ao",
  focusAreas: [
    "Defesa dos Magistrados",
    "Capacitação de Magistrados",
    "Defesa da Soberania / Estado de Direito",
    "Ética e deontologia",
    "Cooperação lusófona (UIJLP)",
  ],
};

export const provinces = [
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
  "Zaire",
] as const;

export type OrgNode = {
  id: string;
  role: string;
  name: string;
  note?: string;
  confirmed?: boolean;
  children?: OrgNode[];
};

/** Organigrama inicial — editável na plataforma */
export const organigram: OrgNode = {
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
          confirmed: true,
        },
        {
          id: "vp1",
          role: "Vice-Presidente",
          name: "Elisandra Manuel",
          note: "Intervenções públicas sobre ética e independência (Benguela)",
          confirmed: true,
        },
        {
          id: "vp2",
          role: "Vice-Presidente",
          name: "Neide Sebastião",
          note: "Referida como 2.ª/3.ª Vice-Presidente em comunicações oficiais",
          confirmed: true,
        },
        {
          id: "sg",
          role: "Secretário-Geral",
          name: "Jacinto Figueira",
          note: "Secretário-Geral desde 2022 (perfil profissional público)",
          confirmed: true,
        },
        {
          id: "tes",
          role: "Tesoureiro/a",
          name: "A definir / editar",
          note: "Cargo editável — preencher após validação estatutária",
          confirmed: false,
        },
      ],
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
          confirmed: true,
        },
        {
          id: "c-form",
          role: "Comissão de Formação",
          name: "Academy · Dialéctica · parcerias académicas",
          confirmed: true,
        },
        {
          id: "c-com",
          role: "Gabinete de Comunicação",
          name: "Notas públicas · WhatsApp · imprensa",
          confirmed: true,
        },
        {
          id: "c-def",
          role: "Comissão de Defesa dos Magistrados",
          name: "Apoio institucional e independência",
          confirmed: true,
        },
        {
          id: "c-int",
          role: "Cooperação Internacional",
          name: "UIJLP · diálogos Angola–Brasil",
          confirmed: true,
        },
      ],
    },
    {
      id: "prov",
      role: "Representantes provinciais",
      name: "Rede nas 18 províncias",
      confirmed: true,
      children: provinces.map((p) => ({
        id: `prov-${p.toLowerCase().replace(/\s+/g, "-")}`,
        role: `Representante · ${p}`,
        name: "Associado designado",
        confirmed: false,
        note: "Editável por província",
      })),
    },
  ],
};

export const news = [
  {
    id: "n1",
    date: "2025-09-11",
    title: "UIJLP aprova Compromisso Ético em Luanda",
    summary:
      "Assembleia Geral da União Internacional de Juízes de Língua Portuguesa, acolhida em Angola, adopta 15 princípios éticos comuns — incluindo independência, imparcialidade e uso responsável de IA.",
    tag: "UIJLP",
  },
  {
    id: "n2",
    date: "2025-02-18",
    title: "AJA recebida no Tribunal Constitucional",
    summary:
      "Audiência com a Vice-Presidente do TC sobre a Assembleia Geral da UIJLP em Luanda. Presidente Esmael Diogo da Silva liderou a delegação.",
    tag: "Institucional",
  },
  {
    id: "n3",
    date: "2025-01-01",
    title: "Direcção reconduzida para o triénio 2025–2028",
    summary:
      "Continuidade do mandato associativo com foco em capacitação, defesa dos magistrados e modernização institucional.",
    tag: "Governação",
  },
  {
    id: "n4",
    date: "2026-06-18",
    title: "Audiência com o Presidente do Tribunal Supremo e CSMJ",
    summary:
      "Agenda: II Congresso Nacional dos Magistrados Judiciais (CONMAJ), condições de trabalho e entrega de publicações jurídicas da AJA.",
    tag: "Institucional",
  },
  {
    id: "n5",
    date: "2026-01-30",
    title: "Protocolo com o ISP Sol Nascente (Huambo)",
    summary:
      "Cooperação académica, científica e jurídica — formação, investigação e aproximação academia–judiciário.",
    tag: "Parceria",
  },
  {
    id: "n6",
    date: "2024-08-02",
    title: "Mesas-redondas sobre Código de Ética",
    summary:
      "Auscultação em Luanda e Benguela; Angola ainda sem código de conduta próprio face aos demais países CPLP. Extensão a outras províncias limitada por logística.",
    tag: "Ética",
  },
];

export const agendaNacional = [
  {
    title: "Campus da Justiça em Luanda",
    text: "A AJA defende a concentração de serviços judiciais dispersos (Família, Cível, Comércio, Contencioso, Crime, Garantias) num campus moderno — celeridade, custos e tecnologia.",
  },
  {
    title: "Código de Ética e Deontologia",
    text: "Auscultação nacional de juízes; reforço da imagem pública, redes sociais e confiança do cidadão. Formação ética como missão associativa.",
  },
  {
    title: "Digitalização e juiz de garantias",
    text: "Apoio à modernização do sistema e à capacitação tecnológica dos magistrados — sem a associação gerir processos judiciais.",
  },
  {
    title: "II CONMAJ",
    text: "Preparação do II Congresso Nacional dos Magistrados Judiciais junto do Tribunal Supremo / CSMJ.",
  },
];

export const partners = [
  { name: "UIJLP", desc: "União Internacional de Juízes de Língua Portuguesa" },
  { name: "ISP Sol Nascente", desc: "Protocolo de cooperação · Huambo" },
  { name: "Tribunal Supremo / CSMJ", desc: "Diálogo institucional permanente" },
  { name: "Tribunal Constitucional", desc: "Audiências e cooperação institucional" },
];

export const defaultSettings = {
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
    organigram: true,
  },
  whatsappCoexist: true,
  allowPublicNews: true,
  mfaRequired: true,
  locale: "pt-AO",
};

export type AppSettings = typeof defaultSettings;

export const currentUser = {
  id: "AJA-2015-0847",
  name: "Magistrado Associado",
  title: "Juiz de Direito",
  province: "Luanda" as (typeof provinces)[number],
  instance: "1.ª Instância",
  email: "associado@aja.org.ao",
  phone: "+244 900 000 000",
  memberSince: "2018",
  role: "associado" as "associado" | "admin" | "direccao",
};

export const comunicados = [
  {
    id: "c1",
    title: "Convocatória — Assembleia Geral Ordinária",
    date: "2026-10-12",
    audience: "Associados",
    channels: ["portal", "whatsapp"] as string[],
    body: "A Direcção convoca os associados para Assembleia Geral a 18 de Novembro de 2026, em Luanda, pelas 09h30.",
    author: "Secretariado Geral",
  },
  {
    id: "c2",
    title: "Preparativos UIJLP e Compromisso Ético",
    date: "2026-09-20",
    audience: "Público",
    channels: ["portal", "whatsapp"] as string[],
    body: "Informação aos associados e ao público sobre o acompanhamento do Compromisso Ético da UIJLP e iniciativas nacionais de deontologia.",
    author: "Gabinete de Comunicação",
  },
  {
    id: "c3",
    title: "Actualização de quotas — 4.º trimestre",
    date: "2026-09-28",
    audience: "Associados",
    channels: ["portal"] as string[],
    body: "Informação reservada sobre regularização de quotas. Consulte o histórico na área de Quotas.",
    author: "Tesouraria",
  },
  {
    id: "c4",
    title: "Programa Dialéctica — próxima mesa redonda",
    date: "2026-10-01",
    audience: "Associados",
    channels: ["portal", "whatsapp"] as string[],
    body: "Inscrições abertas para a próxima edição do Programa Dialéctica (formação e debate técnico).",
    author: "Comissão de Formação",
  },
];

export const eventos = [
  {
    id: "e1",
    date: "2026-11-18",
    title: "Assembleia Geral Ordinária",
    place: "Luanda",
    time: "09h30",
    type: "Governação",
    seats: 200,
    enrolled: 146,
    status: "inscrito" as const,
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
    status: "aberto" as const,
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
    status: "aberto" as const,
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
    status: "breve" as const,
  },
];

export const quotas = [
  { period: "2026 · 4.º trim.", status: "Pago", amount: "15.000 Kz", paidAt: "2026-10-02" },
  { period: "2026 · 3.º trim.", status: "Pago", amount: "15.000 Kz", paidAt: "2026-07-08" },
  { period: "2026 · 2.º trim.", status: "Pago", amount: "15.000 Kz", paidAt: "2026-04-11" },
  { period: "2026 · 1.º trim.", status: "Pago", amount: "15.000 Kz", paidAt: "2026-01-14" },
];

export const courses = [
  {
    id: "a1",
    title: "Ética e deontologia do magistrado",
    hours: 8,
    progress: 100,
    cert: true,
  },
  {
    id: "a2",
    title: "Videoconferência e actos digitais",
    hours: 6,
    progress: 65,
    cert: false,
  },
  {
    id: "a3",
    title: "Independência judicial e garantias",
    hours: 10,
    progress: 20,
    cert: false,
  },
  {
    id: "a4",
    title: "Redes sociais e imagem pública",
    hours: 4,
    progress: 0,
    cert: false,
  },
  {
    id: "a5",
    title: "Direito de família e pluriculturalismo",
    hours: 6,
    progress: 0,
    cert: false,
  },
];

export const library = [
  { title: "Estatutos da AJA", type: "PDF", updated: "2025" },
  { title: "Anteprojecto — Código de Ética", type: "PDF", updated: "2024" },
  { title: "Compromisso Ético UIJLP", type: "PDF", updated: "2025" },
  { title: "Guia do associado", type: "PDF", updated: "2026" },
  { title: "Arquivo de comunicados 2025", type: "ZIP", updated: "2026" },
];

export const protectCases = [
  {
    id: "p1",
    ref: "PROT-2026-014",
    subject: "Pedido de apoio institucional",
    status: "Em análise",
    updated: "2026-10-08",
  },
  {
    id: "p2",
    ref: "PROT-2026-009",
    subject: "Esclarecimento sobre independência funcional",
    status: "Encaminhado",
    updated: "2026-09-21",
  },
];

export const assembleias = [
  {
    id: "g1",
    title: "Assembleia Geral Ordinária 2026",
    date: "2026-11-18",
    status: "Convocada",
    docs: ["Convocatória", "Ordem de trabalhos", "Relatório de contas"],
  },
  {
    id: "g2",
    title: "Assembleia — UIJLP / Compromisso Ético",
    date: "2025-09-11",
    status: "Encerrada",
    docs: ["Acta", "Compromisso Ético", "Deliberações"],
  },
];

export const members = [
  { id: "1", name: "António Silva", province: "Luanda", instance: "1.ª", quota: "Em dia", title: "Juiz de Direito" },
  { id: "2", name: "Maria Costa", province: "Benguela", instance: "Relação", quota: "Em dia", title: "Desembargadora" },
  { id: "3", name: "Pedro Mendes", province: "Huambo", instance: "1.ª", quota: "Pendente", title: "Juiz de Direito" },
  { id: "4", name: "Sara Neto", province: "Cabinda", instance: "1.ª", quota: "Em dia", title: "Juíza de Direito" },
  { id: "5", name: "Rui Dias", province: "Huíla", instance: "1.ª", quota: "Em dia", title: "Juiz de Direito" },
  { id: "6", name: "Lúcia Ferreira", province: "Malanje", instance: "1.ª", quota: "Atraso", title: "Juíza de Direito" },
  { id: "7", name: "Tiago Borges", province: "Uíge", instance: "1.ª", quota: "Em dia", title: "Juiz de Direito" },
  { id: "8", name: "Carla Almeida", province: "Namibe", instance: "1.ª", quota: "Em dia", title: "Juíza de Direito" },
  { id: "9", name: "Esmael Diogo da Silva", province: "Luanda", instance: "Relação", quota: "Em dia", title: "Presidente da AJA" },
  { id: "10", name: "Elisandra Manuel", province: "Benguela", instance: "1.ª", quota: "Em dia", title: "Vice-Presidente" },
  { id: "11", name: "Jacinto Figueira", province: "Luanda", instance: "Relação", quota: "Em dia", title: "Secretário-Geral" },
  { id: "12", name: "Neide Sebastião", province: "Luanda", instance: "1.ª", quota: "Em dia", title: "Vice-Presidente" },
];

export const whatsappChannels = [
  { name: "Canal público AJA", kind: "Público", members: "—", synced: true },
  { name: "Direcção", kind: "Interno", members: "12", synced: true },
  { name: "Representantes provinciais", kind: "Interno", members: "18", synced: true },
  { name: "Comissão de Formação", kind: "Interno", members: "9", synced: false },
  { name: "Comissão de Ética", kind: "Interno", members: "7", synced: true },
];

export const notifications = [
  { id: "n1", text: "Nova convocatória — Assembleia Geral", time: "Há 2 h", unread: true },
  { id: "n2", text: "Certificado: Ética e deontologia", time: "Ontem", unread: true },
  { id: "n3", text: "Dialéctica a 5 Dez — confirme presença", time: "Há 3 dias", unread: false },
  { id: "n4", text: "Actualização do organigrama provincial", time: "Há 5 dias", unread: false },
];
