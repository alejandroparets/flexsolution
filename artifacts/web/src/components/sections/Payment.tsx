import { CheckCircle2, CreditCard, Smartphone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Payment() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-[800px] mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Pago y Confirmación</h2>
          <p className="text-lg text-muted-foreground">
            Aceptamos pagos por Bizum de forma rápida y segura para confirmar tu cita o encargo.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto items-center">
          <Card className="border-border shadow-lg bg-card overflow-hidden">
            <div className="bg-primary p-6 text-primary-foreground text-center">
              <Smartphone size={48} className="mx-auto mb-4 opacity-90" />
              <CardTitle className="text-2xl font-bold">Datos para Bizum</CardTitle>
            </div>
            <CardContent className="p-8">
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-muted-foreground font-medium mb-1">Número de teléfono Bizum</p>
                  <div className="text-3xl font-mono font-bold tracking-wider text-foreground bg-muted p-4 rounded-xl text-center border">
                    628 852 296
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium mb-1">Concepto del pago</p>
                  <div className="bg-accent/20 p-4 rounded-xl border border-accent/30 flex items-start gap-3">
                    <CheckCircle2 className="text-accent-foreground shrink-0 mt-0.5" size={20} />
                    <p className="text-foreground text-sm font-medium">
                      Por favor, indica tu <span className="font-bold">Nombre Completo</span> y el <span className="font-bold">Servicio</span> como concepto del pago para poder identificarlo.
                    </p>
                  </div>
                </div>
                <div className="pt-4 border-t border-dashed">
                  <p className="text-sm text-muted-foreground text-center">
                    Importante: Tu cita quedará confirmada una vez recibido el comprobante de pago.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <CreditCard className="text-primary" />
                Cómo pagar con Bizum
              </h3>
              <div className="space-y-6">
                {[
                  { step: "1", text: "Abre la app de tu banco en tu móvil y entra en la sección de Bizum." },
                  { step: "2", text: "Selecciona 'Enviar dinero' e introduce nuestro número: 628 852 296." },
                  { step: "3", text: "Escribe el importe acordado y en concepto pon tu Nombre y Servicio." },
                  { step: "4", text: "Confirma el envío y envíanos una captura por WhatsApp para validar tu cita." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center shrink-0 border border-primary/30">
                      {item.step}
                    </div>
                    <p className="text-foreground pt-1">{item.text}</p>
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
