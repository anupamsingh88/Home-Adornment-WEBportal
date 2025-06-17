import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import Loader from "./components/Loader";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthProvider } from "@/hooks/use-auth";
import { CartProvider } from "@/hooks/use-cart";
import { ProtectedRoute } from "./lib/protected-route";
// ThemeProvider is already imported in main.tsx
import { lazy, Suspense } from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

// Lazy load protected routes
const Cart = lazy(() => import('./pages/Cart'));
const Profile = lazy(() => import('./pages/Profile'));
const Orders = lazy(() => import('./pages/Orders'));

function Router() {
  const [location] = useLocation();
  const isAuthPage = location === '/login' || location === '/signup';
  
  return (
    <>
      {!isAuthPage && <Navbar />}
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/products" component={Products} />
        <Route path="/services" component={Services} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <ProtectedRoute path="/cart" component={Cart} />
        <ProtectedRoute path="/profile" component={Profile} />
        <ProtectedRoute path="/orders" component={Orders} />
        <ProtectedRoute path="/payment" component={lazy(() => import('./pages/Payment'))} />
        <ProtectedRoute path="/settings" component={lazy(() => import('./pages/Settings'))} />
        <Route component={NotFound} />
      </Switch>
      {!isAuthPage && <Footer />}
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <TooltipProvider>
            <Loader />
            <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><Loader /></div>}>
              <Router />
            </Suspense>
            <BackToTop />
            <Toaster />
          </TooltipProvider>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
