import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useCreateAppointment } from "@workspace/api-client-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "El nombre es muy corto." }),
  email: z.string().email({ message: "Correo electrónico inválido." }),
  phone: z.string().min(6, { message: "Número de teléfono inválido." }),
  service: z.string().min(1, { message: "Por favor selecciona un servicio." }),
  preferredDate: z.date({
    required_error: "Por favor selecciona una fecha.",
  }),
  notes: z.string().optional(),
});

export function Booking() {
  const { toast } = useToast();
  const createAppointment = useCreateAppointment();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      notes: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createAppointment.mutate(
      {
        data: {
          ...values,
          preferredDate: values.preferredDate.toISOString(),
        },
      },
      {
        onSuccess: () => {
          toast({
            title: "¡Cita solicitada con éxito!",
            description: "Nos pondremos en contacto contigo pronto para confirmar.",
            variant: "default",
          });
          form.reset();
        },
        onError: () => {
          toast({
            title: "Error",
            description: "Hubo un problema al solicitar la cita. Por favor intenta de nuevo.",
            variant: "destructive",
          });
        },
      }
    );
  }

  const serviceOptions = [
    "Altas SEPE/SOC",
    "Renovación NIE",
    "Cita Policía",
    "Cita Nacionalidad",
    "IMV (Ingreso Mínimo Vital)",
    "Creación de Web",
    "Personalización Web",
    "Gestión Redes Sociales",
    "Flyers / Calendarios / Tarjetas",
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Reserva tu Cita</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Déjanos tus datos y qué trámite o servicio necesitas. Te contactaremos rápidamente para agendar el mejor momento para ti.
            </p>
            <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
              <h3 className="font-semibold text-lg mb-2 text-foreground">¿Por qué agendar con nosotros?</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-2 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>Trato humano y cercano, entendemos tus necesidades.</span>
                </li>
                <li className="flex gap-2 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>Experiencia en extranjería y trámites españoles.</span>
                </li>
                <li className="flex gap-2 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>Soluciones digitales y de impresión para impulsar tu negocio.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-card border shadow-xl rounded-3xl p-6 md:p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre completo</FormLabel>
                      <FormControl>
                        <Input placeholder="Ej. Juan Pérez" {...field} className="h-12 rounded-xl" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Correo electrónico</FormLabel>
                        <FormControl>
                          <Input placeholder="juan@ejemplo.com" type="email" {...field} className="h-12 rounded-xl" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Teléfono</FormLabel>
                        <FormControl>
                          <Input placeholder="+34 600 000 000" type="tel" {...field} className="h-12 rounded-xl" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Servicio que necesitas</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12 rounded-xl">
                            <SelectValue placeholder="Selecciona un servicio" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {serviceOptions.map((opt) => (
                            <SelectItem key={opt} value={opt}>
                              {opt}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="preferredDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Fecha de preferencia</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "h-12 rounded-xl pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP", { locale: es })
                              ) : (
                                <span>Selecciona una fecha</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date(new Date().setHours(0, 0, 0, 0))
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notas adicionales (Opcional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Cuéntanos un poco más sobre tu caso..."
                          className="resize-none rounded-xl"
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
                  disabled={createAppointment.isPending}
                  data-testid="button-submit-appointment"
                >
                  {createAppointment.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    "Solicitar Cita"
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
