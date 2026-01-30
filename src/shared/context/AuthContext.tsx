"use client";
import React, {
  createContext,
  useState,
  useCallback,
  ReactNode,
  useEffect,
  useMemo,
} from "react";
import {
  signIn,
  signOut,
  getCurrentUser,
  fetchAuthSession,
} from "aws-amplify/auth";
import "@/shared/lib/amplify";
import { useGetMySelf } from "@/shared/api/hooks";
import { useQueryClient } from "@tanstack/react-query";

interface AuthUser {
  email: string;
  token: string;
  id?: string;
  name?: string;
  role?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  error: string | null;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [session, setSession] = useState<{
    email: string;
    token: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSessionLoading, setIsSessionLoading] = useState(true);

  const checkUser = useCallback(async () => {
    try {
      const { username } = await getCurrentUser();
      const sessionData = await fetchAuthSession();
      const token = sessionData.tokens?.idToken?.toString() || "";
      setSession({ email: username, token });
    } catch (err) {
      setSession(null);
    } finally {
      setIsSessionLoading(false);
    }
  }, []);

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  const {
    data: apiUser,
    isLoading: isApiUserLoading,
    refetch: refetchUser,
    error: apiUserError,
  } = useGetMySelf(!!session?.token);

  useEffect(() => {
    if (apiUserError && session) {
      console.error("error", apiUserError);
      logout();
    }
  }, [apiUserError, session]);

  const user = useMemo(() => {
    if (!session) return null;
    if (!apiUser && isApiUserLoading) return null;
    return {
      ...session,
      ...apiUser,
    };
  }, [session, apiUser, isApiUserLoading]);

  const login = useCallback(
    async (email: string, pass: string) => {
      setIsSessionLoading(true);
      setError(null);

      try {
        await signIn({ username: email, password: pass });
        const { username } = await getCurrentUser();
        const sessionData = await fetchAuthSession();
        const token = sessionData.tokens?.idToken?.toString() || "";

        setSession({ email: username, token });
        await refetchUser();

        setIsSessionLoading(false);
        return true;
      } catch (err) {
        const errorMsg =
          err instanceof Error ? err.message : "Error al iniciar sesión";
        setError(errorMsg);
        setIsSessionLoading(false);
        return false;
      }
    },
    [refetchUser],
  );

  const queryClient = useQueryClient();

  const logout = useCallback(async () => {
    try {
      await signOut();
      setSession(null);
      queryClient.clear();
    } catch {
      console.error("Error logging out");
    }
  }, [queryClient]);

  const isLoading = isSessionLoading || (!!session && isApiUserLoading);

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
