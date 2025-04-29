import { createContext, useContext, useState } from 'react';
import { useToast } from './Toast';

interface AuthContextType {
    isAuthenticated: boolean;
    token: string | null;
    userName: string | null;
    login: (token: string, userName: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    token: null,
    userName: null,
    login: () => {},
    logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { showToast } = useToast();
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [userName, setUserName] = useState<string | null>(localStorage.getItem('userName'));

    const login = (newToken: string, user: string) => {
        setToken(newToken);
        setUserName(user);
        localStorage.setItem('token', newToken);
        localStorage.setItem('userName', user);
        showToast('Login berhasil!'); // ✅ show toast
    };

    const logout = () => {
        setToken(null);
        setUserName(null);
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        showToast('Logout berhasil!');
    };

    return <AuthContext.Provider value={{ isAuthenticated: !!token, token, userName, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
