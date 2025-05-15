import React from 'react';
import { useNavigate } from 'react-router-dom';

interface UserProfile {
    fullname: string;
    profilePath: string;
    birth: Date;
    domicile: string;
}

interface RegisterFormProps {
    email: string;
    password: string;
    username: string;
    profile?: UserProfile;
    isVerified: boolean;
    confirmPassword: string;
    setUsername: (value: string) => void;
    setEmail: (value: string) => void;
    setPassword: (value: string) => void;
    setConfirmPassword: (value: string) => void;
    setProfile?: (value: UserProfile) => void;
    setIsVerified: (value: boolean) => void;
    handleSubmit: (e: React.FormEvent) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
    username,
    email,
    password,
    confirmPassword,
    setUsername,
    setEmail,
    setPassword,
    setIsVerified,
    setConfirmPassword,
    handleSubmit,
}) => {
    const navigate = useNavigate();

    return (
        <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="John Doe"
                        className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                </div>
                <button type="submit" className="w-full rounded-md bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700">
                    Create account
                </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
                Already have an account?{' '}
                <button
                    type="button"
                    onClick={() => navigate('/login', { state: { from: 'register' } })}
                    className="font-medium text-blue-600 hover:underline"
                >
                    Login
                </button>
            </p>
        </div>
    );
};

export default RegisterForm;
