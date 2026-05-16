import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2, Mail, MapPin, MessageSquare, Phone } from "lucide-react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useSendContact } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "El nombre es muy corto." }),
  email: z.string().email({ message: "Correo electrónico inválido." }),
  message: z.string().min(10, { message: "El mensaje debe tener al menos 10 caracteres." }),
});

export function Contact() {
  const { toast } = useToast();
  const sendContact = useSendContact();

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof contactFormSchema>) {
    sendContact.mutate(
      { data: values },
      {
        onSuccess: () => {
          toast({
            title: "¡Mensaje enviado!",
            description: "Hemos recibido tu mensaje y te responderemos pronto.",
          });
          form.reset();
        },
        onError: () => {
          toast({
            title: "Error",
            description: "No se pudo enviar el mensaje. Por favor intenta por WhatsApp.",
            variant: "destructive",
          });
        },
      }
    );
  }

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-1/2 left-0 w-full h-[500px] bg-secondary/5 -translate-y-1/2 -skew-y-6 -z-10" />

      <div className="container px-4 md:px-6">
        <div className="grid lg:grid-cols-5 gap-12">
          
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Hablemos</h2>
              <p className="text-lg text-muted-foreground">
                ¿Tienes dudas? Escríbenos y te guiaremos en lo que necesites, sin compromiso.
              </p>
            </div>

            <div className="space-y-6">
              <a 
                href="https://wa.me/34600000000" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-card border hover:border-[#25D366]/50 hover:shadow-md transition-all group"
                data-testid="contact-whatsapp"
              >
                <div className="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                  <FaWhatsapp size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">WhatsApp</h4>
                  <p className="text-sm text-muted-foreground">Respuesta rápida (600 000 000)</p>
                </div>
              </a>

              <a 
                href="https://instagram.com/placeholder" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-card border hover:border-[#E1306C]/50 hover:shadow-md transition-all group"
                data-testid="contact-instagram"
              >
                <div className="w-12 h-12 rounded-full bg-[#E1306C]/10 flex items-center justify-center text-[#E1306C] group-hover:bg-gradient-to-tr from-[#F56040] to-[#833AB4] group-hover:text-white transition-all">
                  <FaInstagram size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Instagram</h4>
                  <p className="text-sm text-muted-foreground">@gestionwebimpresion</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-card border">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Email</h4>
                  <p className="text-sm text-muted-foreground">alejandroparets@gmail.com</p>
                </div>
              </div>
            </div>

            <Card className="border-border overflow-hidden bg-white/50 backdrop-blur-sm">
              <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                <h4 className="font-semibold text-foreground">Escanea y guarda nuestro contacto</h4>
                <img 
                  src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://community-connect-hub-alejandroparets.replit.app/" 
                  alt="QR Code" 
                  className="w-32 h-32 rounded-xl border p-2 bg-white"
                />
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-card border shadow-xl rounded-3xl p-6 md:p-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <MessageSquare className="text-primary" />
                Envíanos un mensaje
              </h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                          <Input placeholder="Tu nombre" {...field} className="h-12 rounded-xl" />
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
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="tu@email.com" type="email" {...field} className="h-12 rounded-xl" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mensaje</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="¿En qué te podemos ayudar?"
                            className="min-h-[150px] resize-none rounded-xl"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full h-12 rounded-xl text-base"
                    disabled={sendContact.isPending}
                    data-testid="button-submit-contact"
                  >
                    {sendContact.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      "Enviar Mensaje"
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
