import { useState } from 'react';
import ExploresFilter from './fragments/ExploresFilter';
import { ListOfNews, NewsItem, dummyNews } from './fragments/NewsList';

const Explore = () => {
    const [searchInput, setSearchInput] = useState('');
    const [searchQuery, setSearchQuery] = useState(''); // new state for "real search"
    const [filteredNews, setFilteredNews] = useState<NewsItem[]>(dummyNews);
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [appliedGenres, setAppliedGenres] = useState<string[]>([]); // new state for "real filter"

    const handleSearchAndFilter = () => {
        let results = dummyNews;

        if (appliedGenres.length > 0) {
            results = results.filter((news) => appliedGenres.includes(news.genre));
        }

        if (searchQuery.trim() !== '') {
            results = results.filter(
                (news) =>
                    news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    news.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    news.author.toLowerCase().includes(searchQuery.toLowerCase()),
            );
        }

        setFilteredNews(results);
    };

    const handleSearchButtonClick = () => {
        setSearchQuery(searchInput); // Set the "confirmed" search input
        setTimeout(handleSearchAndFilter, 0); // Apply after updating state
    };

    const handleApplyFilterButtonClick = () => {
        setAppliedGenres(selectedGenres); // Set the "confirmed" genre
        setTimeout(handleSearchAndFilter, 0); // Apply after updating state
    };

    return (
        <div className="p-6">
            <div className="mb-6 flex items-center justify-center gap-2">
                <input
                    type="text"
                    placeholder="Search news..."
                    className="w-full max-w-2xl rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
                <button
                    onClick={handleSearchButtonClick}
                    className="rounded-lg bg-blue-600 px-6 py-3 text-sm text-white transition hover:bg-blue-700"
                >
                    Search
                </button>
            </div>

            <div className="mx-auto max-w-6xl px-4">
                <div className="flex flex-row gap-4">
                    <div className="min-w-0 flex-1">
                        {filteredNews.length > 0 ? <ListOfNews news={filteredNews} /> : <div className="text-center text-gray-500">Not Found</div>}
                    </div>

                    <div className="w-[100px] sm:w-[120px] md:w-[160px] lg:w-[180px]">
                        <ExploresFilter
                            selectedGenres={selectedGenres}
                            setSelectedGenres={setSelectedGenres}
                            applyFilter={handleApplyFilterButtonClick}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Explore;
