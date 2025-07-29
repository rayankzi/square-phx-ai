import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";

export async function WithSidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const sidebarState = cookieStore.get("sidebar:state")?.value;
  let defaultOpen = true;
  if (sidebarState) defaultOpen = sidebarState === "true";

  const token = await convexAuthNextjsToken();
  const dbUser = await fetchQuery(api.users.current, {}, { token });
  if (!dbUser) redirect("/sign-in");

  const chats = await fetchQuery(api.chats.getAllCurrentUser, {}, { token });

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar user={dbUser} chats={chats} />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
