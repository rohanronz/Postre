import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import AppClient from "./AppClient";
import { createClient } from "@/lib/supabase/server";

export default async function AppPage() {
  const cookieStore = await cookies();
  const isDemo = cookieStore.get("postre_demo")?.value === "1";
  if (isDemo) {
    return <AppClient isDemo={true} />;
  }
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return <AppClient isDemo={false} />;
}
