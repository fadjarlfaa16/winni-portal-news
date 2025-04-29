import { useAuth } from '@/context/AuthContext';
import { useEffect, useRef, useState } from 'react';
import AuthModal from './AuthModal';

const Navbar = () => {
    const { isAuthenticated, userName, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const [openAuthModal, setOpenAuthModal] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const handleLogout = () => {
        logout();
        setMenuOpen(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
            setMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <div className="relative flex h-15 items-center justify-between bg-black px-4">
                <div className="logo">
                    <h2 className="font-sans font-extrabold text-white">WinniNews</h2>
                </div>

                <div className="profile relative">
                    {!isAuthenticated ? (
                        <button
                            onClick={() => setOpenAuthModal(true)} // <--- Ini modal, bukan menuOpen
                            className="font-extrabold text-white hover:underline"
                        >
                            Login
                        </button>
                    ) : (
                        <div className="relative">
                            <button
                                onClick={() => setMenuOpen(!menuOpen)} // <--- Ini dropdown user
                                className="font-bold text-white hover:underline"
                            >
                                {userName}
                            </button>

                            {menuOpen && (
                                <div
                                    ref={menuRef}
                                    className="ring-opacity-5 absolute right-0 z-50 mt-2 w-40 rounded-md bg-white py-2 shadow-lg ring-1 ring-black"
                                >
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {openAuthModal && <AuthModal onClose={() => setOpenAuthModal(false)} />}
        </>
    );
};

export default Navbar;
