import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import ServiceDetail from "@/pages/ServiceDetail";
import Team from "@/pages/Team";
import Insights from "@/pages/Insights";
import Contact from "@/pages/Contact";
import Consulting from "@/pages/Consulting";
import AuditAssurance from "@/pages/AuditAssurance";
import FinancialServices from "@/pages/FinancialServices";
import BlockchainWeb3 from "@/pages/BlockchainWeb3";
import About from "@/pages/About";
import TeamMember from "@/pages/TeamMember";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/services" component={Services} />
      <Route path="/services/audit-assurance" component={AuditAssurance} />
      <Route path="/services/financial-services" component={FinancialServices} />
      <Route path="/services/consulting" component={Consulting} />
      <Route path="/services/blockchain-web3" component={BlockchainWeb3} />
      <Route path="/services/:slug" component={ServiceDetail} />
      <Route path="/team" component={Team} />
      <Route path="/team/:id" component={TeamMember} />
      <Route path="/insights" component={Insights} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
