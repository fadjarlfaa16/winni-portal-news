import React from 'react';
import { useNavigate } from 'react-router-dom';

interface SignInFormProps {
    email: string;
    password: string;
    setEmail: (value: string) => void;
    setPassword: (value: string) => void;
    handleSubmit: (e: React.FormEvent) => void;
}

const SignInForm: React.FC<SignInFormProps> = ({ email, password, setEmail, setPassword, handleSubmit }) => {
    const navigate = useNavigate();

    return (
        <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900">Get into your Account</h2>
            <p className="mt-1 text-sm text-gray-600">Find out our trending news and community</p>

            <div className="mt-6 flex gap-3">
                <button className="flex-1 rounded-md border border-gray-300 bg-white py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    <span>🔍 Log in with Google</span>
                </button>
                <button className="flex-1 rounded-md border border-gray-300 bg-white py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    <span> Log in with Apple</span>
                </button>
            </div>

            <div className="my-6 flex items-center">
                <div className="h-px flex-1 bg-gray-300" />
                <span className="px-3 text-sm text-gray-400">OR</span>
                <div className="h-px flex-1 bg-gray-300" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="hello@yourcompany.com"
                        className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <a href="#" className="text-sm text-blue-600 hover:underline">
                            Forgot password?
                        </a>
                    </div>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                </div>
                <button type="submit" className="w-full rounded-md bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700">
                    Login
                </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
                Don’t have an account?{' '}
                <button
                    type="button"
                    onClick={() => navigate('/register', { state: { from: 'login' } })}
                    className="font-medium text-blue-600 hover:underline"
                >
                    Register
                </button>
            </p>
        </div>
    );
};

export default SignInForm;
