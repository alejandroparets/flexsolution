import { Heart } from "lucide-react";

export function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-muted py-12 border-t">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-xl text-primary mb-4">Gestión + Web + Impresión</h3>
            <p className="text-muted-foreground text-sm max-w-xs">
              Tu aliado de confianza para trámites, extranjería, presencia digital e impresión en España. Te lo hacemos fácil.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <button onClick={() => scrollTo('servicios')} className="hover:text-primary transition-colors">Servicios</button>
              </li>
              <li>
                <button onClick={() => scrollTo('cita')} className="hover:text-primary transition-colors">Pedir Cita</button>
              </li>
              <li>
                <button onClick={() => scrollTo('pago')} className="hover:text-primary transition-colors">Cómo Pagar</button>
              </li>
              <li>
                <button onClick={() => scrollTo('contacto')} className="hover:text-primary transition-colors">Contacto</button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Aviso Legal</li>
              <li>Política de Privacidad</li>
              <li>Términos y Condiciones</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Gestión + Web + Impresión. Todos los derechos reservados.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Hecho con <Heart size={14} className="text-destructive fill-destructive" /> para ti
          </p>
        </div>
      </div>
    </footer>
  );
}
