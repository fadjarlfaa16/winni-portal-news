import { API_BASE_URL } from '@/config/api';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';

interface AuthModalProps {
    onClose: () => void;
}

const AuthModal = ({ onClose }: AuthModalProps) => {
    const { login } = useAuth();
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const url = isLoginMode ? `${API_BASE_URL}/api/login` : `${API_BASE_URL}/api/register`;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const url = isLoginMode ? `${API_BASE_URL}/api/login` : `${API_BASE_URL}/api/register`;
            const body = isLoginMode ? { email, password } : { name, email, password };

            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            const data = await res.json();
            if (data.token) {
                let userName = '';

                if (isLoginMode) {
                    // GET /api/me dengan Authorization header
                    const meRes = await fetch(`${API_BASE_URL}/api/me`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${data.token}`,
                        },
                    });

                    if (!meRes.ok) {
                        throw new Error('Failed to fetch user profile');
                    }

                    const meData = await meRes.json();
                    userName = meData.name || 'Unknown';
                } else {
                    userName = name || 'Unknown';
                }

                login(data.token, userName);
                alert('Login/Register Successful!');
                onClose(); 
            } else {
                alert('Failed! Please try again.');
            }
        } catch (err) {
            console.error(err);
            alert('Error. Check connection.');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
            <div className="w-[90%] max-w-md rounded-lg bg-white p-6 shadow-lg">
                <h2 className="mb-4 text-2xl font-bold">{isLoginMode ? 'Login' : 'Register'}</h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    {!isLoginMode && (
                        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="rounded border p-2" />
                    )}
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded border p-2" />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="rounded border p-2"
                    />
                    <button type="submit" className="mt-2 rounded-lg bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700">
                        {isLoginMode ? 'Login' : 'Register'}
                    </button>
                </form>

                <div className="mt-4 text-center text-sm">
                    {isLoginMode ? (
                        <>
                            Don't have an account?{' '}
                            <button onClick={() => setIsLoginMode(false)} className="text-blue-600 hover:underline">
                                Register
                            </button>
                        </>
                    ) : (
                        <>
                            Already have an account?{' '}
                            <button onClick={() => setIsLoginMode(true)} className="text-blue-600 hover:underline">
                                Login
                            </button>
                        </>
                    )}
                </div>

                <button onClick={onClose} className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-black">
                    ×
                </button>
            </div>
        </div>
    );
};

export default AuthModal;
