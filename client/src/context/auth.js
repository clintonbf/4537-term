import {createContext, useContext, userContext } from 'react'; 

export const AuthContext = createContext(); 

export function useAuth(){
    return useContext(AuthContext); 
}
