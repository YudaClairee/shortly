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

export async function deleteUrl(id: string) {
  if (!supabase) return;
  const { data, error } = await supabase.from("urls").delete().eq("id", id);
  if (error) {
    console.error("Error deleting url:", error.message);
    throw new Error("unable to delete url");
  }
  return data;
}
