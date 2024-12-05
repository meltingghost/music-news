import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const locale = (url.searchParams.get("locale") || "en") as "en" | "es";

  try {
    const tags = await prisma.tags.findMany({
      take: 6,
      orderBy: {
        posts: {
          _count: "desc",
        },
      },
      select: {
        nameEs: true,
        nameEn: true,
        _count: {
          select: {
            posts: true,
          },
        },
      },
    });

    const formattedTags = tags.map((tag) => ({
      name: locale === "es" ? tag.nameEs : tag.nameEn,
      translations: {
        en: tag.nameEn,
        es: tag.nameEs,
      },
      postCount: tag._count.posts,
    }));

    return NextResponse.json(formattedTags);
  } catch (error: any) {
    console.error("Error fetching tags:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch tags",
        message: "An error occurred while retrieving tags.",
      },
      { status: 500 }
    );
  }
}
