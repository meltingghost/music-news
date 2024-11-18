import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request): Promise<Response> {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query") || "";
    const locale = (searchParams.get("locale") || "en") as "en" | "es";
    const skip = parseInt(searchParams.get("skip") || "0", 10);
    const take = parseInt(searchParams.get("take") || "10", 10);

    const searchQuery = query
      .trim()
      .split(/\s+/)
      .map((term) => `${term}:*`)
      .join(" & ");

    const results = await prisma.$queryRawUnsafe(
      `
        SELECT * 
        FROM "Post" 
        WHERE "searchVector" @@ to_tsquery('${locale}', $1)
        ORDER BY "publishedAt" DESC
        LIMIT $2 OFFSET $3;
      `,
      searchQuery,
      take,
      skip
    );

    return NextResponse.json(results);
  } catch (error: any) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts", details: error.message },
      { status: 500 }
    );
  }
}
