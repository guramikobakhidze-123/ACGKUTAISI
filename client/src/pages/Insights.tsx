import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { usePosts } from "@/hooks/use-content";
import { Link } from "wouter";
import { format } from "date-fns";
import { ArrowRight, Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Insights() {
  const { data: posts, isLoading } = usePosts();
  const { t, getText } = useLanguage();

  return (
    <div className="min-h-screen bg-[#A1C9F5]/10 flex flex-col">
      <Navbar />

      <div className="bg-white border-b py-24">
        <div className="container max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-[#020654]" data-testid="text-insights-title">{t("insightsAndNews")}</h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            {t("insightsDescription")}
          </p>
        </div>
      </div>

      <div className="container py-24">
        {isLoading ? (
          <div className="space-y-8">
            {[1, 2, 3].map(i => <div key={i} className="h-64 bg-slate-200 rounded-xl animate-pulse" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts?.map((post) => (
              <Link key={post.id} href={`/insights/${post.slug}`}>
                <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 h-full flex flex-col cursor-pointer group" data-testid={`card-post-${post.id}`}>
                  <div className="h-48 overflow-hidden bg-slate-200 relative">
                    {post.coverImageUrl && (
                      <img 
                        src={post.coverImageUrl} 
                        alt={getText(post.title)}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-4">
                      <Calendar className="h-3.5 w-3.5" />
                      {post.publishedAt ? format(new Date(post.publishedAt), 'MMMM d, yyyy') : t("recently")}
                    </div>
                    <h2 className="text-xl font-serif font-bold text-[#020654] mb-3 group-hover:text-[#4F8FE2] transition-colors">
                      {getText(post.title)}
                    </h2>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1">
                      {getText(post.summary)}
                    </p>
                    <div className="flex items-center text-[#4F8FE2] font-medium text-sm group-hover:translate-x-2 transition-transform">
                      {t("readArticle")} <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
