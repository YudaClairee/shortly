import supabase, { supabaseUrl } from "./supabase";

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

export async function createUrl(
  url: string,
  customUrl: string,
  title: string,
  userId: string,
  qr: string
) {
  if (!supabase) return;

  const shortUrl = Math.random().toString(36).substring(2, 8);

  const { error: storageError } = await supabase.storage
    .from("qrs")
    .upload(title, qr, {
      upsert: true,
    });
  if (storageError) {
    console.error("Error uploading QR code:", storageError.message);
    throw new Error("unable to upload QR code");
  }

  const qrCode = `${supabaseUrl}/storage/v1/object/public/qrs/${title}`;
  const { data, error } = await supabase
    .from("urls")
    .insert({
      original_url: url,
      short_url: shortUrl,
      custom_url: customUrl || null,
      title,
      user_id: userId,
      qr: qrCode,
    })
    .select();
  if (error) {
    console.error("Error creating short url:", error.message);
    throw new Error("unable to create short url");
  }
  return data;
}
