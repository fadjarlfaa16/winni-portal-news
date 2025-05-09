import { API_BASE_URL } from '@/config/api';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Pers from '../../../public/images/Pers1.png';
import SignInForm from './fragments/LogInForm';
import RegisterForm from './fragments/RegisterForm';

const AuthPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const isRegister = location.pathname === '/register';

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const endpoint = isRegister ? '/api/register' : '/api/login';

        if (isRegister && password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }

        const body = isRegister ? { name, email, password } : { email, password };

        const res = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        const data = await res.json();

        if (data.token) {
            if (!isRegister) {
                const meRes = await fetch(`${API_BASE_URL}/api/me`, {
                    headers: { Authorization: `Bearer ${data.token}` },
                });
                const meData = await meRes.json();
                login(data.token, meData.name || 'Unknown');
            } else {
                login(data.token, name || 'Unknown');
            }
            navigate('/');
        } else {
            alert(`${isRegister ? 'Register' : 'Login'} failed`);
        }
    };

    return (
        <div className="relative h-screen w-screen bg-white lg:flex">
            {/* KIRI */}
            <div className="hidden items-end justify-center bg-[#4d81a9] lg:flex lg:w-1/2">
                <img src={Pers} alt="Pers" className="w-[95%] max-w-[750px] min-w-[450px] object-contain duration-200 ease-in-out hover:scale-105" />
            </div>

            {/* KANAN */}
            <div className="hidden items-center justify-center bg-white lg:flex lg:w-1/2">
                {isRegister ? (
                    <RegisterForm
                        name={name}
                        email={email}
                        password={password}
                        confirmPassword={confirmPassword}
                        setName={setName}
                        setEmail={setEmail}
                        setPassword={setPassword}
                        setConfirmPassword={setConfirmPassword}
                        handleSubmit={handleSubmit}
                    />
                ) : (
                    <SignInForm email={email} password={password} setEmail={setEmail} setPassword={setPassword} handleSubmit={handleSubmit} />
                )}
            </div>

            {/* MOBILE */}
            <div className="absolute inset-0 z-0 flex items-end justify-center bg-[#4d81a9] lg:hidden">
                <img src={Pers} alt="Pers" className="w-[95%] max-w-[650px] object-contain lg:hidden" />
            </div>
            <div className="relative z-10 flex h-full w-full items-center justify-center px-4 lg:hidden">
                {isRegister ? (
                    <RegisterForm
                        name={name}
                        email={email}
                        password={password}
                        confirmPassword={confirmPassword}
                        setName={setName}
                        setEmail={setEmail}
                        setPassword={setPassword}
                        setConfirmPassword={setConfirmPassword}
                        handleSubmit={handleSubmit}
                    />
                ) : (
                    <SignInForm email={email} password={password} setEmail={setEmail} setPassword={setPassword} handleSubmit={handleSubmit} />
                )}
            </div>
        </div>
    );
};

export default AuthPage;
