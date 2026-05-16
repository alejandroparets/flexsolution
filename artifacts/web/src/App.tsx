import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Booking } from "@/components/sections/Booking";
import { Payment } from "@/components/sections/Payment";
import { Contact } from "@/components/sections/Contact";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LangProvider } from "@/context/LangContext";

const queryClient = new QueryClient();

function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <div id="hero"><Hero /></div>
        <div id="servicios"><Services /></div>
        <div id="cita"><Booking /></div>
        <div id="pago"><Payment /></div>
        <div id="contacto"><Contact /></div>
      </main>
      <Footer />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LangProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </LangProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
