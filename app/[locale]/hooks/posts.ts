import fs from "fs";
import matter from "gray-matter";
import { join } from "path";
import prisma from "@/lib/prisma";
import { Post } from "@prisma/client";

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return { ...data, slug: realSlug, content } as Post;
}

export async function getAllPosts(locale: "en" | "es" = "en"): Promise<Post[]> {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      slug: true,
      coverImage: true,
      publishedAt: true,
      titleTranslations: true,
      contentTranslations: true,
      excerptTranslations: true,
    },
  });

  return posts.map((post) => ({
    ...post,
    title: post.titleTranslations?.[locale],
    content: post.contentTranslations?.[locale],
    excerpt: post.excerptTranslations?.[locale],
  })) as Post[];
}
