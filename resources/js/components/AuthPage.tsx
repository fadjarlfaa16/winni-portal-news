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

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isVerified, setIsverified] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const endpoint = isRegister ? '/api/register' : '/api/login';

        if (isRegister && password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }

        const body = isRegister
            ? {
                  username,
                  email,
                  password,
                  profile: {
                      fullname: '',
                      profilePath: '',
                      birth: null,
                      domicile: '',
                  },
                  isVerified: false,
              }
            : { email, password };

        try {
            const res = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            const data = await res.json();

            if (res.ok && data.success && data.token) {
                let usernameToUse = data.user.username || 'Unknown';
                let isVerifiedToUse = data.user.is_verified;
                login(data.token, usernameToUse, isVerifiedToUse);

                // Fetch profile and save to localStorage
                try {
                    const profileRes = await fetch(`${API_BASE_URL}/api/profile`, {
                        headers: { Authorization: `Bearer ${data.token}` },
                    });
                    if (profileRes.ok) {
                        const profileData = await profileRes.json();
                        localStorage.setItem('profile', JSON.stringify(profileData));
                    }
                } catch (e) {
                    // ignore error
                }

                navigate('/');
            } else {
                const errorMessage = data.message || data.errors || `${isRegister ? 'Register' : 'Login'} failed`;
                alert(typeof errorMessage === 'object' ? JSON.stringify(errorMessage) : errorMessage);
            }
        } catch (error) {
            console.error('Auth error:', error);
            alert(`Network error: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
                        username={username}
                        email={email}
                        password={password}
                        isVerified={isVerified}
                        confirmPassword={confirmPassword}
                        setUsername={setUsername}
                        setIsVerified={setIsverified}
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
                        username={username}
                        email={email}
                        password={password}
                        isVerified={isVerified}
                        confirmPassword={confirmPassword}
                        setUsername={setUsername}
                        setEmail={setEmail}
                        setPassword={setPassword}
                        setIsVerified={setIsverified}
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
