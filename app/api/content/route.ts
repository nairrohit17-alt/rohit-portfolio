import { NextResponse } from "next/server";
import { validateAdminToken } from "@/lib/auth";
import { readSiteData, writeSiteData } from "@/lib/site-data";

export async function GET() {
  const data = await readSiteData();
  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  const isAuthorized = await validateAdminToken();

  if (!isAuthorized) {
    return NextResponse.json({ error: "Unauthorized. Add ADMIN_TOKEN to .env.local and use it in /admin." }, { status: 401 });
  }

  const nextData = await request.json();
  await writeSiteData(nextData);

  return NextResponse.json({ ok: true });
}
