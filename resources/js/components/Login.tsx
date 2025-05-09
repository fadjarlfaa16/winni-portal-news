import { API_BASE_URL } from '@/config/api';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Pers from '../../../public/images/Pers1.png';
import SignInForm from './fragments/LogInForm';

const LoginPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch(`${API_BASE_URL}/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (data.token) {
            const meRes = await fetch(`${API_BASE_URL}/api/me`, {
                headers: { Authorization: `Bearer ${data.token}` },
            });

            const meData = await meRes.json();
            login(data.token, meData.name || 'Unknown');
            navigate('/');
        } else {
            alert('Login failed');
        }
    };

    return (
        <div className="relative h-screen w-screen bg-white lg:flex">
            {/* ✅ KIRI - DESKTOP */}
            <div className="hidden items-end justify-center bg-[#4d81a9] lg:flex lg:w-1/2">
                <img src={Pers} alt="Pers" className="w-[95%] max-w-[750px] min-w-[450px] object-contain duration-200 ease-in-out hover:scale-105" />
            </div>

            {/* ✅ KANAN - DESKTOP */}
            <div className="hidden items-center justify-center bg-white lg:flex lg:w-1/2">
                <SignInForm email={email} password={password} setEmail={setEmail} setPassword={setPassword} handleSubmit={handleSubmit} />
            </div>

            {/* ✅ MOBILE/TABLET - FULL BACKGROUND + GAMBAR */}
            <div className="absolute inset-0 z-0 flex items-end justify-center bg-[#4d81a9] lg:hidden">
                <img src={Pers} alt="Pers" className="w-[95%] max-w-[650px] object-contain lg:hidden" />
            </div>
            <div className="relative z-10 flex h-full w-full items-center justify-center px-4 lg:hidden">
                <SignInForm email={email} password={password} setEmail={setEmail} setPassword={setPassword} handleSubmit={handleSubmit} />{' '}
            </div>
        </div>
    );
};

export default LoginPage;
