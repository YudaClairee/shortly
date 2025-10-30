import { useEffect, useState, useCallback } from "react";
import { useAuthUser } from "@/hooks/useAuthUser";
import { deleteUrl, getUrls } from "@/db/apiUrls";
import { getClicks } from "@/db/apiClicks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Link2,
  MousePointerClick,
  Plus,
  Search,
  ExternalLink,
  Copy,
  Trash2,
  BarChart3,
  Calendar,
  Download,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import CreateLink from "@/components/create-link";

interface Url {
  id: string;
  original_url: string;
  short_url: string;
  custom_url?: string;
  title?: string;
  user_id: string;
  created_at: string;
  qr?: string;
}

interface Click {
  id: string;
  url_id: string;
  created_at: string;
  city?: string;
  country?: string;
  device?: string;
}

function Dashboard() {
  const user = useAuthUser();
  const navigate = useNavigate();
  const [urls, setUrls] = useState<Url[]>([]);
  const [clicks, setClicks] = useState<Click[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const urlsData = await getUrls(user?.id || "");
      setUrls(urlsData);

      if (urlsData.length > 0) {
        const urlIds = urlsData.map((url: Url) => url.id);
        const clicksData = await getClicks(urlIds);
        setClicks(clicksData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    if (user?.id) {
      fetchData();
    }
  }, [user?.id, fetchData]);

  const filteredUrls = urls.filter((url) => {
    const query = searchQuery?.toLowerCase() || "";
    return (
      url.original_url?.toLowerCase()?.includes(query) ||
      url.short_url?.toLowerCase()?.includes(query) ||
      url.custom_url?.toLowerCase()?.includes(query) ||
      url.title?.toLowerCase()?.includes(query)
    );
  });

  const totalClicks = clicks.length;
  const totalUrls = urls.length;

  const getUrlClicks = (urlId: string) => {
    return clicks.filter((click) => click.url_id === urlId).length;
  };

  const handleCopy = async (url: string, id: string) => {
    await navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownload = async (url: string, title: string) => {
    try {
      if (!url) {
        toast.error("QR Code tidak tersedia", {
          duration: 2000,
          position: "bottom-right",
        });
        return;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Gagal mengunduh QR Code");
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = `${title}-qr.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(downloadUrl);

      toast.success("QR Code berhasil diunduh!", {
        duration: 2000,
        position: "bottom-right",
      });
    } catch (error) {
      console.error("Error downloading QR code:", error);
      toast.error("Gagal mengunduh QR Code", {
        duration: 2000,
        position: "bottom-right",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteUrl(id);
    } catch (error) {
      console.error("Error deleting url:", error);
      toast.error("Gagal menghapus link", {
        duration: 2000,
        position: "bottom-right",
      });
    }
    toast.success("Link berhasil dihapus!", {
      duration: 2000,
      position: "bottom-right",
    });
    fetchData();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen pb-16">
      <div className="container mx-auto px-4 pt-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header Section */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#9043E5] to-[#7B35E6] bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-gray-400 text-lg">
              Kelola semua link pendek kamu di satu tempat
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-[#9043E5]/10 to-[#7B35E6]/10 border-[#9043E5]/20 hover:shadow-lg transition-all">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardDescription className="text-gray-400">
                      Total Links
                    </CardDescription>
                    <CardTitle className="text-4xl font-bold text-white mt-2">
                      {loading ? "..." : totalUrls}
                    </CardTitle>
                  </div>
                  <div className="p-4 bg-[#9043E5]/20 rounded-full">
                    <Link2 className="h-8 w-8 text-[#9043E5]" />
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-500/20 hover:shadow-lg transition-all">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardDescription className="text-gray-400">
                      Total Clicks
                    </CardDescription>
                    <CardTitle className="text-4xl font-bold text-white mt-2">
                      {loading ? "..." : totalClicks}
                    </CardTitle>
                  </div>
                  <div className="p-4 bg-cyan-500/20 rounded-full">
                    <MousePointerClick className="h-8 w-8 text-cyan-500" />
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>

          {/* Search and Add Button */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Cari link berdasarkan URL, title, atau custom URL..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-[#9043E5]"
              />
            </div>
            <CreateLink />
          </div>

          {/* Links List */}
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#9043E5]"></div>
                <p className="text-gray-400 mt-4">Memuat data...</p>
              </div>
            ) : filteredUrls.length === 0 ? (
              <Card className="bg-white/5 border-white/10">
                <CardContent className="py-12 text-center">
                  <div className="inline-flex p-4 bg-[#9043E5]/20 rounded-full mb-4">
                    <Link2 className="h-8 w-8 text-[#9043E5]" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {searchQuery
                      ? "Tidak ada link yang ditemukan"
                      : "Belum ada link"}
                  </h3>
                  <p className="text-gray-400 mb-6">
                    {searchQuery
                      ? "Coba kata kunci lain untuk mencari link"
                      : "Mulai buat link pendek pertama kamu sekarang!"}
                  </p>
                  {!searchQuery && (
                    <Button
                      onClick={() => navigate("/auth?createNew=true")}
                      className="bg-gradient-to-r from-[#9043E5] to-[#7B35E6] hover:from-[#9043E5]/90 hover:to-[#7B35E6]/90"
                    >
                      <Plus className="h-5 w-5" />
                      Buat Link Pertama
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              filteredUrls.map((url) => {
                const urlClicks = getUrlClicks(url.id);
                const shortUrl = url.custom_url || url.short_url;
                const fullShortUrl = `https://short.ly/${shortUrl}`;

                return (
                  <Card
                    key={url.id}
                    className="bg-white/5 border-white/10 hover:bg-white/10 hover:border-[#9043E5]/30 transition-all group"
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                        {/* Left Section - URL Info */}
                        <div className="w-40 h-40 bg-white/5 border-white/10 rounded-lg p-2 flex items-center justify-center">
                          <img src={url.qr || ""} alt="QR Code" />
                        </div>
                        <div className="flex-1 space-y-3 min-w-0">
                          {/* Title or Original URL */}
                          <div>
                            <h3 className="text-lg font-semibold text-white mb-1 truncate">
                              {url.title || "Untitled Link"}
                            </h3>
                            <a
                              href={url.original_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-[#9043E5] text-sm flex items-center gap-1 truncate transition-colors"
                            >
                              <span className="truncate">
                                {url.original_url}
                              </span>
                              <ExternalLink className="h-3 w-3 flex-shrink-0" />
                            </a>
                          </div>

                          {/* Short URL */}
                          <div className="flex items-center gap-2 bg-[#9043E5]/10 rounded-lg px-3 py-2 border border-[#9043E5]/20">
                            <Link2 className="h-4 w-4 text-[#9043E5] flex-shrink-0" />
                            <code className="text-[#9043E5] font-mono text-sm truncate flex-1">
                              {fullShortUrl}
                            </code>
                            <Button
                              size="icon-sm"
                              variant="ghost"
                              onClick={() => handleCopy(fullShortUrl, url.id)}
                              className="hover:bg-[#9043E5]/20 flex-shrink-0"
                            >
                              {copiedId === url.id ? (
                                <span className="text-green-500 text-xs font-semibold">
                                  ✓
                                </span>
                              ) : (
                                <Copy className="h-4 w-4 text-[#9043E5]" />
                              )}
                            </Button>
                          </div>

                          {/* Meta Info */}
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{formatDate(url.created_at)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MousePointerClick className="h-4 w-4" />
                              <span>
                                {urlClicks}{" "}
                                {urlClicks === 1 ? "click" : "clicks"}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Right Section - Actions */}
                        <div className="flex lg:flex-col gap-2">
                          <Button
                            onClick={() => navigate(`/link/${url.id}`)}
                            variant="outline"
                            size="sm"
                            className="flex-1 lg:flex-none border-[#9043E5]/30 text-[#9043E5] hover:bg-[#9043E5]/10"
                          >
                            <BarChart3 className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => handleDelete(url.id)}
                            variant="outline"
                            size="icon-sm"
                            className="border-red-500/30 text-red-500 hover:bg-red-500/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() =>
                              handleDownload(url.qr || "", url.title || "")
                            }
                            variant="outline"
                            size="icon-sm"
                            className="border-green-500/30 text-green-500 hover:bg-green-500/10"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>

          {/* Results Info */}
          {!loading && filteredUrls.length > 0 && (
            <div className="text-center text-gray-400 text-sm">
              Menampilkan {filteredUrls.length} dari {totalUrls} link
              {searchQuery && ` untuk "${searchQuery}"`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
