import Community from '@/components/Community';
import Explore from '@/components/Explore';
import Content from '@/components/fragments/Content';
import Navbar from '@/components/fragments/Navbar';
import Navigation from '@/components/fragments/Navigation';
import Home from '@/components/Home';
import { AuthProvider } from '@/context/AuthContext';
import { ToastProvider } from '@/context/Toast';
import { Head } from '@inertiajs/react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

export default function Index() {
    return (
        <ToastProvider>
            <AuthProvider>
                <Router>
                    <Head title="WinniNews - Platform Berita Terpercaya">
                        <link rel="preconnect" href="https://fonts.bunny.net" />
                        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
                    </Head>
                    <Navbar />
                    <Content>
                        <Navigation />
                        <div>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/explore" element={<Explore />} />
                                <Route path="/community" element={<Community />} />
                            </Routes>
                        </div>
                    </Content>
                </Router>
            </AuthProvider>
        </ToastProvider>
    );
}
