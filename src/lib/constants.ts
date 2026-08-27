export const APP_NAME = "Teslim";
export const APP_TAGLINE = "Muhtarlık evrak yönetimi";
export const KVKK_POLICY_VERSION = "2026-08-1";
export const KVKK_PURPOSE =
  "Gelen evrakın ilgili kişiye tesliminin takibi ve muhtarlık iletişim bilgilerinin paylaşılması";
export const RETENTION_MONTHS_AFTER_DELIVERY = 24;
export const SESSION_COOKIE = "teslim_session";
export const SESSION_DAYS = 12;

export const ROLES = {
  CITIZEN: "CITIZEN",
  MUHTAR: "MUHTAR",
  STAFF: "STAFF",
  PLATFORM_ADMIN: "PLATFORM_ADMIN",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const MEMBER_ROLES = {
  OWNER: "OWNER",
  STAFF: "STAFF",
} as const;

export const DOCUMENT_TYPES = {
  TEBLIGAT: "TEBLIGAT",
  RESMI_YAZI: "RESMI_YAZI",
  SECIM: "SECIM",
  IKAMET: "IKAMET",
  DIGER: "DIGER",
} as const;

export type DocumentType = (typeof DOCUMENT_TYPES)[keyof typeof DOCUMENT_TYPES];

export const DOCUMENT_TYPE_LABELS: Record<DocumentType, string> = {
  TEBLIGAT: "Resmi tebligat",
  RESMI_YAZI: "Resmi yazı",
  SECIM: "Seçmen / seçim",
  IKAMET: "İkamet / nüfus",
  DIGER: "Diğer evrak",
};

export const STATUSES = {
  RECEIVED: "RECEIVED",
  READY: "READY",
  DELIVERED: "DELIVERED",
  RETURNED: "RETURNED",
} as const;

export type DocumentStatus = (typeof STATUSES)[keyof typeof STATUSES];

export const STATUS_LABELS: Record<DocumentStatus, string> = {
  RECEIVED: "Alındı",
  READY: "Teslime hazır",
  DELIVERED: "Teslim edildi",
  RETURNED: "İade / iade edildi",
};

export const STATUS_HINTS: Record<DocumentStatus, string> = {
  RECEIVED: "Evrak muhtarlıkta kayda geçti.",
  READY: "Evrak teslim için bekliyor. Kimlik ile başvurabilirsiniz.",
  DELIVERED: "Evrak ilgili kişiye teslim edildi.",
  RETURNED: "Evrak gönderen kuruma iade sürecinde.",
};

export const ALLOWED_TRANSITIONS: Record<DocumentStatus, DocumentStatus[]> = {
  RECEIVED: ["READY", "RETURNED"],
  READY: ["DELIVERED", "RETURNED", "RECEIVED"],
  DELIVERED: [],
  RETURNED: ["READY"],
};

export function canTransition(from: DocumentStatus, to: DocumentStatus): boolean {
  return ALLOWED_TRANSITIONS[from].includes(to);
}
