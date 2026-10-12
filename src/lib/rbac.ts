export type Role =
  | "presidente"
  | "vice_presidente"
  | "secretario_geral"
  | "tesoureiro"
  | "comissao"
  | "associado";

export type Permission =
  | "view_own"
  | "view_members"
  | "manage_members"
  | "publish_comunicados"
  | "manage_events"
  | "manage_quotas"
  | "view_quotas_all"
  | "manage_protect"
  | "view_protect"
  | "edit_organigram"
  | "manage_settings"
  | "manage_whatsapp"
  | "view_intelligence"
  | "manage_academy"
  | "manage_governance"
  | "access_admin";

const ALL: Permission[] = [
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
  "access_admin",
];

export const rolePermissions: Record<Role, Permission[]> = {
  presidente: ALL,
  vice_presidente: ALL.filter((p) => p !== "manage_settings"),
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
    "access_admin",
  ],
  tesoureiro: [
    "view_own",
    "view_members",
    "manage_quotas",
    "view_quotas_all",
    "view_intelligence",
    "access_admin",
  ],
  comissao: [
    "view_own",
    "view_members",
    "publish_comunicados",
    "manage_events",
    "manage_academy",
    "view_protect",
    "access_admin",
  ],
  associado: ["view_own", "view_protect"],
};

export const roleLabels: Record<Role, string> = {
  presidente: "Presidente",
  vice_presidente: "Vice-Presidente",
  secretario_geral: "Secretário-Geral",
  tesoureiro: "Tesoureiro/a",
  comissao: "Comissão",
  associado: "Associado",
};

export const demoAccounts: {
  role: Role;
  name: string;
  email: string;
  title: string;
  province: string;
  memberId: string;
}[] = [
  {
    role: "presidente",
    name: "Esmael Diogo da Silva",
    email: "presidente@aja.org.ao",
    title: "Presidente da AJA",
    province: "Luanda",
    memberId: "AJA-2015-0001",
  },
  {
    role: "vice_presidente",
    name: "Elisandra Manuel",
    email: "vice@aja.org.ao",
    title: "Vice-Presidente",
    province: "Benguela",
    memberId: "AJA-2016-0042",
  },
  {
    role: "secretario_geral",
    name: "Jacinto Figueira",
    email: "sg@aja.org.ao",
    title: "Secretário-Geral",
    province: "Luanda",
    memberId: "AJA-2018-0110",
  },
  {
    role: "tesoureiro",
    name: "Tesoureiro Associado",
    email: "tesouraria@aja.org.ao",
    title: "Tesoureiro/a",
    province: "Luanda",
    memberId: "AJA-2017-0088",
  },
  {
    role: "comissao",
    name: "Comissão de Formação",
    email: "formacao@aja.org.ao",
    title: "Comissão de Formação",
    province: "Huambo",
    memberId: "AJA-2019-0201",
  },
  {
    role: "associado",
    name: "Magistrado Associado",
    email: "associado@aja.org.ao",
    title: "Juiz de Direito",
    province: "Luanda",
    memberId: "AJA-2015-0847",
  },
];

export function can(role: Role, permission: Permission) {
  return rolePermissions[role].includes(permission);
}

export function permissionMatrix() {
  return (Object.keys(rolePermissions) as Role[]).map((role) => ({
    role,
    label: roleLabels[role],
    permissions: rolePermissions[role],
  }));
}
