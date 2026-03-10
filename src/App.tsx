import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Index from "./pages/Index";
import ReportAccident from "./pages/ReportAccident";
import LiveMap from "./pages/LiveMap";
import FirstAid from "./pages/FirstAid";
import Dashboard from "./pages/Dashboard";
import VolunteerRegistration from "./pages/VolunteerRegistration";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/report" element={<ReportAccident />} />
          <Route path="/map" element={<LiveMap />} />
          <Route path="/first-aid" element={<FirstAid />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/volunteer" element={<VolunteerRegistration />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
