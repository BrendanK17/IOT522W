<<<<<<< HEAD
// AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialUsers } from '../lib/auth'; // <-- Adjust path accordingly
=======
<<<<<<< HEAD
// AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialUsers } from '../lib/auth'; // <-- Adjust path accordingly
=======
import React, { createContext, useContext, useState, useEffect } from 'react';
>>>>>>> 3a5b71c (Adding unauthorised message when a user tries to acces a page they arent permissioned for)
>>>>>>> main

interface User {
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
<<<<<<< HEAD
  signup: (email: string, password: string, role: string) => string;
=======
<<<<<<< HEAD
  signup: (email: string, password: string, role: string) => string;
=======
>>>>>>> 3a5b71c (Adding unauthorised message when a user tries to acces a page they arent permissioned for)
>>>>>>> main
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

<<<<<<< HEAD
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
=======
<<<<<<< HEAD
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
=======
export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
>>>>>>> 3a5b71c (Adding unauthorised message when a user tries to acces a page they arent permissioned for)
>>>>>>> main
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> main
  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem("users");
    return storedUsers ? JSON.parse(storedUsers) : initialUsers; // ✅ Use imported initialUsers here
  });

<<<<<<< HEAD
=======
=======
>>>>>>> 3a5b71c (Adding unauthorised message when a user tries to acces a page they arent permissioned for)
>>>>>>> main
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> main
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const login = (email: string, password: string) => {
    const foundUser = users.find((u: User & { password: string }) => u.email === email && u.password === password);
<<<<<<< HEAD
=======
=======
  const login = (email: string, password: string) => {
    const foundUser = users.find(u => u.email === email && u.password === password);
>>>>>>> 3a5b71c (Adding unauthorised message when a user tries to acces a page they arent permissioned for)
>>>>>>> main
    if (foundUser) {
      setUser({ email: foundUser.email, role: foundUser.role });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> main
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
<<<<<<< HEAD
=======
=======
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
>>>>>>> 3a5b71c (Adding unauthorised message when a user tries to acces a page they arent permissioned for)
>>>>>>> main
      {children}
    </AuthContext.Provider>
  );
};
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======

// Dummy users data for simplicity
const users = [
  { email: "customer@example.com", password: "customer123", role: "customer" },
  { email: "foodprep@example.com", password: "foodprep123", role: "food-prep-staff" },
  { email: "delivery@example.com", password: "delivery123", role: "delivery-staff" },
];
>>>>>>> 3a5b71c (Adding unauthorised message when a user tries to acces a page they arent permissioned for)
>>>>>>> main
