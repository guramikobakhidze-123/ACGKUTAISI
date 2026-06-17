import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  const links = [
    { href: "/", label: t("home") },
    { href: "/about", label: t("aboutUs") },
    { href: "/team", label: t("team") },
    { href: "/insights", label: t("insights") },
  ];

  const serviceItems = [
    { href: "/services/audit-assurance", label: t("auditAssurance") },
    { href: "/services/financial-services", label: t("financialServices") },
    { href: "/services/loan-purpose-verification", label: t("loanPurposeVerification") },
    { href: "/services/consulting", label: t("consultingServices") },
    { href: "/services/legal-services", label: t("legalServices") },
    { href: "/services/property-valuation", label: t("propertyValuation") },
    { href: "/services/consulting-services", label: t("consulting") },
    { href: "/services/tax-disputes-consulting", label: t("taxDisputesConsulting") },
    { href: "/services/blockchain-web3", label: t("blockchainWeb3") },
    { href: "/services/accounting-legislation", label: t("accountingLegislation") },
  ];

  const isActive = (path: string) => location === path;
  const isServicesActive = location.startsWith("/services");

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-3">
            <a href="https://integra-international.net/" target="_blank" rel="noopener noreferrer" data-testid="link-logo-integra">
              <img 
                src="/assets/Integra_International_Primary_White_1769239697208.jpg" 
                alt="Integra International" 
                className="h-10 w-auto"
              />
            </a>
            <Link href="/" className="hidden sm:block border-l border-slate-300 pl-3" data-testid="link-logo-acg">
              <span className="text-sm font-semibold text-[#020654]">ACG</span>
              <span className="block text-xs text-muted-foreground">ქუთაისის ფილიალი</span>
            </Link>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {links.slice(0, 1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary relative py-1",
                  isActive(link.href)
                    ? "text-primary font-semibold"
                    : "text-muted-foreground"
                )}
                data-testid={`link-nav-${link.href.replace("/", "") || "home"}`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full animate-in fade-in zoom-in duration-200" />
                )}
              </Link>
            ))}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary relative py-1 flex items-center gap-1 outline-none",
                    isServicesActive
                      ? "text-primary font-semibold"
                      : "text-muted-foreground"
                  )}
                  data-testid="dropdown-services"
                >
                  {t("services")}
                  <ChevronDown className="h-4 w-4" />
                  {isServicesActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full animate-in fade-in zoom-in duration-200" />
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/services" className="w-full cursor-pointer" data-testid="link-all-services">
                    {t("viewAllServices")}
                  </Link>
                </DropdownMenuItem>
                {serviceItems.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href} className="w-full cursor-pointer" data-testid={`link-service-${item.href.split('/').pop()}`}>
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {links.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary relative py-1",
                  isActive(link.href)
                    ? "text-primary font-semibold"
                    : "text-muted-foreground"
                )}
                data-testid={`link-nav-${link.href.replace("/", "") || "home"}`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full animate-in fade-in zoom-in duration-200" />
                )}
              </Link>
            ))}
          </div>
          <LanguageSwitcher />
          <Link href="/contact" className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground" data-testid="link-nav-contacts">
            {t("contacts")}
          </Link>
          <Link href="/contact">
            <Button size="lg" className="rounded-full px-8 shadow-lg shadow-primary/20 hover:shadow-primary/30" data-testid="button-cta-consultation">
              {t("getConsultation")}
            </Button>
          </Link>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <LanguageSwitcher />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" data-testid="button-mobile-menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-6 mt-10">
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-lg font-medium transition-colors hover:text-primary",
                    isActive("/")
                      ? "text-primary font-semibold"
                      : "text-muted-foreground"
                  )}
                >
                  {t("home")}
                </Link>
                
                <div className="flex flex-col gap-2">
                  <span className={cn(
                    "text-lg font-medium",
                    isServicesActive ? "text-primary font-semibold" : "text-muted-foreground"
                  )}>
                    {t("services")}
                  </span>
                  <div className="pl-4 flex flex-col gap-2 border-l-2 border-muted">
                    <Link
                      href="/services"
                      onClick={() => setIsOpen(false)}
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      {t("viewAllServices")}
                    </Link>
                    {serviceItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="text-sm text-muted-foreground hover:text-primary"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>

                <Link
                  href="/team"
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-lg font-medium transition-colors hover:text-primary",
                    isActive("/team")
                      ? "text-primary font-semibold"
                      : "text-muted-foreground"
                  )}
                >
                  {t("team")}
                </Link>
                <Link
                  href="/insights"
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-lg font-medium transition-colors hover:text-primary",
                    isActive("/insights")
                      ? "text-primary font-semibold"
                      : "text-muted-foreground"
                  )}
                >
                  {t("insights")}
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-lg font-medium transition-colors hover:text-primary",
                    isActive("/contact")
                      ? "text-primary font-semibold"
                      : "text-muted-foreground"
                  )}
                >
                  {t("contacts")}
                </Link>
                <Link href="/contact" onClick={() => setIsOpen(false)}>
                  <Button className="w-full mt-4" size="lg">{t("getConsultation")}</Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
