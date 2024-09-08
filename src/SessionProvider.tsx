import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import { authApi } from "./features/auth/api/authApi";
import { User } from "./type/settion";

interface SessionContextType {
  currentUser: User | null;
  setCurrentUser: Dispatch<SetStateAction<User | null>>;
}

const SessionContext = createContext<SessionContextType>({
  currentUser: null,
  setCurrentUser: () => {},
});

interface SessionProviderProps {
  children: ReactNode;
}

const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const setSession = async () => {
      try {
        const user = await authApi.getCurrentUser();
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
