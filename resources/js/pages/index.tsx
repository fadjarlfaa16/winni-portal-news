import Content from '@/components/fragments/Content';
import Navbar from '@/components/fragments/Navbar';
import Navigation from '@/components/fragments/Navigation';
import Home from '@/components/Home';
import { Head } from '@inertiajs/react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

export default function Index() {
    return (
        <Router>
            <Head title="WinniNews - Platform Berita Terpercaya">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <Navbar></Navbar>
            <Content>
                <Navigation></Navigation>
                <div className="">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        {/* <Route path="/explore" element={<Explore />} />
                    <Route path="/community" element={<Community />} /> */}
                    </Routes>
                </div>
            </Content>
        </Router>
    );
}
