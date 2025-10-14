import supabase from "./supabase";

export async function getUrls(userId: string) {
  if (!supabase) return [];

  const { data: urls, error } = await supabase
    .from("urls")
    .select("*")
    .eq("user_id", userId);
  if (error) {
    console.error("Error getting urls:", error.message);
    throw new Error("unable to get urls");
  }
  return urls ?? [];
}
