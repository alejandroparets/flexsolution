import { CheckCircle2, CreditCard, Smartphone } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useLang } from "@/context/LangContext";
import { translations } from "@/i18n";

export function Payment() {
  const { lang } = useLang();
  const t = translations.payment[lang];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-[800px] mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t.heading}</h2>
          <p className="text-lg text-muted-foreground">{t.subheading}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto items-center">
          <Card className="border-border shadow-lg bg-card overflow-hidden">
            <div className="bg-primary p-6 text-primary-foreground text-center">
              <Smartphone size={48} className="mx-auto mb-4 opacity-90" />
              <CardTitle className="text-2xl font-bold">{t.cardTitle}</CardTitle>
            </div>
            <CardContent className="p-8">
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-muted-foreground font-medium mb-1">{t.phoneLabel}</p>
                  <div className="text-3xl font-mono font-bold tracking-wider text-foreground bg-muted p-4 rounded-xl text-center border">
                    628 852 296
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium mb-1">{t.conceptLabel}</p>
                  <div className="bg-accent/20 p-4 rounded-xl border border-accent/30 flex items-start gap-3">
                    <CheckCircle2 className="text-accent-foreground shrink-0 mt-0.5" size={20} />
                    <p
                      className="text-foreground text-sm font-medium"
                      dangerouslySetInnerHTML={{ __html: t.conceptText }}
                    />
                  </div>
                </div>
                <div className="pt-4 border-t border-dashed">
                  <p className="text-sm text-muted-foreground text-center">{t.note}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <CreditCard className="text-primary" />
                {t.howTitle}
              </h3>
              <div className="space-y-6">
                {t.steps.map((step, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center shrink-0 border border-primary/30">
                      {i + 1}
                    </div>
                    <p className="text-foreground pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
