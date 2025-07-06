import { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './Toast';

interface AuthContextType {
    isAuthenticated: boolean;
    token: string | null;
    userName: string | null;
    isVerified: boolean;
    login: (token: string, userName: string, isVerified: boolean) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    token: null,
    userName: null,
    isVerified: false,
    login: () => {},
    logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { showToast } = useToast();
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [userName, setUserName] = useState<string | null>(localStorage.getItem('userName'));
    const [isVerified, setIsVerified] = useState<boolean>(localStorage.getItem('isVerified') === 'true');

    // Sync state with localStorage on mount
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUserName = localStorage.getItem('userName');
        const storedIsVerified = localStorage.getItem('isVerified');
        if (storedToken && storedUserName) {
            setToken(storedToken);
            setUserName(storedUserName);
            setIsVerified(storedIsVerified === 'true');
        }
    }, []);

    // Debug logging
    useEffect(() => {
        console.log('AuthContext loaded:', { token, userName, isVerified });
    }, [token, userName, isVerified]);

    const login = (newToken: string, user: string, verified: boolean) => {
        setToken(newToken);
        setUserName(user);
        setIsVerified(verified);
        localStorage.setItem('token', newToken);
        localStorage.setItem('userName', user);
        localStorage.setItem('isVerified', String(verified));
        showToast('Login berhasil!');
    };

    const logout = () => {
        setToken(null);
        setUserName(null);
        setIsVerified(false);
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        localStorage.removeItem('isVerified');
        showToast('Logout berhasil!');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!token, token, userName, isVerified, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);