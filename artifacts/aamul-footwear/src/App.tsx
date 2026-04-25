import { lazy, Suspense, useEffect } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";

import { BagProvider } from "@/context/BagContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Newsletter from "@/components/layout/Newsletter";
import BagDrawer from "@/components/layout/BagDrawer";

const Home = lazy(() => import("@/pages/Home"));
const HandmadeMojdi = lazy(() => import("@/pages/HandmadeMojdi"));
const About = lazy(() => import("@/pages/About"));
const ProductDetail = lazy(() => import("@/pages/ProductDetail"));
const NotFound = lazy(() => import("@/pages/not-found"));

const queryClient = new QueryClient();

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);
  return null;
}

function PageFallback() {
  return (
    <div
      className="flex items-center justify-center min-h-[50vh]"
      role="status"
      aria-label="Loading page"
    >
      <div className="w-10 h-10 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
    </div>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <BagDrawer />
      <main className="flex-grow">
        <AnimatePresence mode="wait">{children}</AnimatePresence>
      </main>
      <Newsletter />
      <Footer />
    </div>
  );
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Layout>
        <Suspense fallback={<PageFallback />}>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/handmade-mojdi" component={HandmadeMojdi} />
            <Route path="/about" component={About} />
            <Route path="/product/:id">
              {(params) => <ProductDetail id={params.id} />}
            </Route>
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Layout>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BagProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
        </BagProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
