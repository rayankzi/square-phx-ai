import { SignOutButton } from "@/components/sign-out";
import { api } from "@/convex/_generated/api";
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { fetchQuery } from "convex/nextjs";

export default async function Home() {
  const token = await convexAuthNextjsToken();
  const x = await fetchQuery(api.users.all, {}, { token });
  console.log(x);

  return (
    <div>
      <p>Hi</p>
      <SignOutButton />
    </div>
  );
}
