import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import HistoryClient from "./HistoryClient";

type HistoryItem = {
  id: string;
  prompt: string | null;
  source_url: string | null;
  created_at: string;
  result: {
    linkedin: string;
    twitter: string[];
    facebook: string;
    newsletter: {
      subject: string;
      body: string;
    };
    blog: {
      summary: string;
      keyTakeaways: string[];
      metaDescription: string;
    };
  };
};

export default async function HistoryPage() {
  const cookieStore = await cookies();
  if (cookieStore.get("postre_demo")?.value === "1") {
    return <HistoryClient items={[]} />;
  }
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data, error } = await supabase
    .from("generated_content")
    .select("id, prompt, source_url, created_at, result")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("Failed to load history.");
  }

  return <HistoryClient items={(data ?? []) as HistoryItem[]} />;
}
