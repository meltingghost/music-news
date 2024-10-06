import prisma from "@/lib/prisma";

export async function getPosts() {
  try {
    const posts = await prisma.newsArticle.findMany();
    return posts;
  } catch (error) {
    console.error("Error al obtener las entradas:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
