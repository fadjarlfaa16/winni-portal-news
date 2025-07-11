import { useState, useEffect } from 'react';
import ExploresFilter from './fragments/ExploresFilter';
import { ListOfNews } from './fragments/NewsList';

interface RealNewsItem {
    id: string;
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
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredNews, setFilteredNews] = useState<RealNewsItem[]>([]);
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [appliedGenres, setAppliedGenres] = useState<string[]>([]);
    const [realNews, setRealNews] = useState<RealNewsItem[]>([]);
    const [topics, setTopics] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    // Fetch news (published only, public)
    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/news', {
                    headers: { 'Content-Type': 'application/json' },
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
    }, []);

    // Fetch topics
    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const response = await fetch('/api/topics', {
                    headers: { 'Content-Type': 'application/json' },
                });
                if (response.ok) {
                    const data = await response.json();
                    // data bisa array of object, ambil nama/topik
                    setTopics(Array.isArray(data) ? data.map((t: any) => t.name || t) : []);
                }
            } catch (error) {
                console.error('Failed to fetch topics:', error);
            }
        };
        fetchTopics();
    }, []);

    // Filtering logic
    useEffect(() => {
        let results = [...realNews];
        // Filter by topic
        if (appliedGenres.length > 0) {
            results = results.filter(news =>
                news.topic && news.topic.some(t => appliedGenres.includes(t))
            );
        }
        // Search by title only
        if (searchQuery.trim() !== '') {
            results = results.filter(news =>
                news.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        setFilteredNews(results);
    }, [searchQuery, appliedGenres, realNews]);

    const handleSearchButtonClick = () => {
        setSearchQuery(searchInput);
    };

    const handleApplyFilterButtonClick = () => {
        setAppliedGenres(selectedGenres);
    };

    return (
        <div className="p-6">
            <div className="mb-6 flex items-center justify-center gap-2">
                <input
                    type="text"
                    placeholder="Search news by title..."
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
                            topics={topics}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Explore;
