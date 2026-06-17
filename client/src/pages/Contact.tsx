import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitContact } from "@/hooks/use-content";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactRequestSchema } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Mail, Phone, Clock, Navigation } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Contact() {
  const { toast } = useToast();
  const mutation = useSubmitContact();
  const { t } = useLanguage();
  
  const form = useForm<z.infer<typeof insertContactRequestSchema>>({
    resolver: zodResolver(insertContactRequestSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
    },
  });

  const onSubmit = (data: z.infer<typeof insertContactRequestSchema>) => {
    mutation.mutate(data, {
      onSuccess: () => {
        toast({
          title: t("messageSent"),
          description: t("thankYouMessage"),
        });
        form.reset();
      },
      onError: (error) => {
        toast({
          title: t("error"),
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="bg-[#020654] text-white py-24">
        <div className="container text-center max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6" data-testid="text-contact-title">{t("contactUs")}</h1>
          <p className="text-xl text-slate-300 leading-relaxed">
            {t("contactDescription")}
          </p>
        </div>
      </div>

      <div className="container py-24 -mt-16 bg-white rounded-t-3xl shadow-xl border border-slate-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <div>
            <h2 className="text-2xl font-serif font-bold text-[#020654] mb-2">{t("sendMessage")}</h2>
            <p className="text-slate-500 mb-8">{t("formDescription")}</p>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="form-contact">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("fullName")}</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} className="h-12" data-testid="input-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("emailAddress")}</FormLabel>
                        <FormControl>
                          <Input placeholder="john@company.com" {...field} className="h-12" data-testid="input-email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("phoneOptional")}</FormLabel>
                        <FormControl>
                          <Input placeholder="+1 (555) 000-0000" {...field} value={field.value || ''} className="h-12" data-testid="input-phone" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("companyOptional")}</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Company Ltd." {...field} value={field.value || ''} className="h-12" data-testid="input-company" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("howCanWeHelp")}</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder={t("tellUsRequirements")} 
                          className="min-h-[150px] resize-none text-base" 
                          {...field}
                          data-testid="input-message"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full h-12 text-base font-semibold bg-[#020654] hover:bg-[#020654]/90"
                  disabled={mutation.isPending}
                  data-testid="button-submit-contact"
                >
                  {mutation.isPending ? t("sendingMessage") : t("sendMessage")}
                </Button>
              </form>
            </Form>
          </div>

          <div className="bg-[#A1C9F5]/20 p-10 rounded-2xl border border-[#4F8FE2]/20">
            <h3 className="text-xl font-serif font-bold text-[#020654] mb-8">{t("contactInformation")}</h3>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0 text-[#4F8FE2]">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#020654]">{t("headquarters")}</h4>
                  <p className="text-slate-600 mt-1">
                    {t("officeAddress")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0 text-[#4F8FE2]">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#020654]">{t("emailUs")}</h4>
                  <p className="text-slate-600 mt-1">
                    murmankobaxidze@gmail.com<br />
                    temuri.gvetadze@gmail.com<br />
                    guramikobakhidze@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0 text-[#4F8FE2]">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#020654]">{t("callUs")}</h4>
                  <p className="text-slate-600 mt-1">
                    +995 597 69 69 54<br />
                    +995 555 11 99 65<br />
                    +995 577 12 34 01
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0 text-[#4F8FE2]">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#020654]">{t("officeHours")}</h4>
                  <p className="text-slate-600 mt-1">
                    {t("mondayFriday")}<br />
                    {t("saturdaySunday")}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 rounded-xl overflow-hidden w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d738.1121907419189!2d42.703466069622884!3d42.26894299061211!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x405c8d13fae83b8d%3A0x354d497d4a3130f6!2sACG!5e0!3m2!1ska!2sge!4v1777274761798!5m2!1ska!2sge"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              href="https://maps.google.com/?ftid=0x405c8d13fae83b8d:0x354d497d4a3130f6"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-open-maps"
            >
              <Button className="w-full mt-3 bg-[#020654] hover:bg-[#020654]/90 text-white gap-2">
                <Navigation className="h-4 w-4" />
                {t("openInMaps")}
              </Button>
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
