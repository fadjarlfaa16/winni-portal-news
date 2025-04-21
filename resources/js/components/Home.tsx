import Carousel from './fragments/Carousel';
import NewsList from './fragments/NewsList';

const Home = () => {
    return (
        <>
            <Carousel></Carousel>
            <div className="text-left">
                <h1 className="p-5 font-sans text-[20pt] font-extrabold underline">Latest Post</h1>
            </div>
            <NewsList />
        </>
    );
};

export default Home;
