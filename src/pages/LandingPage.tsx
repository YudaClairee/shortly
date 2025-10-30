import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link2, Sparkles, Zap, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
// Copy, Check,

function LandingPage() {
  const [url, setUrl] = useState("");
  // const [shortUrl, setShortUrl] = useState("");
  // const [copied, setCopied] = useState(false);

  const navigate = useNavigate();

  const handleShorten = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Placeholder untuk shorten URL logic
    if (url) {
      // Simulasi - nanti bisa diganti dengan API call

      navigate(`/auth?createNew=${url}`);
    }
  };

  // const handleCopy = async () => {
  //   if (shortUrl) {
  //     await navigator.clipboard.writeText(shortUrl);
  //     setCopied(true);
  //     setTimeout(() => setCopied(false), 2000);
  //   }
  // };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Banner Image */}
          <div className="flex justify-center mb-8">
            <img
              src="/shortlybanner.png"
              alt="Shortly Banner"
              className="max-w-md w-full h-auto rounded-2xl shadow-2xl"
            />
          </div>

          {/* Headline */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#9043E5] to-[#7B35E6] bg-clip-text text-transparent">
              Ringkas URL Panjang Jadi Gampang Banget
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Bikin link kamu lebih simpel, gampang dibaca, dan mudah dibagikan.
              Cukup satu klik aja! ✨
            </p>
          </div>

          {/* URL Shortener Input */}
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="flex gap-2 p-2  rounded-2xl shadow-lg border border-gray-200">
              <form
                className="flex gap-2 w-full"
                onSubmit={handleShorten}
                action=""
              >
                <Input
                  type="url"
                  placeholder="Paste URL panjang kamu di sini..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="border-0 focus-visible:ring-0 text-lg"
                />
                <Button
                  type="submit"
                  size="lg"
                  className="bg-gradient-to-r from-[#9043E5] to-[#7B35E6] hover:from-[#9043E5] hover:to-[#7B35E6] px-8"
                >
                  <Link2 className="mr-2 h-5 w-5" />
                  Ringkas!
                </Button>
              </form>
            </div>

            {/* Result */}
            {/* {shortUrl && (
              <div className="p-4 bg-white rounded-xl shadow-md border border-gray-200 animate-in fade-in slide-in-from-bottom-3">
                <p className="text-sm text-gray-500 mb-2">
                  URL kamu yang sudah diringkas:
                </p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 text-lg font-mono text-[#9043E5] bg-[#9043E5] px-4 py-2 rounded-lg">
                    {shortUrl}
                  </code>
                  <Button
                    onClick={handleCopy}
                    variant="outline"
                    size="icon"
                    className="h-10 w-10"
                  >
                    {copied ? (
                      <Check className="h-5 w-5 text-green-600" />
                    ) : (
                      <Copy className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              </div>
            )} */}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            Kenapa Harus Pakai Shortly?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4 p-6 rounded-2xl hover:bg-white/10 hover:shadow-lg transition-all">
              <div className="inline-flex p-4 bg-cyan-500/20 rounded-full">
                <Zap className="h-8 w-8 text-[#9043E5]" />
              </div>
              <h3 className="text-xl font-semibold text-white">Super Cepat</h3>
              <p className="text-gray-300">
                Ringkas URL dalam hitungan detik. Nggak perlu nunggu lama!
              </p>
            </div>

            <div className="text-center space-y-4 p-6 rounded-2xl hover:bg-white/10 hover:shadow-lg transition-all">
              <div className="inline-flex p-4 bg-violet-500/20 rounded-full">
                <Sparkles className="h-8 w-8 text-[#9043E5]" />
              </div>
              <h3 className="text-xl font-semibold text-white">
                Simpel Banget
              </h3>
              <p className="text-gray-300">
                Interface gampang dipahami. Paste, klik, selesai!
              </p>
            </div>

            <div className="text-center space-y-4 p-6 rounded-2xl hover:bg-white/10 hover:shadow-lg transition-all">
              <div className="inline-flex p-4 bg-cyan-500/20 rounded-full">
                <Shield className="h-8 w-8 text-[#9043E5]" />
              </div>
              <h3 className="text-xl font-semibold text-white">
                Aman Terpercaya
              </h3>
              <p className="text-gray-300">
                Link kamu dijaga keamanannya dengan teknologi terkini.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            Pertanyaan yang Sering Ditanya
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem
              value="item-1"
              className="bg-white/10 backdrop-blur-sm rounded-xl px-6 border border-white/20 shadow-sm"
            >
              <AccordionTrigger className="text-xl font-semibold hover:no-underline text-white">
                Apa itu Shortly?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300 text-lg">
                Shortly adalah tools yang bikin link panjang jadi lebih pendek
                dan gampang dibaca. Cocok banget buat dibagikan di social media
                atau di mana aja yang butuh link yang ringkas.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-2"
              className="bg-white/10 backdrop-blur-sm rounded-xl px-6 border border-white/20 shadow-sm"
            >
              <AccordionTrigger className="text-xl font-semibold hover:no-underline text-white">
                Apakah gratis?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300 text-lg">
                Tentu aja! Kamu bisa ringkas URL sebanyak yang kamu mau tanpa
                bayar sepeser pun. Nikmatin fitur lengkapnya secara gratis.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-3"
              className="bg-white/10 backdrop-blur-sm rounded-xl px-6 border border-white/20 shadow-sm"
            >
              <AccordionTrigger className="text-xl font-semibold hover:no-underline text-white">
                Apakah link yang diringkas aman?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300 text-lg">
                Absolutely! Semua link yang diringkas tetap mengarah ke URL asli
                kamu dan dijaga keamanannya. Kita nggak mengubah atau menyimpan
                data sensitif apapun.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-4"
              className="bg-white/10 backdrop-blur-sm rounded-xl px-6 border border-white/20 shadow-sm"
            >
              <AccordionTrigger className="text-xl font-semibold hover:no-underline text-white">
                Berapa lama link bertahan?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300 text-lg">
                Link yang udah kamu buat akan bertahan selamanya! Nggak ada
                expired date, jadi tenang aja buat dibagikan kapan pun.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-5"
              className="bg-white/10 backdrop-blur-sm rounded-xl px-6 border border-white/20 shadow-sm"
            >
              <AccordionTrigger className="text-xl font-semibold hover:no-underline text-white">
                Bisa track berapa banyak yang klik link saya?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300 text-lg">
                Coming soon! Fitur analytics sedang dalam pengembangan. Nanti
                kamu bisa lihat berapa kali link kamu diklik dan dari mana aja
                traffic-nya datang.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-r from-[#9043E5] to-[#7B35E6] rounded-3xl p-12 text-white shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Yuk, Mulai Ringkas URL Kamu Sekarang!
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Gratis, cepat, dan gampang banget. Coba sekarang! 🚀
          </p>
          <Button
            size="lg"
            className="bg-white text-[#9043E5] hover:bg-gray-100 text-lg px-8 py-6"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Mulai Sekarang
          </Button>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
