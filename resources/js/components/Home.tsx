import Carousel from './fragments/Carousel';
import NewsList from './fragments/NewsList';
import TrendingTopics from './fragments/TrendingTopics';

const Home = () => {
    return (
        <>
            <Carousel />
            <div className="text-left">
                <h1 className="text- mt-2 px-4 py-1 font-extrabold md:text-2xl">Latest Post</h1>
            </div>
            <div className="mx-auto max-w-6xl px-4">
                <div className="flex flex-col lg:flex-row gap-4 items-start w-full">
                    <div className="flex-1 w-full">
                        <NewsList />
                    </div>
                    <div className="w-full lg:w-[320px] xl:w-[360px] shrink-0">
                        <TrendingTopics />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
