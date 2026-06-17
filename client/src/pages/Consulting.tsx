import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Users, Target, TrendingUp, Briefcase } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Consulting() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Briefcase,
      titleKey: "businessStructure",
      descKey: "businessStructureDesc",
    },
    {
      icon: TrendingUp,
      titleKey: "growthStrategies",
      descKey: "growthStrategiesDesc",
    },
    {
      icon: Target,
      titleKey: "operationalEfficiency",
      descKey: "operationalEfficiencyDesc",
    },
    {
      icon: Users,
      titleKey: "multidisciplinaryTeam",
      descKey: "multidisciplinaryTeamDesc",
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="bg-[#020654] text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#4F8FE2]/5 pattern-grid-lg opacity-10" />
        <div className="container relative z-10">
          <Link href="/services" className="inline-flex items-center text-slate-400 hover:text-white mb-8 transition-colors" data-testid="link-back-services">
            <ArrowLeft className="h-4 w-4 mr-2" /> {t("backToServices")}
          </Link>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6" data-testid="text-consulting-title">
            {t("consultingServices")}
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl leading-relaxed mb-8">
            {t("consultingDescription")}
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-[#4F8FE2] hover:bg-[#4F8FE2]/90 rounded-full px-10" data-testid="button-consultation-hero">
              {t("getConsultation")}
            </Button>
          </Link>
        </div>
      </div>

      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-lg transition-shadow"
              data-testid={`card-feature-${index}`}
            >
              <div className="w-14 h-14 bg-[#A1C9F5]/30 rounded-xl flex items-center justify-center mb-6">
                <feature.icon className="h-7 w-7 text-[#020654]" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#020654] mb-3">
                {t(feature.titleKey as keyof typeof t)}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {t(feature.descKey as keyof typeof t)}
              </p>
            </div>
          ))}
        </div>

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
