import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

declare global {
  namespace PrismaJson {
    type TitleTranslations = { en: string | null; es: string | null };
    type ContentTranslations = { en: string | null; es: string | null };
    type ExcerptTranslations = { en: string | null; es: string | null };
  }
}

export default prisma;
