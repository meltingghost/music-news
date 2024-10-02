import Post from "@/interfaces/post";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";
import prisma from "@/lib/prisma";

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

export async function getAllPosts(): Promise<Post[]> {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      article: {
        select: {
          id: true,
          type: true,
          title: true,
          url: true,
        },
      },
    },
  });
  return posts as Post[];
}
