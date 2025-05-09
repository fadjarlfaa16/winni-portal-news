import Content from '@/components/fragments/Content';
import Navbar from '@/components/fragments/Navbar';
import Navigation from '@/components/fragments/Navigation';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <>
            <Navbar />
            <Content>
                <Navigation />
                <Outlet />
            </Content>
        </>
    );
};

export default MainLayout;
