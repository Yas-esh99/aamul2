import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Newsletter from "@/components/layout/Newsletter";
import Home from "@/pages/Home";
import HandmadeMojdi from "@/pages/HandmadeMojdi";
import About from "@/pages/About";
import ProductDetail from "@/pages/ProductDetail";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {children}
        </AnimatePresence>
      </main>
      <Newsletter />
      <Footer />
    </div>
  );
}

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/handmade-mojdi" component={HandmadeMojdi} />
        <Route path="/about" component={About} />
        <Route path="/product/:id">
          {(params) => <ProductDetail id={params.id} />}
        </Route>
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
