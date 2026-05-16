import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import logoImg from "@assets/logo_no_bg.png";
import { useLang } from "@/context/LangContext";
import { translations } from "@/i18n";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { lang, setLang } = useLang();
  const t = translations.navbar[lang];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  const navItems = [
    { label: t.home, id: "hero" },
    { label: t.services, id: "servicios" },
    { label: t.booking, id: "cita" },
    { label: t.payment, id: "pago" },
    { label: t.contact, id: "contacto" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div
          className="flex items-center gap-2 font-bold text-xl cursor-pointer text-primary"
          onClick={() => scrollTo("hero")}
          data-testid="nav-logo"
        >
          <img src={logoImg} alt="FlexSolution" className="h-14 w-auto" />
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6 items-center">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              data-testid={`nav-link-${item.id}`}
            >
              {item.label}
            </button>
          ))}
          <Button onClick={() => scrollTo("cita")} data-testid="nav-cta">
            {t.cta}
          </Button>
          {/* Language toggle */}
          <button
            onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
            className="text-sm font-bold border border-primary/30 rounded-full px-3 py-1 text-primary hover:bg-primary/10 transition-colors"
            aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
          >
            {lang === 'es' ? '🇬🇧 EN' : '🇪🇸 ES'}
          </button>
        </div>

        {/* Mobile toggle */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
            className="text-xs font-bold border border-primary/30 rounded-full px-2 py-1 text-primary"
          >
            {lang === 'es' ? 'EN' : 'ES'}
          </button>
          <button
            className="p-2 -mr-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            data-testid="nav-mobile-toggle"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-b bg-background px-4 py-4 space-y-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="block w-full text-left py-2 text-base font-medium text-foreground hover:text-primary transition-colors"
              data-testid={`nav-mobile-link-${item.id}`}
            >
              {item.label}
            </button>
          ))}
          <Button onClick={() => scrollTo("cita")} className="w-full" data-testid="nav-mobile-cta">
            {t.cta}
          </Button>
        </div>
      )}
    </nav>
  );
}
