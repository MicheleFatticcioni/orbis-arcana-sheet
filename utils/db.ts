import fs from "fs/promises";
import path from "path";

const DB_PATH = path.join(process.cwd(), "data", "db.json");

export interface Sheet {
  id: string;
  userId: string; // For future use, currently 'admin'
  data: any;
  updatedAt: string;
}

interface Database {
  sheets: Sheet[];
}

async function ensureDb() {
  try {
    await fs.access(DB_PATH);
  } catch {
    await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
    await fs.writeFile(DB_PATH, JSON.stringify({ sheets: [] }, null, 2));
  }
}

export async function getDb(): Promise<Database> {
  await ensureDb();
  const content = await fs.readFile(DB_PATH, "utf-8");
  return JSON.parse(content);
}

export async function saveDb(db: Database) {
  await ensureDb();
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));
}

export async function getSheets() {
  const db = await getDb();
  return db.sheets;
}

export async function getSheet(id: string) {
  const db = await getDb();
  return db.sheets.find((s) => s.id === id);
}

export async function createSheet(data: any) {
  const db = await getDb();
  const newSheet: Sheet = {
    id: crypto.randomUUID(),
    userId: "admin",
    data,
    updatedAt: new Date().toISOString(),
  };
  db.sheets.push(newSheet);
  await saveDb(db);
  return newSheet;
}

export async function updateSheet(id: string, data: any) {
  const db = await getDb();
  const index = db.sheets.findIndex((s) => s.id === id);
  if (index === -1) return null;

  db.sheets[index] = {
    ...db.sheets[index],
    data,
    updatedAt: new Date().toISOString(),
  };
  await saveDb(db);
  return db.sheets[index];
}

export async function deleteSheet(id: string) {
  const db = await getDb();
  const index = db.sheets.findIndex((s) => s.id === id);
  if (index === -1) return false;

  db.sheets.splice(index, 1);
  await saveDb(db);
  return true;
}
