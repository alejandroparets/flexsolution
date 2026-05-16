import { Heart } from "lucide-react";
import { useLang } from "@/context/LangContext";
import { translations } from "@/i18n";

export function Footer() {
  const { lang } = useLang();
  const t = translations.footer[lang];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const sectionIds = ["servicios", "cita", "pago", "contacto"];

  return (
    <footer className="bg-muted py-12 border-t">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-xl text-primary mb-4">FlexSolution</h3>
            <p className="text-muted-foreground text-sm max-w-xs">{t.tagline}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-foreground">{t.quickLinks}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {t.links.map((label, i) => (
                <li key={i}>
                  <button onClick={() => scrollTo(sectionIds[i])} className="hover:text-primary transition-colors">
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-foreground">{t.legal}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {t.legalLinks.map((label, i) => (
                <li key={i}>{label}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} FlexSolution. {t.copyright}
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            {t.madeWith} <Heart size={14} className="text-destructive fill-destructive" /> {t.forYou}
          </p>
        </div>
      </div>
    </footer>
  );
}
