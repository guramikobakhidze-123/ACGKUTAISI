import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useServices } from "@/hooks/use-content";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Briefcase, Calculator, TrendingUp, Search, ShieldCheck, Users, FileText, Scale, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Services() {
  const { data: services, isLoading } = useServices();
  const { t, getText } = useLanguage();

  const getIcon = (iconName: string) => {
    const icons: Record<string, any> = {
      Briefcase: Briefcase,
      Calculator: Calculator,
      TrendingUp: TrendingUp,
      Search: Search,
      ShieldCheck: ShieldCheck,
      Users: Users,
      FileText: FileText,
      Scale: Scale,
      Globe: Globe,
    };
    const Icon = icons[iconName] || Briefcase;
    return <Icon className="h-8 w-8 text-[#4F8FE2]" />;
  };

  return (
    <div className="min-h-screen bg-[#A1C9F5]/10 flex flex-col">
      <Navbar />

      <div className="bg-[#020654] text-white py-24">
        <div className="container text-center max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6" data-testid="text-services-title">{t("ourServices")}</h1>
          <p className="text-xl text-slate-300 leading-relaxed">
            {t("servicesDescription")}
          </p>
        </div>
      </div>

      <div className="container py-24 -mt-12">
        {isLoading ? (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {[1, 2, 3, 4, 5, 6].map(i => (
               <div key={i} className="h-96 bg-white rounded-2xl shadow-sm animate-pulse" />
             ))}
           </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services?.map((service) => (
              <div key={service.id} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col" data-testid={`card-service-${service.id}`}>
                <div className="h-16 w-16 bg-[#4F8FE2]/10 rounded-2xl flex items-center justify-center mb-8">
                  {getIcon(service.icon)}
                </div>
                <h3 className="text-2xl font-serif font-bold mb-4 text-[#020654]">{getText(service.title)}</h3>
                <p className="text-slate-500 leading-relaxed mb-8 flex-grow">{getText(service.description)}</p>
                <div className="pt-8 border-t border-slate-100">
                  <Link href={`/services/${service.slug}`}>
                    <Button variant="outline" className="w-full justify-between group border-[#020654] text-[#020654] hover:bg-[#020654] hover:text-white" data-testid={`button-view-service-${service.id}`}>
                      {t("viewDetails")} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
