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
                <div className="flex flex-row gap-4">
                    {/* NewsList */}
                    <div className="mt-10">
                        <NewsList />
                    </div>

                    {/* Trending Topics */}
                    <div className="w-[100px] sm:w-[120px] md:w-[160px] lg:w-[180px]">
                        <TrendingTopics />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
