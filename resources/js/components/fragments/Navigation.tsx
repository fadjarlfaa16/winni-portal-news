import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

interface NavItem {
    name: string;
    path: string;
}

const navItems: NavItem[] = [
    { name: 'Home', path: '/' },
    { name: 'Explore', path: '/explore' },
    { name: 'Community', path: '/community' },
    { name: 'Profile', path: '/profile' },
];

export default function Navigation() {
    const location = useLocation();
    const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
    // Create an array of refs for the nav items.
    const navRefs = useRef<(HTMLAnchorElement | null)[]>([]);

    useEffect(() => {
        // Determine the active nav item based on the current pathname.
        const activeIndex = navItems.findIndex((item) => item.path === location.pathname);
        if (activeIndex === -1) return;
        const activeLink = navRefs.current[activeIndex];
        if (activeLink) {
            setUnderlineStyle({
                left: activeLink.offsetLeft,
                width: activeLink.offsetWidth,
            });
        }
    }, [location.pathname]);
    return (
        <nav className="flex w-full justify-between px-5 py-3">
            <ul className="relative flex justify-center space-x-6 text-gray-700">
                {navItems.map((item, index) => (
                    <li key={item.name}>
                        <NavLink
                            to={item.path}
                            ref={(el) => {
                                navRefs.current[index] = el;
                            }}
                            className={({ isActive }) => (isActive ? 'font-semibold text-black' : 'hover:text-gray-900')}
                        >
                            {item.name}
                        </NavLink>
                    </li>
                ))}
                {/* Underline element */}
                <div
                    className="absolute bottom-0 h-0.5 bg-gray-900 transition-all duration-300"
                    style={{ left: underlineStyle.left, width: underlineStyle.width }}
                ></div>
            </ul>
        </nav>
    );
}
