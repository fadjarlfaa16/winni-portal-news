import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useOutsideClick from '../../hooks/useOutsideClicks';

interface ProfileBarProps {
    isAuthenticated: boolean;
    userName: string | null;
    logout: () => void;
    isVerified?: boolean;
}

const ProfileBar = ({ isAuthenticated, userName, logout, isVerified }: ProfileBarProps) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const [profilePath, setProfilePath] = useState<string | null>(null);

    useOutsideClick(menuRef, () => setMenuOpen(false));

    useEffect(() => {
        // Ambil profilePath dari localStorage (disimpan saat update profile)
        const profile = localStorage.getItem('profile');
        if (profile) {
            try {
                const parsed = JSON.parse(profile);
                setProfilePath(parsed.profilePath || null);
            } catch {
                setProfilePath(null);
            }
        } else {
            setProfilePath(null);
        }
    }, [isAuthenticated]);

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
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="flex items-center gap-3 group focus:outline-none"
                        aria-label="Open profile menu"
                    >
                        <div className="">
                            {profilePath ? (
                                <img
                                    className="h-10 w-10 rounded-full object-cover border-2 border-white shadow-md group-hover:ring-2 group-hover:ring-blue-400 transition-all duration-200"
                                    src={profilePath}
                                    alt="Profile"
                                    onError={e => (e.currentTarget.src = 'https://ui-avatars.com/api/?name=User&background=ddd&color=555')}
                                />
                            ) : (
                                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-2xl text-gray-400 border-2 border-white shadow-md group-hover:ring-2 group-hover:ring-blue-400 transition-all duration-200">
                                    <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14c3.866 0 7 1.343 7 3v2H5v-2c0-1.657 3.134-3 7-3zm0-2a4 4 0 100-8 4 4 0 000 8z" />
                                    </svg>
                                </div>
                            )}
                        </div>
                        <div className="hidden sm:block text-right">
                            <div className="font-semibold text-white text-base leading-tight group-hover:text-blue-200 transition-colors duration-200">
                                {userName}
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
