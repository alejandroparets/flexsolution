import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, FileText, Globe, Printer } from "lucide-react";
import posterImg from "@assets/Tarjeta_presentación_-_Posterior_1778917990600.png";

export function Hero() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-background py-16 md:py-24 lg:py-32">
      {/* Decorative blobs */}
      <div className="absolute top-0 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -right-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6"
          >
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary w-fit">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
              Acompañamiento en España
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-tight">
              Trámites y extranjería <span className="text-primary relative whitespace-nowrap">
                sin estrés
                <span className="absolute -bottom-2 left-0 w-full h-3 bg-accent/30 -z-10 rounded-full"></span>
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-[600px] leading-relaxed">
              Sabemos que empezar en un nuevo país es abrumador. Somos tu amigo de confianza para papeleos, extranjería, creación web e impresión. Te lo hacemos fácil.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <Button size="lg" onClick={() => scrollTo("cita")} className="gap-2 text-base h-14 px-8 rounded-full" data-testid="hero-cta-cita">
                Pedir Cita Ahora <ArrowRight size={18} />
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollTo("servicios")} className="text-base h-14 px-8 rounded-full" data-testid="hero-cta-servicios">
                Ver Servicios
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-border/50">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <FileText size={24} />
                </div>
                <span className="text-sm font-medium text-foreground">Gestoría</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                  <Globe size={24} />
                </div>
                <span className="text-sm font-medium text-foreground">Web y Redes</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center text-accent-foreground">
                  <Printer size={24} />
                </div>
                <span className="text-sm font-medium text-foreground">Impresión</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative lg:ml-auto w-full max-w-[500px] aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-overlay z-10 rounded-2xl"></div>
            <img 
              src={posterImg} 
              alt="Tarjeta de presentación Gestión Web Impresión" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
