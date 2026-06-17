import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function BlockchainWeb3() {
  const { t } = useLanguage();

  const sections = [
    {
      title: t("smartContractTitle"),
      content: t("smartContractDesc"),
    },
    {
      title: t("tokenizationTitle"),
      content: t("tokenizationDesc"),
    },
    {
      title: t("defiTitle"),
      content: t("defiDesc"),
    },
    {
      title: t("enterpriseBlockchainTitle"),
      content: t("enterpriseBlockchainDesc"),
    },
    {
      title: t("web3AppTitle"),
      content: t("web3AppDesc"),
    },
  ];

  return (
    <div className="min-h-screen bg-[#020654] flex flex-col">
      <Navbar />

      <div className="text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#4F8FE2]/5 pattern-grid-lg opacity-10" />
        <div className="container relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6" data-testid="text-blockchain-title">
            {t("blockchainWeb3")}
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed" data-testid="text-blockchain-subtitle">
            {t("blockchainSubtitle")}
          </p>
        </div>
      </div>

      <div className="container pb-20">
        <div className="bg-[#0a1045]/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 text-white border border-[#4F8FE2]/10">
          <p className="text-slate-300 leading-relaxed text-base mb-10" data-testid="text-blockchain-intro">
            {t("blockchainIntro")}
          </p>

          <div className="space-y-10">
            {sections.map((section, index) => (
              <div key={index}>
                <h2 className="text-xl md:text-2xl font-serif font-bold text-[#6db3f2] mb-4" data-testid={`text-blockchain-section-${index}`}>
                  {section.title}
                </h2>
                <p className="text-slate-300 leading-relaxed text-base">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
