import {createContext, Dispatch} from 'react';

interface UserAuthContextType {
    loggedIn: boolean;
    setLoggedIn: Dispatch<React.SetStateAction<boolean>>;
    role: string;
    setRole: Dispatch<React.SetStateAction<string>>;
}

export const UserAuthContext = createContext<UserAuthContextType>({} as UserAuthContextType);