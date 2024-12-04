import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

type Locale = "en" | "es";

export async function GET(
  req: Request,
  { params }: { params: { tag: string } }
): Promise<Response> {
  const { tag } = params;

  if (!tag) {
    return NextResponse.json({ error: "Tag not specified" }, { status: 400 });
  }

  const url = new URL(req.url);
  const locale = (url.searchParams.get("locale") || "en") as Locale;

  try {
    const posts = await prisma.post.findMany({
      where: {
        tags: {
          some: locale === "es" ? { nameEs: tag } : { nameEn: tag },
        },
      },
      select: {
        id: true,
        titleTranslations: true,
        excerptTranslations: true,
        slug: true,
        coverImage: true,
        publishedAt: true,
      },
    });

    const formattedPosts = posts.map((post) => ({
      id: post.id,
      title: post.titleTranslations[locale],
      excerpt: post.excerptTranslations[locale],
      slug: post.slug,
      coverImage: post.coverImage,
      publishedAt: post.publishedAt,
    }));

    return NextResponse.json(formattedPosts);
  } catch (error: any) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts", details: error.message },
      { status: 500 }
    );
  }
}
