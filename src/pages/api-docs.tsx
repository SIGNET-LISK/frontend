import { useLocation } from "wouter";
import { useEffect } from "react";
import { APIDocsLayout } from "@/components/api-docs/APIDocsLayout";
import Introduction from "./api-docs/introduction";
import Authentication from "./api-docs/authentication";
import Verify from "./api-docs/verify";
import Register from "./api-docs/register";
import Publisher from "./api-docs/publisher";
import RateLimits from "./api-docs/rate-limits";
import JavaScriptSDK from "./api-docs/sdk/javascript";
import PythonSDK from "./api-docs/sdk/python";
import Errors from "./api-docs/errors";

export default function APIDocs() {
  const [location] = useLocation();

  // Redirect /docs to /docs/introduction
  useEffect(() => {
    if (location === "/docs") {
      window.history.replaceState(null, "", "/docs/introduction");
    }
  }, [location]);

  // Render the appropriate page component based on the route
  const renderContent = () => {
    switch (location) {
      case "/docs":
      case "/docs/introduction":
        return <Introduction />;
      case "/docs/authentication":
        return <Authentication />;
      case "/docs/verify":
        return <Verify />;
      case "/docs/register":
        return <Register />;
      case "/docs/publisher":
        return <Publisher />;
      case "/docs/rate-limits":
        return <RateLimits />;
      case "/docs/sdk/javascript":
        return <JavaScriptSDK />;
      case "/docs/sdk/python":
        return <PythonSDK />;
      case "/docs/errors":
        return <Errors />;
      default:
        return <Introduction />;
    }
  };

  return <APIDocsLayout>{renderContent()}</APIDocsLayout>;
}
