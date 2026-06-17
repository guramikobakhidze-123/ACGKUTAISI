import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function FinancialServices() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="bg-[#020654] text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#4F8FE2]/5 pattern-grid-lg opacity-10" />
        <div className="container relative z-10">
          <Link href="/" className="inline-flex items-center text-slate-400 hover:text-white mb-8 transition-colors" data-testid="link-back-services">
            <ArrowLeft className="h-4 w-4 mr-2" /> {t("backToServices")}
          </Link>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6" data-testid="text-financial-title">
            {t("financialServices")}
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl leading-relaxed mb-8" data-testid="text-financial-description">
            {t("financialDescription")}
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-[#4F8FE2] hover:bg-[#4F8FE2]/90 rounded-full px-10" data-testid="button-consultation-hero">
              {t("getConsultation")}
            </Button>
          </Link>
        </div>
      </div>

      <div className="container py-16">
        <div className="bg-[#020654] rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl font-serif font-bold mb-4">{t("readyToElevate")}</h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            {t("scheduleConsultation")}
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-[#4F8FE2] hover:bg-[#4F8FE2]/90 rounded-full px-10" data-testid="button-get-started">
              {t("getStartedToday")}
            </Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}