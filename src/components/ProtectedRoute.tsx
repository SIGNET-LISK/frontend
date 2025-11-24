import { useEffect } from "react";
import { useLocation } from "wouter";
import { usePublisher } from "@/hooks/usePublisher";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requirePublisher?: boolean;
  requireOwner?: boolean;
}

export function ProtectedRoute({ 
  children, 
  requirePublisher = false, 
  requireOwner = false 
}: ProtectedRouteProps) {
  const [, setLocation] = useLocation();
  const { isConnected, isPublisher, isOwner, isLoading } = usePublisher();

  useEffect(() => {
    if (isLoading) return;

    if (!isConnected) {
      setLocation("/");
      return;
    }

    if (requireOwner && !isOwner) {
      setLocation("/");
      return;
    }

    if (requirePublisher && !isPublisher) {
      setLocation("/");
      return;
    }
  }, [isConnected, isPublisher, isOwner, isLoading, requirePublisher, requireOwner, setLocation]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  if (!isConnected) {
    return null;
  }

  if (requireOwner && !isOwner) {
    return null;
  }

  if (requirePublisher && !isPublisher) {
    return null;
  }

  return <>{children}</>;
}

