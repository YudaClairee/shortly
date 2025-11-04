import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getLongUrl, storeClick } from "@/db/apiUrls";

function RedirectLink() {
  const { id } = useParams();

  useEffect(() => {
    const redirect = async () => {
      try {
        if (!id) {
          console.error("No ID provided");
          window.location.href = "/";
          return;
        }

        // Fetch original URL dari database
        const data = await getLongUrl(id);

        if (!data || !data.original_url) {
          console.error("URL not found");
          window.location.href = "/";
          return;
        }

        // Store click analytics & redirect
        await storeClick(data.id, data.original_url);
      } catch (error) {
        console.error("Error redirecting:", error);
        // Kalo error, redirect ke homepage aja
        window.location.href = "/";
      }
    };

    redirect();
  }, [id]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-muted-foreground">Redirecting...</p>
      </div>
    </div>
  );
}

export default RedirectLink;
