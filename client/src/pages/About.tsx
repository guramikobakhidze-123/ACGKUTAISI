import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Award, Users } from "lucide-react";

export default function About() {
  const { t } = useLanguage();

  const stats = [
    { value: "100+", label: t("aboutStatClients") },
    { value: "40+", label: t("aboutStatProjects") },
    { value: "3", label: t("aboutStatOffices") },
    { value: "855+", label: t("aboutStatConsultations") },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="bg-[#A1C9F5]/20 py-24">
        <div className="container text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-[#020654]" data-testid="text-about-title">
            {t("aboutTitle")}
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed" data-testid="text-about-subtitle">
            {t("aboutSubtitle")}
          </p>
        </div>
      </div>

      <div className="container py-16">
        <div className="bg-white rounded-2xl p-8 md:p-12 border border-slate-100 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6 text-[#020654]" data-testid="text-who-we-are">
                {t("aboutWhoWeAre")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-8" data-testid="text-who-we-are-desc">
                {t("aboutWhoWeAreDesc")}
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <div className="bg-slate-50 rounded-lg px-6 py-3 border border-slate-200">
                  <img 
                    src="/assets/Integra_International_Primary_White_1769239697208.jpg" 
                    alt="Integra International" 
                    className="h-10 w-auto"
                  />
                </div>
                <div className="bg-slate-50 rounded-lg px-6 py-3 border border-slate-200 flex items-center">
                  <span className="text-sm font-bold text-[#020654]">TPA Global</span>
                </div>
              </div>

              <p className="text-slate-600 leading-relaxed mb-8" data-testid="text-integra-desc">
                {t("aboutIntegraDesc")}
              </p>

              <h3 className="text-xl font-serif font-bold mb-4 text-[#4F8FE2]" data-testid="text-mission-title">
                {t("aboutMission")}
              </h3>
              <p className="text-slate-600 leading-relaxed" data-testid="text-mission-desc">
                {t("aboutMissionDesc")}
              </p>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop"
                  alt={t("aboutMeetingAlt")}
                  className="w-full h-64 object-cover rounded-2xl"
                />
              </div>
              <div className="bg-[#A1C9F5]/20 border border-[#4F8FE2]/20 rounded-2xl p-6 flex items-center gap-4">
                <span className="text-[#4F8FE2] text-2xl">→</span>
                <p className="text-[#020654] font-serif font-bold text-lg">{t("aboutJoinSuccess")}</p>
              </div>
              <div className="rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 p-6 flex items-center gap-4">
                <img 
                  src="/assets/Integra_International_Primary_White_1769239697208.jpg" 
                  alt="ACG Consulting" 
                  className="h-12 w-auto"
                />
                <div>
                  <span className="text-[#020654] font-bold text-lg">ACG</span>
                  <span className="block text-slate-500 text-sm">CONSULTING</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
            <div className="bg-[#A1C9F5]/20 border border-[#4F8FE2]/20 rounded-2xl p-6">
              <Award className="h-8 w-8 text-[#4F8FE2] mb-3" />
              <h4 className="text-[#020654] font-bold text-lg mb-2">{t("aboutExcellence")}</h4>
              <p className="text-slate-600 text-sm">{t("aboutExcellenceDesc")}</p>
            </div>
            <div className="bg-[#A1C9F5]/20 border border-[#4F8FE2]/20 rounded-2xl p-6">
              <Users className="h-8 w-8 text-[#4F8FE2] mb-3" />
              <h4 className="text-[#020654] font-bold text-lg mb-2">{t("aboutPartnership")}</h4>
              <p className="text-slate-600 text-sm">{t("aboutPartnershipDesc")}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-100 py-16">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <div key={i} className="space-y-2" data-testid={`about-stat-${i}`}>
                <p className="text-4xl md:text-5xl font-serif font-bold text-[#4F8FE2]">{stat.value}</p>
                <p className="text-sm text-slate-500 uppercase tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
