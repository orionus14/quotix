import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import axios from 'axios';

interface Message {
    _id: string;
    chatId: string;
    text: string;
    senderType: 'user' | 'api';
    createdAt: string;
}

interface Chat {
    lastName: any;
    firstName: any;
    _id: string;
    user: string;
    messages: Message[];
    createdAt: string;
    updatedAt: string;
}

interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    chats: Chat[];
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (userData: User) => void;
    logout: () => void;
    getChats: () => Chat[];
    addChat: (newChat: Chat) => void;
    updateChat: (updatedChat: Chat) => void;
    deleteChat: (chatId: string) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const isAuthenticated = !!user;

    useEffect(() => {
        axios.get('/profile', { withCredentials: true })
            .then(response => {
                const { userId, firstName, lastName, email, chats } = response.data;
                setUser({
                    id: userId,
                    firstName,
                    lastName,
                    email,
                    chats,
                });
            })
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

    const getChats = () => {
        return user?.chats || [];
    };

    const addChat = (newChat: Chat) => {
        setUser((prevUser) => {
            if (!prevUser) return prevUser;
            return { ...prevUser, chats: [...prevUser.chats, newChat] };
        });
    };

    const updateChat = (updatedChat: Chat) => {
        setUser((prevUser) => {
            if (!prevUser) return prevUser;
            const updatedChats = prevUser.chats.map(chat =>
                chat._id === updatedChat._id ? updatedChat : chat
            );
            return { ...prevUser, chats: updatedChats };
        });
    };

    const deleteChat = async (chatId: string) => {
        try {
            const response = await axios.delete(`/chat/${chatId}`, { withCredentials: true });
            
            if (response.status === 200) {
                setUser((prevUser) => {
                    if (!prevUser) return prevUser;
                    return {
                        ...prevUser,
                        chats: prevUser.chats.filter((chat) => chat._id !== chatId),
                    };
                });
                console.log("Chat deleted successfully");
            }
        } catch (error) {
            console.error("Failed to delete chat", error);
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            login,
            logout,
            getChats,
            addChat,
            updateChat,
            deleteChat
        }}>
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