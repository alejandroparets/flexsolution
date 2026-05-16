import { motion } from "framer-motion";
import { FileCheck, Globe, IdCard, Lightbulb, PenTool, Printer } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function Services() {
  const services = [
    {
      id: "tramites",
      title: "Trámites Generales",
      description: "Altas en SEPE y SOC. Gestión documental sin complicaciones.",
      icon: <FileCheck size={28} className="text-primary" />,
      color: "bg-primary/10",
      delay: 0.1
    },
    {
      id: "extranjeria",
      title: "Extranjería y Citas",
      description: "Renovación de NIE, citas de Policía, Nacionalidad e Ingreso Mínimo Vital (IMV).",
      icon: <IdCard size={28} className="text-secondary" />,
      color: "bg-secondary/10",
      delay: 0.2
    },
    {
      id: "web",
      title: "Creación Web",
      description: "Diseño y desarrollo de sitios web profesionales a tu medida.",
      icon: <Globe size={28} className="text-accent-foreground" />,
      color: "bg-accent/20",
      delay: 0.3
    },
    {
      id: "redes",
      title: "Redes y Personalización",
      description: "Gestión de redes sociales y branding digital para tu negocio.",
      icon: <Lightbulb size={28} className="text-primary" />,
      color: "bg-primary/10",
      delay: 0.4
    },
    {
      id: "impresion",
      title: "Impresión y Diseño",
      description: "Flyers, calendarios, tarjetas de visita y diseño gráfico.",
      icon: <Printer size={28} className="text-secondary" />,
      color: "bg-secondary/10",
      delay: 0.5
    },
    {
      id: "asesoramiento",
      title: "Asesoramiento Cercano",
      description: "Te guiamos paso a paso con calidez y entendiendo tu situación.",
      icon: <PenTool size={28} className="text-accent-foreground" />,
      color: "bg-accent/20",
      delay: 0.6
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-[800px] mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Nuestros Servicios</h2>
          <p className="text-lg text-muted-foreground">
            Todo lo que necesitas para establecerte y emprender en España, en un solo lugar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: service.delay }}
            >
              <Card className="h-full border-border/50 shadow-sm hover:shadow-md transition-shadow hover:border-primary/20 group">
                <CardHeader>
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${service.color} group-hover:scale-110 transition-transform duration-300`}>
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
