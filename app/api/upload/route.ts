import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { validateAdminToken } from "@/lib/auth";

export async function POST(request: Request) {
  const isAuthorized = await validateAdminToken();

  if (!isAuthorized) {
    return NextResponse.json({ error: "Unauthorized upload request." }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.\-_]/g, "-")}`;
  const uploadDirectory = path.join(process.cwd(), "public", "uploads");
  const uploadPath = path.join(uploadDirectory, safeName);

  await fs.mkdir(uploadDirectory, { recursive: true });
  await fs.writeFile(uploadPath, bytes);

  return NextResponse.json({ url: `/uploads/${safeName}` });
}
