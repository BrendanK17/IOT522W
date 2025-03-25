import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  signup: (email: string, password: string, role: string) => string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem("users");
    return storedUsers ? JSON.parse(storedUsers) : [
      { email: "customer@example.com", password: "customer123", role: "customer" },
      { email: "foodprep@example.com", password: "foodprep123", role: "food-prep-staff" },
      { email: "delivery@example.com", password: "delivery123", role: "delivery-staff" },
    ];
  });

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const login = (email: string, password: string) => {
    const foundUser = users.find((u: User & { password: string }) => u.email === email && u.password === password);
    if (foundUser) {
      setUser({ email: foundUser.email, role: foundUser.role });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  const signup = (email: string, password: string, role: string): string => {
    const existingUser = users.find((u: User) => u.email === email);
    if (existingUser) {
      return "User already exists";
    }
    setUsers([...users, { email, password, role }]);
    return "User created successfully";
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};
