"use client";
import React, {useEffect, useState} from "react";
import {AuthContext} from "@/app/context/AuthContext";
import {useRouter} from "next/navigation";

function AuthProvider({children}: Readonly<{ children: React.ReactNode; }>) {
  const [email, setEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('user');
    setEmail(user);
  }, []);

  const login = (email : string) => {
    localStorage.setItem('user', email);
    setEmail(email);
    router.push('/');
  }

  const logout = () => {
    setEmail(null);
    localStorage.removeItem('user');
  }

  return (
    <AuthContext.Provider value={{email, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;