import React, { createContext, useState, useContext, useEffect } from "react";

type AuthType = {
  isAuth: boolean;
  setisAuth: (value: boolean) => void;
};

const authctx = createContext<AuthType | boolean | undefined>(undefined);
export const useAuth = () => useContext(authctx);

export const AuthProvider = (props: any) => {
  const [isAuth, setisAuth] = useState(store);

  //save auth status to local storage , passed to relevant components and protected route

  useEffect(() => {
    localStorage.setItem("isAuth", JSON.stringify(isAuth));
  }, [isAuth]);

  function store() {
    const savedisAuth = JSON.parse(localStorage.getItem("isAuth")!);
    return savedisAuth || false;
  }

  return (
    <authctx.Provider value={{ isAuth, setisAuth }}>
      {props.children}
    </authctx.Provider>
  );
};
