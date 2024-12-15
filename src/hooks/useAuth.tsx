import { useContext, createContext, useState } from "react";
import {
  getUser,
  loginCustomer,
  logoutCustomer,
} from "../utils/customer-utils";
import { Customer } from "../models/customer.model";
import { ReactNode } from "react";

interface AuthContextType {
  user: Customer | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(getUser());
  const login = async (email: string, password: string) => {
    try {
      const user = await loginCustomer(email, password);
      setUser(user);
    } catch (error) {
      console.log("Something went wrong, please try again.", error);
    }
  };

  const logout = async () => {
    try {
      await logoutCustomer();
      setUser(null);
    } catch (error) {
      console.log("Something went wrong, please try again.", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
