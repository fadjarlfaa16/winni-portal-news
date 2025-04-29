import { API_BASE_URL } from '@/config/api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_BASE_URL}/api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (data.token) {
                // Get user name after login
                const meRes = await fetch(`${API_BASE_URL}/api/me`, {
                    headers: { Authorization: `Bearer ${data.token}` },
                });
                const meData = await meRes.json();

                login(data.token, meData.name || 'Unknown');
                alert('Login successful!');
                navigate('/community');
            } else {
                alert('Login failed');
            }
        } catch (err) {
            console.error(err);
            alert('Error logging in');
        }
    };

    return (
        <div className="p-8">
            <h2 className="mb-4 text-2xl font-bold">Login</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="rounded border p-2" />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="rounded border p-2"
                />
                <button type="submit" className="rounded bg-blue-500 p-2 text-white hover:bg-blue-600">
                    Login
                </button>
            </form>
        </div>
    );
}
