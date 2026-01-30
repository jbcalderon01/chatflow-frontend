"use client";
import { useEffect } from "react";
import { useAuth } from "@/shared/hooks/useAuth";
import { useRouter } from "next/navigation";

export const useLoginView = () => {
  const { user, error, isLoading, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  return {
    user,
    error,
    isLoading,
    login,
  };
};
