import { ReactNode, createContext, useState, useEffect } from "react";
import { getFromSessionStorage } from "../utils/localStorage";

interface IContext {
  loggedInUser: ILogin | undefined;
  setLoggedInUser: (user: ILogin | undefined) => void;
}

export const AuthContext = createContext<IContext>({
  loggedInUser: undefined,
  setLoggedInUser: () => {},
});

interface Props {
  children: ReactNode;
}

interface ILogin {
  username: string;
  password: string;
  role: string;
}

const AuthContextAPI: React.FC<Props> = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState<ILogin | undefined>();

  useEffect(() => {
    const fromLocalStorage: ILogin | null = getFromSessionStorage();
    if (fromLocalStorage) {
      setLoggedInUser(fromLocalStorage);
    }
  }, []);

  const handleSetLoggedInUser = (user: ILogin | undefined) => {
    setLoggedInUser(user);
  };

  return (
    <AuthContext.Provider
      value={{ loggedInUser, setLoggedInUser: handleSetLoggedInUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextAPI;
