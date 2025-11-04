import { useState } from "react";
import {
  Dialog,
  DialogDescription,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Plus, Link2, Loader2 } from "lucide-react";
import { useAuthUser } from "@/hooks/useAuthUser";
import { createUrl } from "@/db/apiUrls";
import { toast } from "sonner";
import QRCode from "qrcode";

function CreateLink() {
  const [title, setTitle] = useState("");
  const [originalUrl, setOriginalUrl] = useState("");
  const [customUrl, setCustomUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const user = useAuthUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Title harus diisi!", {
        duration: 2000,
        position: "bottom-right",
      });
      return;
    }

    if (!originalUrl.trim()) {
      toast.error("URL asli harus diisi!", {
        duration: 2000,
        position: "bottom-right",
      });
      return;
    }

    // Validasi URL
    try {
      new URL(originalUrl);
    } catch {
      toast.error("Format URL tidak valid!", {
        duration: 2000,
        position: "bottom-right",
      });
      return;
    }

    setLoading(true);

    try {
      // Generate QR Code
      const qrCodeUrl = customUrl
        ? `https://short.ly/${customUrl}`
        : originalUrl;

      const qrCode = await QRCode.toDataURL(qrCodeUrl);

      // Create URL
      await createUrl(originalUrl, customUrl, title, user?.id || "", qrCode);

      toast.success("Link berhasil dibuat!", {
        duration: 2000,
        position: "bottom-right",
      });

      // Reset form
      setTitle("");
      setOriginalUrl("");
      setCustomUrl("");
      setOpen(false);

      // Refresh page atau navigate
      window.location.reload();
    } catch (error) {
      console.error("Error creating link:", error);
      toast.error("Gagal membuat link. Silakan coba lagi.", {
        duration: 2000,
        position: "bottom-right",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            className="bg-gradient-to-r from-[#9043E5] to-[#7B35E6] hover:from-[#9043E5]/90 hover:to-[#7B35E6]/90 text-white font-semibold"
            size="lg"
          >
            <Plus className="h-5 w-5 mr-2" />
            Tambah Link Baru
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-gray-900 border-white/10">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-[#9043E5] to-[#7B35E6] bg-clip-text text-transparent">
              Buat Link Pendek
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Masukkan informasi link yang ingin kamu perpendek
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            {/* Title Field */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-white">
                Judul Link <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                type="text"
                placeholder="Contoh: Website Portfolio Saya"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-[#9043E5]"
                disabled={loading}
              />
              <p className="text-xs text-gray-500">
                Berikan judul yang mudah diingat untuk link ini
              </p>
            </div>

            {/* Original URL Field */}
            <div className="space-y-2">
              <Label htmlFor="original-url" className="text-white">
                URL Asli <span className="text-red-500">*</span>
              </Label>
              <Input
                id="original-url"
                type="url"
                placeholder="https://example.com/very-long-url-here"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-[#9043E5]"
                disabled={loading}
              />
              <p className="text-xs text-gray-500">
                URL lengkap yang ingin kamu perpendek
              </p>
            </div>

            {/* Custom URL Field */}
            <div className="space-y-2">
              <Label htmlFor="custom-url" className="text-white">
                Custom URL <span className="text-gray-500">(Opsional)</span>
              </Label>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-sm flex-shrink-0">
                  short.ly/
                </span>
                <Input
                  id="custom-url"
                  type="text"
                  placeholder="custom-link"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-[#9043E5]"
                  disabled={loading}
                />
              </div>
              <p className="text-xs text-gray-500">
                Kosongkan untuk generate URL random otomatis
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={loading}
                className="flex-1 border-white/10 text-white hover:bg-white/5"
              >
                Batal
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-[#9043E5] to-[#7B35E6] hover:from-[#9043E5]/90 hover:to-[#7B35E6]/90"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Membuat...
                  </>
                ) : (
                  <>
                    <Link2 className="h-4 w-4 mr-2" />
                    Buat Link
                  </>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateLink;
