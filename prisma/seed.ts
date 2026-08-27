import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import path from "node:path";
import { DOCUMENT_TYPES, KVKK_POLICY_VERSION, KVKK_PURPOSE, ROLES, STATUSES } from "../src/lib/constants";
import { hashTc, tcLast4 } from "../src/lib/tc";

process.env.DATABASE_URL ??= "file:./dev.db";
process.env.AUTH_SECRET ??= "local-dev-auth-secret-do-not-use-in-prod-32";
process.env.KVKK_PEPPER ??= "local-dev-kvkk-pepper-do-not-use-in-prod-32";

const prisma = new PrismaClient({
  datasources: {
    db: { url: `file:${path.join(process.cwd(), "prisma", "dev.db")}` },
  },
});

const DEMO_PASSWORD = "Teslim123!";
const AHMET_TC = "10000000146";
const ELIF_TC = "12345678950";

async function main() {
  await prisma.inboxNotice.deleteMany();
  await prisma.documentEvent.deleteMany();
  await prisma.document.deleteMany();
  await prisma.auditLog.deleteMany();
  await prisma.consent.deleteMany();
  await prisma.tenantMember.deleteMany();
  await prisma.tenant.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash(DEMO_PASSWORD, 12);

  const caddebostan = await prisma.tenant.create({
    data: {
      slug: "caddebostan",
      name: "Caddebostan Mahallesi Muhtarlığı",
      neighborhood: "Caddebostan",
      district: "Kadıköy",
      city: "İstanbul",
      address: "Bağdat Cad. Muhtarlık Binası No: 12, Caddebostan",
      phone: "0216 356 00 11",
      email: "caddebostan@ornek.muhtarlik",
      hours: "Hafta içi 09:00–17:00, Cuma 09:00–13:00",
      muhtarName: "Ayşe Demir",
      kvkkContact: "caddebostan@ornek.muhtarlik",
    },
  });

  const alsancak = await prisma.tenant.create({
    data: {
      slug: "alsancak",
      name: "Alsancak Mahallesi Muhtarlığı",
      neighborhood: "Alsancak",
      district: "Konak",
      city: "İzmir",
      address: "Kıbrıs Şehitleri Cad. No: 8, Alsancak",
      phone: "0232 421 00 22",
      hours: "Hafta içi 08:30–17:00",
      muhtarName: "Mehmet Koç",
      kvkkContact: "alsancak@ornek.muhtarlik",
    },
  });

  const muhtar = await prisma.user.create({
    data: {
      email: "muhtar@caddebostan.ornek",
      passwordHash,
      fullName: "Ayşe Demir",
      phone: "0216 356 00 11",
      role: ROLES.MUHTAR,
      memberships: { create: { tenantId: caddebostan.id, role: "OWNER" } },
    },
  });

  await prisma.user.create({
    data: {
      email: "personel@caddebostan.ornek",
      passwordHash,
      fullName: "Selin Arslan",
      role: ROLES.STAFF,
      memberships: { create: { tenantId: caddebostan.id, role: "STAFF" } },
    },
  });

  await prisma.user.create({
    data: {
      email: "muhtar@alsancak.ornek",
      passwordHash,
      fullName: "Mehmet Koç",
      phone: "0232 421 00 22",
      role: ROLES.MUHTAR,
      memberships: { create: { tenantId: alsancak.id, role: "OWNER" } },
    },
  });

  const ahmet = await prisma.user.create({
    data: {
      email: "ahmet@ornek.com",
      passwordHash,
      fullName: "Ahmet Yılmaz",
      phone: "0532 000 00 01",
      role: ROLES.CITIZEN,
      tcHash: hashTc(AHMET_TC),
      tcLast4: tcLast4(AHMET_TC),
      kvkkConsentAt: new Date(),
      kvkkPurpose: KVKK_PURPOSE,
      consents: {
        create: {
          purpose: KVKK_PURPOSE,
          version: KVKK_POLICY_VERSION,
          granted: true,
        },
      },
    },
  });

  await prisma.user.create({
    data: {
      email: "elif@ornek.com",
      passwordHash,
      fullName: "Elif Kaya",
      role: ROLES.CITIZEN,
      tcHash: hashTc(ELIF_TC),
      tcLast4: tcLast4(ELIF_TC),
      kvkkConsentAt: new Date(),
      kvkkPurpose: KVKK_PURPOSE,
    },
  });

  const now = new Date();
  const demoReady = await prisma.document.create({
    data: {
      tenantId: caddebostan.id,
      trackingCode: "EVK-26DEMO1",
      type: DOCUMENT_TYPES.TEBLIGAT,
      title: "Resmi tebligat",
      sourceOrg: "Kadıköy Adliyesi",
      recipientName: "Ahmet Yılmaz",
      recipientTcHash: hashTc(AHMET_TC),
      recipientTcLast4: tcLast4(AHMET_TC),
      status: STATUSES.READY,
      readyAt: now,
      notifiedAt: now,
      createdById: muhtar.id,
      events: {
        create: [
          { actorId: muhtar.id, action: "status.received", note: "Evrak kayda alındı" },
          { actorId: muhtar.id, action: "status.ready", note: "Teslime hazır" },
        ],
      },
    },
  });

  await prisma.inboxNotice.create({
    data: {
      userId: ahmet.id,
      documentId: demoReady.id,
      title: "Evrakınız teslime hazır",
      body: `${caddebostan.name} sizi bekliyor. Tel: ${caddebostan.phone}. Takip: EVK-26DEMO1`,
    },
  });

  await prisma.document.create({
    data: {
      tenantId: caddebostan.id,
      trackingCode: "EVK-26DEMO2",
      type: DOCUMENT_TYPES.IKAMET,
      title: "İkamet / nüfus",
      recipientName: "Ahmet Yılmaz",
      recipientTcHash: hashTc(AHMET_TC),
      recipientTcLast4: tcLast4(AHMET_TC),
      status: STATUSES.RECEIVED,
      createdById: muhtar.id,
      events: {
        create: { actorId: muhtar.id, action: "status.received" },
      },
    },
  });

  await prisma.document.create({
    data: {
      tenantId: alsancak.id,
      trackingCode: "EVK-26IZMIR1",
      type: DOCUMENT_TYPES.RESMI_YAZI,
      title: "Resmi yazı",
      recipientName: "Elif Kaya",
      recipientTcHash: hashTc(ELIF_TC),
      recipientTcLast4: tcLast4(ELIF_TC),
      status: STATUSES.READY,
      readyAt: now,
      createdById: muhtar.id,
      events: {
        create: { action: "status.ready" },
      },
    },
  });

  await prisma.document.create({
    data: {
      tenantId: caddebostan.id,
      trackingCode: "EVK-26CROSS1",
      type: DOCUMENT_TYPES.SECIM,
      title: "Seçmen / seçim",
      recipientName: "Elif Kaya",
      recipientTcHash: hashTc(ELIF_TC),
      recipientTcLast4: tcLast4(ELIF_TC),
      status: STATUSES.RECEIVED,
      createdById: muhtar.id,
    },
  });

  console.log("Seed tamam. Demo hesaplar:");
  console.log("  muhtar@caddebostan.ornek / Teslim123!");
  console.log("  ahmet@ornek.com / Teslim123!  TC 10000000146");
  console.log("  elif@ornek.com / Teslim123!");
  console.log("  Sorgula: EVK-26DEMO1 + 0146");
  console.log(`  Vatandaş id: ${ahmet.id}`);
}

main()
  .then(() => prisma.$disconnect())
  .catch((error) => {
    console.error(error);
    prisma.$disconnect();
    process.exit(1);
  });
