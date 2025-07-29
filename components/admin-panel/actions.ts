"use server";

import { api } from "@/convex/_generated/api";
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { fetchMutation, fetchQuery } from "convex/nextjs";
import { revalidatePath } from "next/cache";

export async function verifyUser() {
  const token = await convexAuthNextjsToken();
  const dbUser = await fetchQuery(api.users.current, {}, { token });
  if (!dbUser || !dbUser.isAdmin) return null;

  await fetchMutation(api.users.verify, { userId: dbUser._id }, { token });

  revalidatePath("/admin");
}

export async function changeUserAdminStatus() {
  const token = await convexAuthNextjsToken();
  const dbUser = await fetchQuery(api.users.current, {}, { token });
  if (!dbUser || !dbUser.isAdmin) return null;

  await fetchMutation(
    api.users.changeAdminStatus,
    { userId: dbUser._id },
    { token },
  );

  revalidatePath("/admin");
}
