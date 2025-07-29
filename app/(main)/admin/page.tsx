import { AdminPanel } from "@/components/admin-panel";
import { api } from "@/convex/_generated/api";
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { fetchQuery } from "convex/nextjs";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const token = await convexAuthNextjsToken();
  const user = await fetchQuery(api.users.current, {}, { token });
  if (!user || !user.isAdmin) redirect("/chat");

  const allUsers = await fetchQuery(api.users.all, {}, { token });
  if (!allUsers) throw new Error("Error fetching all users");

  return <AdminPanel users={allUsers} />;
}
