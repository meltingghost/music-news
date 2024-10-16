import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

declare global {
  namespace PrismaJson {
    type TitleTranslations = { en: string; es: string };
    type ContentTranslations = { en: string; es: string };
    type ExcerptTranslations = { en: string | null; es: string | null };
  }
}

export default prisma;
