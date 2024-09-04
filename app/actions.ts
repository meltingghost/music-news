"use server";
import { neon } from "@neondatabase/serverless";

export async function getData() {
  const sql = neon(process.env.DATABASE_URL || "default_connection_string");
  const data = await sql`...`;
  return data;
}
