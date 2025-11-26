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
import Activity from "@/pages/activity";
import ManagePublishers from "@/pages/manage-publishers";
import ContentReview from "@/pages/content-review";
import SystemMonitor from "@/pages/system-monitor";
import NotFound from "@/pages/not-found";
import { ProtectedRoute } from "@/components/ProtectedRoute";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />

      {/* Protected Publisher Routes */}
      <Route path="/dashboard">
        {() => (
          <ProtectedRoute requirePublisher>
            <DashboardHome />
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/dashboard/upload">
        {() => (
          <ProtectedRoute requirePublisher>
            <RegisterContent />
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/dashboard/contents">
        {() => (
          <ProtectedRoute requirePublisher>
            <MyContents />
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/dashboard/api">
        {() => (
          <ProtectedRoute requirePublisher>
            <APIUsage />
          </ProtectedRoute>
        )}
      </Route>

      {/* Public Routes */}
      <Route path="/verify" component={VerifyContent} />
      <Route path="/activity" component={Activity} />

      {/* API Docs routes */}
      <Route path="/docs" component={APIDocs} />
      <Route path="/docs/introduction" component={APIDocs} />
      <Route path="/docs/register" component={APIDocs} />
      <Route path="/docs/verify" component={APIDocs} />
      <Route path="/docs/contents" component={APIDocs} />
      <Route path="/docs/notes" component={APIDocs} />

      {/* Protected Admin Routes */}
      <Route path="/dashboard/admin/publishers">
        {() => (
          <ProtectedRoute requireOwner>
            <ManagePublishers />
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/dashboard/admin/review">
        {() => (
          <ProtectedRoute requireOwner>
            <ContentReview />
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/dashboard/admin/monitor">
        {() => (
          <ProtectedRoute requireOwner>
            <SystemMonitor />
          </ProtectedRoute>
        )}
      </Route>

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
