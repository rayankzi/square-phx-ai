import { VerificationPending } from "@/components/verification-pending";
import { api } from "@/convex/_generated/api";
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { fetchQuery } from "convex/nextjs";
import { redirect } from "next/navigation";

export default async function NotVerifiedPage() {
  const token = await convexAuthNextjsToken();
  const dbUser = await fetchQuery(api.users.current, {}, { token });
  if (!dbUser) return redirect("/sign-in");
  if (dbUser.isVerifiedOnPlatform) return redirect("/chat");

  return <VerificationPending />;
}
