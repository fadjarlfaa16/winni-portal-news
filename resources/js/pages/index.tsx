import AuthPage from '@/components/AuthPage';
import Community from '@/components/Community';
import Explore from '@/components/Explore';
import Home from '@/components/Home';
import NewsPlaceholder from '@/components/NewsPlaceholder';
import WriterDashboard from '@/components/WriterDashboard';
import { AuthProvider } from '@/context/AuthContext';
import { ToastProvider } from '@/context/Toast';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MainLayout from './MainLayout';
import Profile from '@/components/Profile';

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
                            <Route path="/writer-dashboard" element={<WriterDashboard />} />
                            <Route path="explore" element={<Explore />} />
                            <Route path="community" element={<Community />} />
                            <Route path="/news/:id" element={<NewsPlaceholder />} />
                            <Route path='/profile' element={<Profile />} />
                        </Route>
                    </Routes>
                </Router>
            </AuthProvider>
        </ToastProvider>
    );
}
