import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import axios from 'axios';

interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (userData: User) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const isAuthenticated = !!user;

    useEffect(() => {
        axios.get('/profile', { withCredentials: true })
            .then((response) => setUser(response.data))
            .catch(() => setUser(null));
    }, []);

    const login = (userData: User) => {
        setUser(userData);
    };

    const logout = () => {
        axios.post('/logout', {}, { withCredentials: true })
            .then(() => setUser(null))
            .catch((err) => console.error('Logout error:', err));
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};