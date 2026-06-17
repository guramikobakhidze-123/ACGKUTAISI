import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useTeam } from "@/hooks/use-content";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRoute, Link } from "wouter";
import { Mail, ArrowLeft } from "lucide-react";

export default function TeamMember() {
  const { data: team, isLoading } = useTeam();
  const { t, getText } = useLanguage();
  const [, params] = useRoute("/team/:id");
  const memberId = params?.id ? parseInt(params.id) : null;
  const member = team?.find((m) => m.id === memberId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="container py-24">
          <div className="h-96 bg-slate-100 rounded-xl animate-pulse" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!member) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="container py-24 text-center">
          <h1 className="text-3xl font-serif font-bold text-[#020654] mb-4">{t("notFound")}</h1>
          <Link href="/team" className="text-[#4F8FE2] hover:underline">{t("backToTeam")}</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="container py-16">
        <Link href="/team" className="inline-flex items-center gap-2 text-[#4F8FE2] hover:underline mb-8" data-testid="link-back-team">
          <ArrowLeft className="h-4 w-4" />
          {t("backToTeam")}
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="rounded-2xl overflow-hidden shadow-lg aspect-[3/4] max-w-md">
            <img
              src={member.imageUrl}
              alt={getText(member.name)}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h1 className="text-4xl font-serif font-bold text-[#020654] mb-2" data-testid="text-member-name">
              {getText(member.name)}
            </h1>
            <p className="text-[#4F8FE2] font-medium tracking-wider text-lg mb-6" data-testid="text-member-role">
              {getText(member.role)}
            </p>

            <div className="text-slate-600 leading-relaxed mb-8 space-y-1" data-testid="text-member-bio">
              {getText(member.bio).split("\n").map((line, i) => (
                <p key={i} className={line.startsWith("-") ? "pl-4" : line === "" ? "h-2" : "font-semibold text-[#020654] mt-4 first:mt-0"}>
                  {line.startsWith("-") ? (
                    <span className="text-slate-600 font-normal">{line}</span>
                  ) : line.includes(":") && !line.startsWith("-") ? (
                    <>
                      <span className="font-semibold text-[#020654]">{line.split(":")[0]}:</span>
                      <span className="font-normal text-slate-600">{line.substring(line.indexOf(":") + 1)}</span>
                    </>
                  ) : (
                    line
                  )}
                </p>
              ))}
            </div>

            {member.email && (
              <div className="flex items-center gap-3 mb-4">
                <Mail className="h-5 w-5 text-[#4F8FE2]" />
                <a href={`mailto:${member.email}`} className="text-[#020654] hover:text-[#4F8FE2] transition-colors" data-testid="link-member-email">
                  {member.email}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
