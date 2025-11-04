import supabase, { supabaseUrl } from "./supabase";
import { UAParser } from "ua-parser-js";

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

  // Convert base64 data URL to Blob
  const base64Response = await fetch(qr);
  const blob = await base64Response.blob();

  const fileName = `${title}-${Date.now()}.png`;
  const { error: storageError } = await supabase.storage
    .from("qrs")
    .upload(fileName, blob, {
      contentType: "image/png",
      upsert: true,
    });
  if (storageError) {
    console.error("Error uploading QR code:", storageError.message);
    throw new Error("unable to upload QR code");
  }

  const qrCode = `${supabaseUrl}/storage/v1/object/public/qrs/${fileName}`;
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

export async function getLongUrl(id: string) {
  if (!supabase) return;
  const { data, error } = await supabase
    .from("urls")
    .select("id, original_url")
    .or(`short_url.eq.${id}, custom_url.eq.${id}`)
    .single();
  if (error) {
    console.error("Error getting long url:", error.message);
    throw new Error("unable to get long url");
  }
  return data;
}

export async function getUrl(id: string) {
  if (!supabase) return;
  const { data: url, error } = await supabase
    .from("urls")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    console.error("Error getting url:", error.message);
    throw new Error("unable to get url");
  }
  return url;
}

const parser = new UAParser();

export const storeClick = async (urlId: number, originalUrl: string) => {
  try {
    const res = parser.getResult();
    const device = res.device.type === "mobile" ? "mobile" : "desktop";

    const response = await fetch(`https://ipapi.co/json`);
    const { city, country_name: country } = await response.json();

    if (!supabase) return;
    await supabase.from("clicks").insert({
      url_id: urlId,
      device: device,
      city: city,
      country: country,
    });

    window.location.href = originalUrl;
  } catch (error) {
    console.error("Error storing click:", error);
    throw new Error("unable to store click");
  }
};
