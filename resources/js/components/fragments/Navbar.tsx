const Navbar = () => {
    return (
        <div className="flex h-15 items-center justify-between bg-black px-4">
            <div className="logo">
                <h2 className="font-sans font-extrabold text-white">WinniNews</h2>
            </div>
            <div className="profile">
                <a href="#" className="font-extrabold text-white">
                    Login
                </a>
            </div>
        </div>
    );
};

export default Navbar;
