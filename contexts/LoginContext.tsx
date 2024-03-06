import Cookies from 'js-cookie';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface LoginContextType {
    isLogin: boolean;
    setLogin: (value: boolean) => void;
}

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export const LoginProvider: React.FC = ({ children }) => {
    const [isLogin, setLogin] = useState(false);
    const CRD = Cookies.get('CRD');
    useEffect(() => {
        if(CRD){
            setLogin(true);
        }else{
            setLogin(false);
        }
    },[])
    return(
        <LoginContext.Provider value={{isLogin, setLogin}}>
            {children}
        </LoginContext.Provider>
    );
};

export const useLogin = () => {
    const context = useContext(LoginContext);
    if(context === undefined){
        throw new Error("useLogin must be used within a LoginProvider");
    }
    return context;
}