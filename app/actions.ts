import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getPosts() {
  try {
    const posts = await prisma.post.findMany();
    return posts;
  } catch (error) {
    console.error("Error al obtener las entradas:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
