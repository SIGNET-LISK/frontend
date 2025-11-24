import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { WagmiProvider } from "wagmi";
import { wagmiConfig } from "./lib/wagmi";
import { ThemeProvider } from "next-themes";
import LandingPage from "@/pages/landing";
import DashboardHome from "@/pages/dashboard-home";
import RegisterContent from "@/pages/register-content";
import MyContents from "@/pages/my-contents";
import APIUsage from "@/pages/api-usage";
import APIDocs from "@/pages/api-docs";
import VerifyContent from "@/pages/verify-content";
import ManagePublishers from "@/pages/manage-publishers";
import ContentReview from "@/pages/content-review";
import SystemMonitor from "@/pages/system-monitor";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      
      <Route path="/dashboard" component={DashboardHome} />
      <Route path="/dashboard/upload" component={RegisterContent} />
      <Route path="/dashboard/contents" component={MyContents} />
      <Route path="/dashboard/api" component={APIUsage} />
      
      {/* API Docs routes */}
      <Route path="/docs" component={APIDocs} />
      <Route path="/docs/introduction" component={APIDocs} />
      <Route path="/docs/authentication" component={APIDocs} />
      <Route path="/docs/verify" component={APIDocs} />
      <Route path="/docs/register" component={APIDocs} />
      <Route path="/docs/publisher" component={APIDocs} />
      <Route path="/docs/rate-limits" component={APIDocs} />
      <Route path="/docs/sdk/javascript" component={APIDocs} />
      <Route path="/docs/sdk/python" component={APIDocs} />
      <Route path="/docs/errors" component={APIDocs} />
      
      <Route path="/verify" component={VerifyContent} />
      
      {/* Admin routes */}
      <Route path="/dashboard/admin/publishers" component={ManagePublishers} />
      <Route path="/dashboard/admin/review" component={ContentReview} />
      <Route path="/dashboard/admin/monitor" component={SystemMonitor} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ThemeProvider>
  );
}

export default App;
