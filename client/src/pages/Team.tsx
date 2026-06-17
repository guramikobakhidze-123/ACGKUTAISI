import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useTeam } from "@/hooks/use-content";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "wouter";

export default function Team() {
  const { data: team, isLoading } = useTeam();
  const { t, getText } = useLanguage();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="bg-[#A1C9F5]/20 py-24">
        <div className="container text-center max-w-3xl">
          <h2 className="text-sm font-bold text-[#4F8FE2] tracking-widest uppercase mb-3">{t("ourPeople")}</h2>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-[#020654]" data-testid="text-team-title">{t("meetThePartners")}</h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            {t("teamDescription")}
          </p>
        </div>
      </div>

      <div className="container py-24">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[1, 2, 3].map(i => <div key={i} className="h-96 bg-slate-100 rounded-xl animate-pulse" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[...(team ?? [])].sort((a, b) => a.id - b.id).map((member) => {
              if (member.linkedinUrl) {
                return (
                  <div key={member.id} className="text-center" data-testid={`card-team-${member.id}`}>
                    <div className="relative overflow-hidden rounded-2xl mb-6 shadow-md aspect-[3/4] mx-auto max-w-xs">
                      <img
                        src={member.imageUrl}
                        alt={getText(member.name)}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-[#020654]">{getText(member.name)}</h3>
                    <p className="text-[#4F8FE2] font-medium mt-2 tracking-wider text-sm">{getText(member.role)}</p>
                    <a
                      href={member.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid={`btn-portfolio-${member.id}`}
                      className="inline-block mt-4 px-6 py-2 bg-[#020654] text-white text-sm font-semibold rounded-full hover:bg-[#4F8FE2] transition-colors"
                    >
                      {t("viewPortfolio")}
                    </a>
                  </div>
                );
              }

              return (
                <Link key={member.id} href={`/team/${member.id}`} data-testid={`card-team-${member.id}`}>
                  <div className="group cursor-pointer text-center">
                    <div className="relative overflow-hidden rounded-2xl mb-6 shadow-md aspect-[3/4] mx-auto max-w-xs">
                      <img
                        src={member.imageUrl}
                        alt={getText(member.name)}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#020654]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-[#020654] group-hover:text-[#4F8FE2] transition-colors">{getText(member.name)}</h3>
                    <p className="text-[#4F8FE2] font-medium mt-2 tracking-wider text-sm">{getText(member.role)}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
