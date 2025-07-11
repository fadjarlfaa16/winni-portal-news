import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useState, useEffect } from 'react';

interface NewsItem {
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

export const ListOfNews = ({ news }: { news?: NewsItem[] }) => {
    const [realNews, setRealNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(false);
    const { token } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (news) return; // jika news dari props, tidak fetch
        const fetchNews = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/news', {
                    headers: { 'Content-Type': 'application/json' },
                });
                if (response.ok) {
                    const data = await response.json();
                    setRealNews(data);
                }
            } catch (error) {
                console.error('Failed to fetch news:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, [news]);

    const handleNewsClick = (item: NewsItem) => {
        navigate(`/news/${item.id}`);
    };

    const newsToDisplay = news || realNews;

    if (loading) {
        return (
            <div className="w-full flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="w-full">
            {newsToDisplay.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    No news available
                </div>
            ) : (
                newsToDisplay.map((item) => (
                    <div
                        key={item.id}
                        className="flex overflow-hidden rounded-lg bg-white md:flex-row cursor-pointer mb-4"
                        onClick={() => handleNewsClick(item)}
                    >
                        <div className="mt-[-15px] max-h-[180px] w-full content-center items-center md:w-[40%]">
                            <img src={item.urlImage || 'https://via.placeholder.com/120x400'} alt={item.title} className="w-full object-cover py-4 md:h-full" />
                        </div>
                        <div className="mt-[-15px] flex w-full flex-col content-center items-center justify-center px-4 pl-2 text-left md:w-[50%]">
                            <div>
                                <h3 className="w-full text-[8.5pt] font-bold text-gray-800 transition-colors hover:text-blue-600 md:text-lg lg:mb-2">
                                    {item.title}
                                </h3>
                                <div className="text-[7pt] text-gray-500 md:text-sm lg:mb-2">
                                    By <span className="font-semibold">{item.author}</span> • {new Date(item.created_at).toLocaleDateString()} •{' '}
                                    <span>{item.topic && item.topic.length > 0 ? item.topic[0] : 'General'}</span>
                                </div>
                                <p className="line-clamp-3 text-[7pt] text-gray-700 md:text-sm">{item.content}</p>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

const NewsList = () => (
    <div className="w-full">
        <ListOfNews />
    </div>
);

export default NewsList;
