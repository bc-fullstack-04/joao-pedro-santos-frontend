import { UserModel } from "@/models/UserModel";
import { albumApi, userApi } from "@/services/apiService";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface AuthContextModel extends UserModel {
  isAuthenticated: boolean;
  login: (email:string, password:string) => Promise<string | void>;
  logout: () => void;
  register:(email: string, password: string, name: string) => Promise<string | void>;
} 

export const AuthContext = createContext({} as AuthContextModel);

interface Props {
  children: React.ReactNode
}

export const AuthProvider: React.FC<Props> = ({children}) => {
  const [userData, setUserData] = useState<UserModel>();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const data:UserModel = JSON.parse(localStorage.getItem('@Auth.Data') || "{}");
    if(data.id) {
      setIsAuthenticated(true);
      setUserData(data);
    }else{
      Logout();
    }
  }, []);

  const Login = useCallback(async (email: string, password: string) => {
    const respAuth = await userApi.post('/users/auth', {email, password});
    if(respAuth instanceof Error) {
      return respAuth.message;
    }

    userApi.defaults.headers.common.Authorization = `Basic ${respAuth.data.token}`;
    albumApi.defaults.headers.common.Authorization = `Basic ${respAuth.data.token}`;
    const respUserInfo = await userApi.get(`/users/${respAuth.data.id}`);
    if(respUserInfo instanceof Error) {
      return respUserInfo.message;
    }

    localStorage.setItem('@Auth.Data', JSON.stringify(respUserInfo.data));
    localStorage.setItem('@Auth.Token', JSON.stringify(respAuth.data.token));
    setIsAuthenticated(true);
    setUserData(respUserInfo.data);
  }, []);
  
  
  const Logout = useCallback(() => {
    localStorage.removeItem('@Auth.Data');
    localStorage.removeItem('@Auth.Token');
    setUserData(undefined);
    setIsAuthenticated(false);
    return <Navigate to='/'/>
  }, []);

  const Register = useCallback( async(email:string, password: string, name: string) => {
    const resp = await userApi.post('/users/create', {email, name, password});
    if(resp instanceof Error) {
      return resp.message;
    }
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, ...userData, login: Login, logout: Logout, register: Register}}>
      {children}
    </AuthContext.Provider>
  );
};

