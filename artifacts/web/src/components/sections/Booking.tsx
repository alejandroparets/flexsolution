import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { es, enUS } from "date-fns/locale";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
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
import { useLang } from "@/context/LangContext";
import { translations } from "@/i18n";

const makeSchema = (lang: 'es' | 'en') =>
  z.object({
    name: z.string().min(2, { message: lang === 'es' ? "El nombre es muy corto." : "Name is too short." }),
    email: z.string().email({ message: lang === 'es' ? "Correo electrónico inválido." : "Invalid email." }),
    phone: z.string().min(6, { message: lang === 'es' ? "Número de teléfono inválido." : "Invalid phone number." }),
    service: z.string().min(1, { message: lang === 'es' ? "Por favor selecciona un servicio." : "Please select a service." }),
    preferredDate: z.date({ required_error: lang === 'es' ? "Por favor selecciona una fecha." : "Please pick a date." }),
    notes: z.string().optional(),
  });

export function Booking() {
  const { lang } = useLang();
  const t = translations.booking[lang];
  const { toast } = useToast();
  const createAppointment = useCreateAppointment();
  const dateLocale = lang === 'es' ? es : enUS;

  const form = useForm<z.infer<ReturnType<typeof makeSchema>>>({
    resolver: zodResolver(makeSchema(lang)),
    defaultValues: { name: "", email: "", phone: "", service: "", notes: "" },
  });

  function onSubmit(values: z.infer<ReturnType<typeof makeSchema>>) {
    createAppointment.mutate(
      { data: { ...values, preferredDate: values.preferredDate.toISOString() } },
      {
        onSuccess: () => {
          toast({ title: t.successTitle, description: t.successDesc, variant: "default" });
          form.reset();
        },
        onError: () => {
          toast({ title: t.errorTitle, description: t.errorDesc, variant: "destructive" });
        },
      }
    );
  }

  return (
    <section className="py-20 bg-background">
      <div className="container px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">{t.heading}</h2>
            <p className="text-lg text-muted-foreground mb-8">{t.subheading}</p>
            <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
              <h3 className="font-semibold text-lg mb-2 text-foreground">{t.whyTitle}</h3>
              <ul className="space-y-3 text-muted-foreground">
                {t.reasons.map((r, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span>{r}</span>
                  </li>
                ))}
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
                      <FormLabel>{t.fieldName}</FormLabel>
                      <FormControl>
                        <Input placeholder={t.fieldNamePlaceholder} {...field} className="h-12 rounded-xl" />
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
                        <FormLabel>{t.fieldEmail}</FormLabel>
                        <FormControl>
                          <Input placeholder="email@example.com" type="email" {...field} className="h-12 rounded-xl" />
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
                        <FormLabel>{t.fieldPhone}</FormLabel>
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
                      <FormLabel>{t.fieldService}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12 rounded-xl">
                            <SelectValue placeholder={t.fieldServicePlaceholder} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {t.serviceOptions.map((opt) => (
                            <SelectItem key={opt} value={opt}>{opt}</SelectItem>
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
                      <FormLabel>{t.fieldDate}</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn("h-12 rounded-xl pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                            >
                              {field.value
                                ? format(field.value, "PPP", { locale: dateLocale })
                                : <span>{t.fieldDatePlaceholder}</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
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
                      <FormLabel>{t.fieldNotes}</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={t.fieldNotesPlaceholder}
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
                    <><Loader2 className="mr-2 h-5 w-5 animate-spin" />{t.sending}</>
                  ) : t.submit}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
