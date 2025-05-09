import AuthPage from '@/components/AuthPage';
import Community from '@/components/Community';
import Explore from '@/components/Explore';
import Home from '@/components/Home';
import { AuthProvider } from '@/context/AuthContext';
import { ToastProvider } from '@/context/Toast';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MainLayout from './MainLayout';

export default function Index() {
    return (
        <ToastProvider>
            <AuthProvider>
                <Router>
                    <Routes>
                        <Route path="/login" element={<AuthPage />} />
                        <Route path="/register" element={<AuthPage />} />
                        <Route path="/" element={<MainLayout />}>
                            <Route index element={<Home />} />
                            <Route path="explore" element={<Explore />} />
                            <Route path="community" element={<Community />} />
                        </Route>
                    </Routes>
                </Router>
            </AuthProvider>
        </ToastProvider>
    );
}
