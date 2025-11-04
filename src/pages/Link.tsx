import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUrl } from "@/db/apiUrls";
import { getClicksForUrl } from "@/db/apiClicks";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowLeft,
  MousePointerClick,
  Globe,
  Smartphone,
  Monitor,
  MapPin,
  Calendar,
  ExternalLink,
  Copy,
  Download,
  TrendingUp,
} from "lucide-react";
import { toast } from "sonner";

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

interface DeviceStats {
  device: string;
  count: number;
  percentage: number;
}

interface LocationStats {
  location: string;
  count: number;
  percentage: number;
}

function Link() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [url, setUrl] = useState<Url | null>(null);
  const [clicks, setClicks] = useState<Click[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const urlData = await getUrl(id);
        setUrl(urlData);

        const clicksData = await getClicksForUrl(id);
        setClicks(clicksData);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Gagal memuat data", {
          duration: 2000,
          position: "bottom-right",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleCopy = async (text: string, copyId: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(copyId);
    toast.success("Link berhasil disalin!", {
      duration: 2000,
      position: "bottom-right",
    });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownload = async (qrUrl: string, title: string) => {
    try {
      if (!qrUrl) {
        toast.error("QR Code tidak tersedia", {
          duration: 2000,
          position: "bottom-right",
        });
        return;
      }

      const response = await fetch(qrUrl);
      if (!response.ok) throw new Error("Gagal mengunduh QR Code");

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Calculate device statistics
  const deviceStats: DeviceStats[] = (() => {
    const deviceMap = new Map<string, number>();
    clicks.forEach((click) => {
      const device = click.device || "Unknown";
      deviceMap.set(device, (deviceMap.get(device) || 0) + 1);
    });

    return Array.from(deviceMap.entries())
      .map(([device, count]) => ({
        device,
        count,
        percentage: clicks.length > 0 ? (count / clicks.length) * 100 : 0,
      }))
      .sort((a, b) => b.count - a.count);
  })();

  // Calculate location statistics (by country)
  const countryStats: LocationStats[] = (() => {
    const countryMap = new Map<string, number>();
    clicks.forEach((click) => {
      const country = click.country || "Unknown";
      countryMap.set(country, (countryMap.get(country) || 0) + 1);
    });

    return Array.from(countryMap.entries())
      .map(([location, count]) => ({
        location,
        count,
        percentage: clicks.length > 0 ? (count / clicks.length) * 100 : 0,
      }))
      .sort((a, b) => b.count - a.count);
  })();

  // Calculate city statistics
  const cityStats: LocationStats[] = (() => {
    const cityMap = new Map<string, number>();
    clicks.forEach((click) => {
      const city = click.city || "Unknown";
      cityMap.set(city, (cityMap.get(city) || 0) + 1);
    });

    return Array.from(cityMap.entries())
      .map(([location, count]) => ({
        location,
        count,
        percentage: clicks.length > 0 ? (count / clicks.length) * 100 : 0,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10); // Top 10 cities
  })();

  if (loading) {
    return (
      <div className="min-h-screen pb-16">
        <div className="container mx-auto px-4 pt-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#9043E5]"></div>
              <p className="text-gray-400 mt-4">Memuat data analytics...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!url) {
    return (
      <div className="min-h-screen pb-16">
        <div className="container mx-auto px-4 pt-8">
          <div className="max-w-7xl mx-auto">
            <Card className="bg-white/5 border-white/10">
              <CardContent className="py-12 text-center">
                <h3 className="text-xl font-semibold text-white mb-2">
                  Link tidak ditemukan
                </h3>
                <p className="text-gray-400 mb-6">
                  Link yang kamu cari tidak tersedia
                </p>
                <Button
                  onClick={() => navigate("/dashboard")}
                  className="bg-gradient-to-r from-[#9043E5] to-[#7B35E6]"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Kembali ke Dashboard
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  const shortUrl = url.custom_url || url.short_url;
  const fullShortUrl = `https://short.ly/${shortUrl}`;

  return (
    <div className="min-h-screen pb-16">
      <div className="container mx-auto px-4 pt-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate("/dashboard")}
              variant="outline"
              size="icon"
              className="border-white/10 hover:bg-white/5"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#9043E5] to-[#7B35E6] bg-clip-text text-transparent">
                Analytics
              </h1>
              <p className="text-gray-400 mt-1">
                Statistik detail untuk link kamu
              </p>
            </div>
          </div>

          {/* URL Info Card */}
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* QR Code */}
                <div className="w-40 h-40 bg-white/5 border-white/10 rounded-lg p-2 flex items-center justify-center flex-shrink-0">
                  {url.qr ? (
                    <img src={url.qr} alt="QR Code" className="w-full h-full" />
                  ) : (
                    <div className="text-gray-500">No QR</div>
                  )}
                </div>

                {/* URL Details */}
                <div className="flex-1 space-y-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      {url.title || "Untitled Link"}
                    </h2>
                    <a
                      href={url.original_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#9043E5] text-sm flex items-center gap-1 transition-colors"
                    >
                      <span className="truncate max-w-[600px]">
                        {url.original_url}
                      </span>
                      <ExternalLink className="h-3 w-3 flex-shrink-0" />
                    </a>
                  </div>

                  {/* Short URL with Copy */}
                  <div className="flex items-center gap-2 bg-[#9043E5]/10 rounded-lg px-4 py-3 border border-[#9043E5]/20">
                    <code className="text-[#9043E5] font-mono text-lg flex-1 truncate">
                      {fullShortUrl}
                    </code>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleCopy(fullShortUrl, "short-url")}
                      className="hover:bg-[#9043E5]/20 flex-shrink-0"
                    >
                      {copiedId === "short-url" ? (
                        <span className="text-green-500 font-semibold">✓</span>
                      ) : (
                        <Copy className="h-4 w-4 text-[#9043E5]" />
                      )}
                    </Button>
                  </div>

                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Dibuat {formatDate(url.created_at)}</span>
                    </div>
                    <Button
                      onClick={() =>
                        handleDownload(url.qr || "", url.title || "")
                      }
                      size="sm"
                      variant="outline"
                      className="border-green-500/30 text-green-500 hover:bg-green-500/10"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download QR
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-[#9043E5]/10 to-[#7B35E6]/10 border-[#9043E5]/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardDescription className="text-gray-400">
                      Total Clicks
                    </CardDescription>
                    <CardTitle className="text-4xl font-bold text-white mt-2">
                      {clicks.length}
                    </CardTitle>
                  </div>
                  <div className="p-4 bg-[#9043E5]/20 rounded-full">
                    <MousePointerClick className="h-8 w-8 text-[#9043E5]" />
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-500/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardDescription className="text-gray-400">
                      Unique Devices
                    </CardDescription>
                    <CardTitle className="text-4xl font-bold text-white mt-2">
                      {deviceStats.length}
                    </CardTitle>
                  </div>
                  <div className="p-4 bg-cyan-500/20 rounded-full">
                    <Smartphone className="h-8 w-8 text-cyan-500" />
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card className="bg-gradient-to-br from-emerald-500/10 to-green-500/10 border-emerald-500/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardDescription className="text-gray-400">
                      Countries
                    </CardDescription>
                    <CardTitle className="text-4xl font-bold text-white mt-2">
                      {countryStats.length}
                    </CardTitle>
                  </div>
                  <div className="p-4 bg-emerald-500/20 rounded-full">
                    <Globe className="h-8 w-8 text-emerald-500" />
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>

          {/* Device Breakdown */}
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-[#9043E5]" />
                <CardTitle className="text-white">Device Breakdown</CardTitle>
              </div>
              <CardDescription>
                Distribusi clicks berdasarkan jenis device
              </CardDescription>
            </CardHeader>
            <CardContent>
              {deviceStats.length > 0 ? (
                <div className="space-y-4">
                  {deviceStats.map((stat) => (
                    <div key={stat.device} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          {stat.device === "mobile" ? (
                            <Smartphone className="h-4 w-4 text-[#9043E5]" />
                          ) : (
                            <Monitor className="h-4 w-4 text-cyan-500" />
                          )}
                          <span className="text-white capitalize">
                            {stat.device}
                          </span>
                        </div>
                        <span className="text-gray-400">
                          {stat.count} clicks ({stat.percentage.toFixed(1)}%)
                        </span>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            stat.device === "mobile"
                              ? "bg-gradient-to-r from-[#9043E5] to-[#7B35E6]"
                              : "bg-gradient-to-r from-cyan-500 to-blue-500"
                          }`}
                          style={{ width: `${stat.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center py-8">
                  Belum ada data device
                </p>
              )}
            </CardContent>
          </Card>

          {/* Location Breakdown */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Countries */}
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-emerald-500" />
                  <CardTitle className="text-white">Countries</CardTitle>
                </div>
                <CardDescription>
                  Top negara yang mengakses link kamu
                </CardDescription>
              </CardHeader>
              <CardContent>
                {countryStats.length > 0 ? (
                  <div className="space-y-4">
                    {countryStats.map((stat, index) => (
                      <div key={stat.location} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500 w-6">
                              #{index + 1}
                            </span>
                            <span className="text-white">{stat.location}</span>
                          </div>
                          <span className="text-gray-400">
                            {stat.count} ({stat.percentage.toFixed(1)}%)
                          </span>
                        </div>
                        <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-green-500 transition-all"
                            style={{ width: `${stat.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-center py-8">
                    Belum ada data negara
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Cities */}
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-orange-500" />
                  <CardTitle className="text-white">Top Cities</CardTitle>
                </div>
                <CardDescription>
                  10 kota teratas yang mengakses link kamu
                </CardDescription>
              </CardHeader>
              <CardContent>
                {cityStats.length > 0 ? (
                  <div className="space-y-4">
                    {cityStats.map((stat, index) => (
                      <div key={stat.location} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500 w-6">
                              #{index + 1}
                            </span>
                            <span className="text-white">{stat.location}</span>
                          </div>
                          <span className="text-gray-400">
                            {stat.count} ({stat.percentage.toFixed(1)}%)
                          </span>
                        </div>
                        <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-500 transition-all"
                            style={{ width: `${stat.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-center py-8">
                    Belum ada data kota
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Recent Clicks */}
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-[#9043E5]" />
                <CardTitle className="text-white">Recent Clicks</CardTitle>
              </div>
              <CardDescription>Aktivitas terbaru pada link ini</CardDescription>
            </CardHeader>
            <CardContent>
              {clicks.length > 0 ? (
                <div className="space-y-3">
                  {clicks.slice(0, 10).map((click) => (
                    <div
                      key={click.id}
                      className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-[#9043E5]/20 rounded-lg">
                          {click.device === "mobile" ? (
                            <Smartphone className="h-4 w-4 text-[#9043E5]" />
                          ) : (
                            <Monitor className="h-4 w-4 text-cyan-500" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 text-white text-sm">
                            <MapPin className="h-3 w-3 text-gray-400" />
                            <span>
                              {click.city || "Unknown"},{" "}
                              {click.country || "Unknown"}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-400 text-xs mt-1">
                            <Calendar className="h-3 w-3" />
                            <span>{formatDate(click.created_at)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 capitalize">
                        {click.device || "Unknown"}
                      </div>
                    </div>
                  ))}
                  {clicks.length > 10 && (
                    <p className="text-center text-gray-400 text-sm pt-2">
                      Menampilkan 10 dari {clicks.length} clicks
                    </p>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="inline-flex p-4 bg-[#9043E5]/20 rounded-full mb-4">
                    <MousePointerClick className="h-8 w-8 text-[#9043E5]" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Belum ada clicks
                  </h3>
                  <p className="text-gray-400">
                    Share link kamu untuk mulai tracking clicks
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Link;
