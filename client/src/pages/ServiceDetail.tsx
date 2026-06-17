import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useService } from "@/hooks/use-content";
import { Button } from "@/components/ui/button";
import { Link, useRoute } from "wouter";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ServiceDetail() {
  const [, params] = useRoute("/services/:slug");
  const slug = params?.slug || "";
  const { data: service, isLoading } = useService(slug);
  const { t, getText } = useLanguage();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 container py-24 animate-pulse">
          <div className="h-12 w-1/3 bg-slate-200 rounded mb-8" />
          <div className="h-6 w-2/3 bg-slate-100 rounded mb-4" />
          <div className="h-6 w-1/2 bg-slate-100 rounded" />
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
          <h2 className="text-2xl font-bold mb-4 text-[#020654]">{t("serviceNotFound")}</h2>
          <Link href="/services"><Button className="bg-[#020654]">{t("backToServices")}</Button></Link>
        </div>
        <Footer />
      </div>
    );
  }

  const serviceTitle = getText(service.title);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="bg-[#020654] text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#4F8FE2]/5 pattern-grid-lg opacity-10" />
        <div className="container relative z-10">
          <Link href="/services" className="inline-flex items-center text-slate-400 hover:text-white mb-8 transition-colors" data-testid="link-back-services">
            <ArrowLeft className="h-4 w-4 mr-2" /> {t("backToServices")}
          </Link>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6" data-testid="text-service-title">{serviceTitle}</h1>
          <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
            {getText(service.description)}
          </p>
        </div>
      </div>

      <div className="container py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <div className="prose prose-lg prose-slate max-w-none">
            <p className="text-lg leading-relaxed text-slate-600 mb-6">
              {getText(service.fullContent)}
            </p>
            
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-[#A1C9F5]/20 p-8 rounded-2xl border border-[#4F8FE2]/20">
            <h3 className="text-xl font-serif font-bold mb-4 text-[#020654]">{t("getConsultation")}</h3>
            <p className="text-slate-500 mb-6 text-sm">
              {t("scheduleConsultation")}
            </p>
            <Link href="/contact">
              <Button className="w-full bg-[#020654] hover:bg-[#020654]/90" size="lg" data-testid="button-request-consultation">{t("getConsultation")}</Button>
            </Link>
          </div>

          <div className="bg-[#020654] p-8 rounded-2xl text-white">
            <h3 className="text-xl font-serif font-bold mb-4">{t("clientSuccess")}</h3>
            <p className="text-[#A1C9F5] italic mb-4">
              "{t("integrityQuote")}"
            </p>
            <p className="text-sm font-bold">— CFO, Tech Enterprises Inc.</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
