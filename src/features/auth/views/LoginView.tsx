"use client";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { useLoginView } from "@/features/auth/hooks/useLoginView";

export const LoginView: React.FC = () => {
  const { user, error, isLoading, login } = useLoginView();

  if (user) {
    return null;
  }

  return <LoginForm onLogin={login} error={error} isLoading={isLoading} />;
};
