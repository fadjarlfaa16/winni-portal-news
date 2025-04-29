import { createContext, useContext, useState } from 'react';

interface ToastContextType {
    showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextType>({
    showToast: () => {},
});

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    const [message, setMessage] = useState('');
    const [visible, setVisible] = useState(false);

    const showToast = (text: string) => {
        setMessage(text);
        setVisible(true);
        setTimeout(() => {
            setVisible(false);
        }, 3000); // auto close after 3 seconds
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {visible && (
                <div className="animate-fade-in-out fixed right-6 bottom-6 z-50 rounded-lg bg-green-600 px-6 py-3 text-white shadow-lg transition-all">
                    {message}
                </div>
            )}
        </ToastContext.Provider>
    );
};

export const useToast = () => useContext(ToastContext);
