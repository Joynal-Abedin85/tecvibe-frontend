"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/authprovider";

export default function ProtectedRoute({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles?: string[];
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace("/login");
      } else if (
        allowedRoles &&
        !allowedRoles.includes(user.role)
      ) {
        router.replace("/"); 
      }
    }
  }, [user, loading, router, allowedRoles]);

  if (loading || !user) return null;

  return <>{children}</>;
}
