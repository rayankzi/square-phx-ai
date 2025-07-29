import { api } from "@/convex/_generated/api";
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { fetchQuery } from "convex/nextjs";
import { redirect } from "next/navigation";
import React from "react";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = await convexAuthNextjsToken();
  const dbUser = await fetchQuery(api.users.current, {}, { token });
  if (!dbUser) return redirect("/sign-in");
  if (!dbUser.isVerifiedOnPlatform) return redirect("/not-verified");

  return <>{children}</>;
}
