import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Link2,
  Sparkles,
  Zap,
  Shield,
  BarChart3,
  Globe,
  Smartphone,
  TrendingUp,
  Users,
  MousePointerClick,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const [url, setUrl] = useState("");

  const navigate = useNavigate();

  const handleShorten = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (url) {
      navigate(`/auth?createNew=${url}`);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section - Whop Style */}
      <section className="container mx-auto px-4 pt-32 pb-24">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          {/* Main Headline - Bigger & Bolder */}
          <div className="space-y-6">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-[#9043E5] to-[#7B35E6] bg-clip-text text-transparent">
                Bikin Link Pendek,
              </span>
              <br />
              <span className="text-white">Hasil Maksimal.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Link shortener modern buat kamu yang butuh solusi cepat, simpel,
              dan powerful. Gratis selamanya.
            </p>
          </div>

          {/* URL Shortener Input - Cleaner */}
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleShorten} className="flex gap-3">
              <Input
                type="url"
                placeholder="Paste URL panjang kamu di sini..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="h-14 text-lg bg-white/10 border-white/20 text-white placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-[#9043E5]"
                required
              />
              <Button
                type="submit"
                size="lg"
                className="h-14 bg-gradient-to-r from-[#9043E5] to-[#7B35E6] hover:from-[#7B35E6] hover:to-[#9043E5] px-10 text-lg font-semibold transition-all"
              >
                Ringkas Sekarang
              </Button>
            </form>
            <p className="text-sm text-gray-500 mt-4">
              Gratis • Tanpa daftar • Unlimited links
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section - Whop Style */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#9043E5] to-[#7B35E6] bg-clip-text text-transparent">
                100
              </div>
              <p className="text-gray-400 text-lg">Links Shortened</p>
            </div>
            <div className="space-y-2">
              <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#9043E5] to-[#7B35E6] bg-clip-text text-transparent">
                10
              </div>
              <p className="text-gray-400 text-lg">Active Users</p>
            </div>
            <div className="space-y-2">
              <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#9043E5] to-[#7B35E6] bg-clip-text text-transparent">
                99.9%
              </div>
              <p className="text-gray-400 text-lg">Uptime</p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section - Whop Style */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white">
            Perfect untuk siapa aja
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all group">
              <div className="mb-4">
                <Users className="h-10 w-10 text-[#9043E5] group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Social Media
              </h3>
              <p className="text-gray-400">
                Bikin link Instagram, Twitter, TikTok jadi lebih clean dan
                professional
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all group">
              <div className="mb-4">
                <TrendingUp className="h-10 w-10 text-[#9043E5] group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Marketing</h3>
              <p className="text-gray-400">
                Track campaign performance dengan link yang gampang diingat
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all group">
              <div className="mb-4">
                <Globe className="h-10 w-10 text-[#9043E5] group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Business</h3>
              <p className="text-gray-400">
                Share link ke client atau tim dengan format yang rapih
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all group">
              <div className="mb-4">
                <Smartphone className="h-10 w-10 text-[#9043E5] group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Personal</h3>
              <p className="text-gray-400">
                Bikin portfolio, resume, atau bio link jadi lebih menarik
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Whop Style */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Semua tools yang kamu butuhin
            </h2>
            <p className="text-xl text-gray-400">Dalam satu platform</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Feature Card 1 */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-3xl p-10 hover:border-[#9043E5] transition-all">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-[#9043E5]/20 rounded-2xl">
                  <Zap className="h-8 w-8 text-[#9043E5]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Instant Shortening
                  </h3>
                  <p className="text-gray-400">
                    Ringkas URL dalam hitungan detik. Real-time processing tanpa
                    delay.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature Card 2 */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-3xl p-10 hover:border-[#9043E5] transition-all">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-[#9043E5]/20 rounded-2xl">
                  <BarChart3 className="h-8 w-8 text-[#9043E5]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Analytics Dashboard
                  </h3>
                  <p className="text-gray-400">
                    Track clicks, visitors, dan geographic data dari link kamu.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature Card 3 */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-3xl p-10 hover:border-[#9043E5] transition-all">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-[#9043E5]/20 rounded-2xl">
                  <Link2 className="h-8 w-8 text-[#9043E5]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Custom Links
                  </h3>
                  <p className="text-gray-400">
                    Bikin branded short link dengan custom alias sesuai
                    keinginan.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature Card 4 */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-3xl p-10 hover:border-[#9043E5] transition-all">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-[#9043E5]/20 rounded-2xl">
                  <Shield className="h-8 w-8 text-[#9043E5]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Secure & Reliable
                  </h3>
                  <p className="text-gray-400">
                    SSL encrypted dengan 99.9% uptime guarantee. Link kamu aman.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature Card 5 */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-3xl p-10 hover:border-[#9043E5] transition-all">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-[#9043E5]/20 rounded-2xl">
                  <MousePointerClick className="h-8 w-8 text-[#9043E5]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    QR Code Generator
                  </h3>
                  <p className="text-gray-400">
                    Generate QR code otomatis untuk setiap short link yang kamu
                    buat.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature Card 6 */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-3xl p-10 hover:border-[#9043E5] transition-all">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-[#9043E5]/20 rounded-2xl">
                  <Sparkles className="h-8 w-8 text-[#9043E5]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Easy Management
                  </h3>
                  <p className="text-gray-400">
                    Dashboard intuitif buat manage semua link kamu dalam satu
                    tempat.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section - Whop Style */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Pricing
            </h2>
            <p className="text-xl text-gray-400">
              Simple, transparent, dan fair
            </p>
          </div>

          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border-2 border-[#9043E5] rounded-3xl p-12 text-center">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">
                Free Forever
              </h3>
              <div className="text-6xl font-bold text-white mb-2">
                <span className="bg-gradient-to-r from-[#9043E5] to-[#7B35E6] bg-clip-text text-transparent">
                  $0
                </span>
              </div>
              <p className="text-gray-400 text-lg">per bulan</p>
            </div>

            <div className="space-y-4 mb-8 text-left max-w-md mx-auto">
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-[#9043E5] flex items-center justify-center flex-shrink-0">
                  <svg
                    className="h-4 w-4 text-white"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span className="text-white text-lg">
                  Unlimited short links
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-[#9043E5] flex items-center justify-center flex-shrink-0">
                  <svg
                    className="h-4 w-4 text-white"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span className="text-white text-lg">Custom branded links</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-[#9043E5] flex items-center justify-center flex-shrink-0">
                  <svg
                    className="h-4 w-4 text-white"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span className="text-white text-lg">
                  Advanced analytics & tracking
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-[#9043E5] flex items-center justify-center flex-shrink-0">
                  <svg
                    className="h-4 w-4 text-white"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span className="text-white text-lg">QR code generation</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-[#9043E5] flex items-center justify-center flex-shrink-0">
                  <svg
                    className="h-4 w-4 text-white"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span className="text-white text-lg">Easy link management</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-[#9043E5] flex items-center justify-center flex-shrink-0">
                  <svg
                    className="h-4 w-4 text-white"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span className="text-white text-lg">No expiration date</span>
              </div>
            </div>

            <Button
              size="lg"
              className="bg-gradient-to-r from-[#9043E5] to-[#7B35E6] hover:from-[#7B35E6] hover:to-[#9043E5] text-white text-lg px-12 py-6 font-semibold"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Mulai Gratis Sekarang
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section - Whop Style */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white">
            Frequently asked questions
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem
              value="item-1"
              className="bg-white/5 backdrop-blur-sm rounded-2xl px-8 py-2 border border-white/10"
            >
              <AccordionTrigger className="text-xl font-bold hover:no-underline text-white py-6">
                Apa itu Shortly?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 text-lg pb-6">
                Shortly adalah link shortener modern yang bikin URL panjang jadi
                lebih pendek dan gampang dibaca. Cocok banget buat dibagikan di
                social media, email, atau platform apapun yang butuh link yang
                ringkas dan professional.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-2"
              className="bg-white/5 backdrop-blur-sm rounded-2xl px-8 py-2 border border-white/10"
            >
              <AccordionTrigger className="text-xl font-bold hover:no-underline text-white py-6">
                Apakah benar-benar gratis?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 text-lg pb-6">
                100% gratis! Kamu bisa ringkas URL sebanyak yang kamu mau tanpa
                bayar sepeser pun. Semua fitur premium tersedia untuk semua
                user. No hidden fees, no credit card required.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-3"
              className="bg-white/5 backdrop-blur-sm rounded-2xl px-8 py-2 border border-white/10"
            >
              <AccordionTrigger className="text-xl font-bold hover:no-underline text-white py-6">
                Apakah link yang diringkas aman?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 text-lg pb-6">
                Absolutely! Semua link yang diringkas tetap mengarah ke URL asli
                kamu dan dijaga keamanannya dengan SSL encryption. Kita nggak
                mengubah, menyimpan, atau mengakses data sensitif apapun dari
                link kamu.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-4"
              className="bg-white/5 backdrop-blur-sm rounded-2xl px-8 py-2 border border-white/10"
            >
              <AccordionTrigger className="text-xl font-bold hover:no-underline text-white py-6">
                Berapa lama link bertahan?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 text-lg pb-6">
                Link yang udah kamu buat akan bertahan selamanya! Nggak ada
                expired date atau limit waktu. Share dengan confidence karena
                link kamu akan tetap aktif selama-lamanya.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-5"
              className="bg-white/5 backdrop-blur-sm rounded-2xl px-8 py-2 border border-white/10"
            >
              <AccordionTrigger className="text-xl font-bold hover:no-underline text-white py-6">
                Bisa track berapa banyak yang klik link saya?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 text-lg pb-6">
                Yes! Kamu bisa track semua metrics penting dari link kamu:
                jumlah clicks, unique visitors, geographic location, device
                type, dan masih banyak lagi. Semua data tersedia real-time di
                dashboard kamu.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-6"
              className="bg-white/5 backdrop-blur-sm rounded-2xl px-8 py-2 border border-white/10"
            >
              <AccordionTrigger className="text-xl font-bold hover:no-underline text-white py-6">
                Bagaimana cara bikin custom link?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 text-lg pb-6">
                Gampang banget! Setelah paste URL kamu, tinggal tambahkan custom
                alias yang kamu mau. Misalnya: shortly.com/promo-gede atau
                shortly.com/portfolio-gue. Bikin brand kamu lebih recognizable!
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA Section - Whop Style */}
      <section className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Start shortening with Shortly.
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            Join ribuan users yang udah percaya Shortly buat manage link mereka.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-[#9043E5] to-[#7B35E6] hover:from-[#7B35E6] hover:to-[#9043E5] text-white text-lg px-12 py-6 font-semibold"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Get Started
          </Button>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
