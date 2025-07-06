import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useOutsideClick from '../../hooks/useOutsideClicks';

interface ProfileBarProps {
    isAuthenticated: boolean;
    userName: string | null;
    logout: () => void;
    // setOpenAuthModal: (value: boolean) => void;
    isVerified?: boolean;
}

const ProfileBar = ({ isAuthenticated, userName, logout, isVerified }: ProfileBarProps) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useOutsideClick(menuRef, () => setMenuOpen(false));

    const handleLogout = () => {
        logout();
        setMenuOpen(false);
    };

    return (
        <div className="profile relative">
            {!isAuthenticated ? (
                <Link to="/login" className="font-bold text-white hover:underline">
                    Sign In
                </Link>
            ) : (
                <div className="relative flex w-full justify-end">
                    <button onClick={() => setMenuOpen(!menuOpen)} className="text-md font-semibold text-white">
                        <div className="flex items-center gap-3 hover:cursor-pointer">
                            <div className="">
                                <img
                                    className="h-9 w-9 rounded-full object-cover"
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLk70QNBf9Gc9z_69E5mBPuIuVuJ4k1aWTzg&s"
                                ></img>
                            </div>
                            <div className="hidden sm:block">
                                <div className="">{userName}</div>
                                <div className="text-left">User</div>
                            </div>
                        </div>
                    </button>

                    {menuOpen && (
                        <div
                            ref={menuRef}
                            className="ring-opacity-1 absolute right-0 z-50 mt-12 w-56 rounded-md bg-white py-3 shadow-lg ring-1 ring-black"
                        >
                            {isVerified && (
                                <button
                                    onClick={() => { setMenuOpen(false); navigate('/writer-dashboard'); }}
                                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Dashboard
                                </button>
                            )}
                            <button onClick={handleLogout} className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                                Settings
                            </button>
                            <button onClick={handleLogout} className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProfileBar;
