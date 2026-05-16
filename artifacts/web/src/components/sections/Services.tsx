import { motion } from "framer-motion";
import { FileCheck, Globe, IdCard, Lightbulb, PenTool, Printer } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLang } from "@/context/LangContext";
import { translations } from "@/i18n";

const icons = [
  <FileCheck size={28} className="text-primary" />,
  <IdCard size={28} className="text-secondary" />,
  <Globe size={28} className="text-accent-foreground" />,
  <Lightbulb size={28} className="text-primary" />,
  <Printer size={28} className="text-secondary" />,
  <PenTool size={28} className="text-accent-foreground" />,
];

const colors = [
  "bg-primary/10",
  "bg-secondary/10",
  "bg-accent/20",
  "bg-primary/10",
  "bg-secondary/10",
  "bg-accent/20",
];

export function Services() {
  const { lang } = useLang();
  const t = translations.services[lang];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-[800px] mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t.heading}</h2>
          <p className="text-lg text-muted-foreground">{t.subheading}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.items.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Card className="h-full border-border/50 shadow-sm hover:shadow-md transition-shadow hover:border-primary/20 group">
                <CardHeader>
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${colors[idx]} group-hover:scale-110 transition-transform duration-300`}>
                    {icons[idx]}
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
