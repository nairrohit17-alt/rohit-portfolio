import { headers } from "next/headers";

export async function validateAdminToken() {
  const headerStore = await headers();
  const submittedToken = headerStore.get("x-admin-token");
  const validToken = process.env.ADMIN_TOKEN;

  if (!validToken || submittedToken !== validToken) {
    return false;
  }

  return true;
}
