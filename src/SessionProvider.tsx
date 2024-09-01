import React, { createContext, useState, ReactNode, useEffect } from "react";
import { authRepository } from "./repositories/auth";
import { SessionUser } from "./type/settion";

interface SessionContextType {
  currentUser: SessionUser | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<SessionUser | null>>;
}

interface SessionProviderProps {
  children: ReactNode;
}

const SessionContext = createContext<SessionContextType>({
  currentUser: null,
  setCurrentUser: () => {},
});

const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<SessionUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const setSession = async () => {
      try {
        const user = await authRepository.getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        console.error("Error setting session:", error);
      } finally {
        setIsLoading(false);
      }
    };

    setSession();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <SessionContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </SessionContext.Provider>
  );
};

export { SessionContext, SessionProvider };
