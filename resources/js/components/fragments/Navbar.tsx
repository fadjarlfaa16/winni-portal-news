import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import AuthModal from './AuthModal';
import ProfileBar from './ProfileBar';

const Navbar = () => {
    const [openAuthModal, setOpenAuthModal] = useState(false);
    const { isAuthenticated, userName, logout } = useAuth();

    return (
        <>
            <div className="relative flex h-15 items-center justify-between bg-black px-4">
                <div className="logo">
                    <h2 className="font-sans font-extrabold text-white">WinniNews</h2>
                </div>

                <ProfileBar isAuthenticated={isAuthenticated} userName={userName} logout={logout} setOpenAuthModal={setOpenAuthModal} />
            </div>

            {openAuthModal && <AuthModal onClose={() => setOpenAuthModal(false)} />}
        </>
    );
};

export default Navbar;
