import { Link } from "wouter";
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Banknote } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-[#020654] text-slate-100 py-16">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-12">
        
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <img 
              src="/assets/Integra_International_Primary_White_1769239697208.jpg" 
              alt="Integra International" 
              className="h-10 w-auto bg-white rounded px-2 py-1"
            />
            <div className="border-l border-slate-500 pl-3">
              <span className="text-sm font-semibold text-white">ACG</span>
              <span className="block text-xs text-slate-400">ქუთაისის ფილიალი</span>
            </div>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            {t("brandDescription")}
          </p>
          <a 
            href="https://nbg.gov.ge/monetary-policy/currency" 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm text-[#4F8FE2] hover:text-white transition-colors mt-2"
            data-testid="link-nbg-rates"
          >
            <Banknote className="h-4 w-4" />
            ეროვნული ბანკის გაცვლითი კურსები
          </a>
          <div className="flex gap-4 mt-2">
            <a href="#" className="p-2 rounded-full bg-[#4F8FE2]/20 hover:bg-[#4F8FE2] transition-colors" data-testid="link-social-linkedin">
              <Linkedin className="h-4 w-4" />
            </a>
            <a href="#" className="p-2 rounded-full bg-[#4F8FE2]/20 hover:bg-[#4F8FE2] transition-colors" data-testid="link-social-twitter">
              <Twitter className="h-4 w-4" />
            </a>
            <a href="#" className="p-2 rounded-full bg-[#4F8FE2]/20 hover:bg-[#4F8FE2] transition-colors" data-testid="link-social-facebook">
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-serif font-semibold text-lg mb-4 text-white">{t("company")}</h3>
          <ul className="space-y-3 text-sm text-slate-400">
            <li><Link href="/" className="hover:text-[#4F8FE2] transition-colors">{t("home")}</Link></li>
            <li><Link href="/services" className="hover:text-[#4F8FE2] transition-colors">{t("services")}</Link></li>
            <li><Link href="/team" className="hover:text-[#4F8FE2] transition-colors">{t("team")}</Link></li>
            <li><Link href="/insights" className="hover:text-[#4F8FE2] transition-colors">{t("insights")}</Link></li>
            <li><Link href="/contact" className="hover:text-[#4F8FE2] transition-colors">{t("contact")}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-serif font-semibold text-lg mb-4 text-white">{t("servicesFooter")}</h3>
          <ul className="space-y-3 text-sm text-slate-400">
            <li><span className="cursor-pointer hover:text-[#4F8FE2] transition-colors">{t("auditAssurance")}</span></li>
            <li><span className="cursor-pointer hover:text-[#4F8FE2] transition-colors">{t("taxConsultancy")}</span></li>
            <li><span className="cursor-pointer hover:text-[#4F8FE2] transition-colors">{t("financialAdvisory")}</span></li>
            <li><span className="cursor-pointer hover:text-[#4F8FE2] transition-colors">{t("riskManagement")}</span></li>
            <li><span className="cursor-pointer hover:text-[#4F8FE2] transition-colors">{t("corporateFinance")}</span></li>
          </ul>
        </div>

        <div>
          <h3 className="font-serif font-semibold text-lg mb-4 text-white">{t("contactFooter")}</h3>
          <ul className="space-y-4 text-sm text-slate-400">
            <li className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-[#4F8FE2] shrink-0 mt-0.5" />
              <span>
                <span className="block text-white font-medium mb-0.5">{t("headquarters")}</span>
                {t("officeAddress")}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-[#4F8FE2] shrink-0 mt-0.5" />
              <span>
                +995 597 69 69 54<br />
                +995 555 11 99 65<br />
                +995 577 12 34 01
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-[#4F8FE2] shrink-0 mt-0.5" />
              <span>
                murmankobaxidze@gmail.com<br />
                temuri.gvetadze@gmail.com<br />
                guramikobakhidze@gmail.com
              </span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="container mt-16 pt-8 border-t border-slate-700 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
        <p>&copy; {new Date().getFullYear()} ACG — Audit & Consulting Group. {t("allRightsReserved")}.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-slate-300">{t("privacyPolicy")}</a>
          <a href="#" className="hover:text-slate-300">{t("termsOfService")}</a>
        </div>
      </div>
    </footer>
  );
}
