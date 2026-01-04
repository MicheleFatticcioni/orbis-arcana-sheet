import { neon } from "@neondatabase/serverless";
/**
 * Execute a database query.
 * @param q The SQL query to execute.
 * @returns The result of the query.
 */
export async function query<T>(
  strings: TemplateStringsArray,
  ...values: unknown[]
): Promise<T> {
  try {
    const sql = neon(process.env.DATABASE_URL || "");
    // Pass both the strings array and the values to the neon query function
    const data = await sql(strings, ...values);
    return data as T;
  } catch (error) {
    console.error("Database query failed:", error);
    throw error;
  }
}
