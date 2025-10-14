import supabase from "./supabase";

export async function getClicks(urlIds: string[]) {
  if (!supabase) return [];

  const { data: clicks, error } = await supabase
    .from("clicks")
    .select("*")
    .in("url_id", urlIds);
  if (error) {
    console.error("Error getting clicks:", error.message);
    throw new Error("unable to get clicks");
  }
  return clicks ?? [];
}
