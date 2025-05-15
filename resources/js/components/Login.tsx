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
        <div className="relative h-screen w-screen overflow-hidden bg-white">
            <div className="flex h-full lg:flex">
                {/* Left Side (Image) */}
                <div className="hidden w-1/2 items-end justify-center overflow-hidden bg-[#4d81a9] lg:flex">
                    <div className="w-full overflow-hidden">
                        <img
                            src={Pers}
                            alt="Pers"
                            className="w-full max-w-full origin-center object-contain transition-transform duration-300 ease-in-out hover:scale-102"
                            style={{ willChange: 'transform' }}
                        />
                    </div>
                </div>

                {/* Right Side (Form) */}
                <div className="hidden w-1/2 flex-shrink-0 items-center justify-center bg-white lg:flex">
                    <div className="w-full max-w-md px-4">
                        <SignInForm email={email} password={password} setEmail={setEmail} setPassword={setPassword} handleSubmit={handleSubmit} />
                    </div>
                </div>
            </div>

            {/* Mobile View */}
            <div className="absolute inset-0 z-0 flex items-end justify-center overflow-hidden bg-[#4d81a9] lg:hidden">
                <img src={Pers} alt="Pers" className="w-full max-w-full object-contain" />
            </div>
            <div className="relative z-10 flex h-full w-full items-center justify-center px-4 lg:hidden">
                <SignInForm email={email} password={password} setEmail={setEmail} setPassword={setPassword} handleSubmit={handleSubmit} />
            </div>
        </div>
    );
};

export default LoginPage;
