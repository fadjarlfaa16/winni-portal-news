import { useState, useEffect } from 'react';
import ExploresFilter from './fragments/ExploresFilter';
import { ListOfNews, NewsItem, dummyNews } from './fragments/NewsList';
import { useAuth } from '../context/AuthContext';

interface RealNewsItem {
    _id: string;
    title: string;
    urlImage: string;
    content: string;
    likeCount: number;
    topic: string[];
    status: string;
    author: string;
    created_at: string;
    updated_at: string;
}

const Explore = () => {
    const [searchInput, setSearchInput] = useState('');
    const [searchQuery, setSearchQuery] = useState(''); // new state for "real search"
    const [filteredNews, setFilteredNews] = useState<any[]>([]);
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [appliedGenres, setAppliedGenres] = useState<string[]>([]); // new state for "real filter"
    const [realNews, setRealNews] = useState<RealNewsItem[]>([]);
    const [loading, setLoading] = useState(false);
    const { token } = useAuth();

    // Fetch real news data
    useEffect(() => {
        const fetchNews = async () => {
            if (!token) return;
            
            setLoading(true);
            try {
                const response = await fetch('/api/news', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setRealNews(data);
                    setFilteredNews(data);
                }
            } catch (error) {
                console.error('Failed to fetch news:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, [token]);

    const handleSearchAndFilter = () => {
        let results: any[] = realNews.length > 0 ? realNews : dummyNews;

        if (appliedGenres.length > 0) {
            results = results.filter((news) => {
                const genre = '_id' in news ? (news.topic && news.topic.length > 0 ? news.topic[0] : 'General') : news.genre;
                return appliedGenres.includes(genre);
            });
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
                        {loading ? (
                            <div className="flex items-center justify-center py-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            </div>
                        ) : filteredNews.length > 0 ? (
                            <ListOfNews news={filteredNews} />
                        ) : (
                            <div className="text-center text-gray-500">Not Found</div>
                        )}
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
