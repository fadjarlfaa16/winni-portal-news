export interface NewsItem {
    id: number;
    author: string;
    title: string;
    content: string;
    timestamp: string;
    genre: string;
    imageUrl?: string;
}

export const dummyNews: NewsItem[] = [
    {
        id: 1,
        author: 'Andi Saputra',
        title: 'Pembaruan Teknologi AI di Tahun 2025',
        genre: 'Technology',
        content:
            'Model kecerdasan buatan generasi terbaru diluncurkan tahun ini, membawa kemampuan analisis konteks, prediksi, dan kreativitas ke level yang belum pernah ada sebelumnya. Industri AI diprediksi tumbuh pesat dalam berbagai sektor seperti kesehatan, keuangan, dan pendidikan.',
        timestamp: '2025-04-20T09:15:00Z',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLk70QNBf9Gc9z_69E5mBPuIuVuJ4k1aWTzg&s',
    },
    {
        id: 2,
        author: 'Siti Nurhaliza',
        title: 'Perkembangan Ekonomi Digital Indonesia',
        genre: 'Financial and Economy',
        content:
            'Ekonomi digital Indonesia menunjukkan pertumbuhan signifikan di kuartal kedua 2025. Sektor e-commerce, layanan keuangan digital, dan startup teknologi menjadi pendorong utama, membuka lebih banyak peluang kerja dan meningkatkan inklusi keuangan di seluruh nusantara.',
        timestamp: '2025-04-19T14:30:00Z',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLk70QNBf9Gc9z_69E5mBPuIuVuJ4k1aWTzg&s',
    },
    {
        id: 3,
        author: 'Budi Wijaya',
        title: 'Tips Sehat Bersepeda di Musim Hujan',
        genre: 'Health',
        content:
            'Bersepeda di musim hujan tetap aman dan menyenangkan dengan persiapan yang tepat. Gunakan jas hujan ringan, pastikan rem sepeda berfungsi optimal, serta pilih ban dengan daya cengkeram kuat untuk menghindari selip di jalanan basah.',
        timestamp: '2025-04-18T07:45:00Z',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLk70QNBf9Gc9z_69E5mBPuIuVuJ4k1aWTzg&s',
    },
];

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useState, useEffect } from 'react';

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

export const ListOfNews = ({ news }: { news?: NewsItem[] }) => {
    const [realNews, setRealNews] = useState<RealNewsItem[]>([]);
    const [loading, setLoading] = useState(false);
    const { token } = useAuth();
    const navigate = useNavigate();
    
    // Use provided news or fetch from API
    const displayNews = news ?? dummyNews;

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
                }
            } catch (error) {
                console.error('Failed to fetch news:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, [token]);

    const handleNewsClick = (item: NewsItem | RealNewsItem) => {
        // Use _id for real news, id for dummy news
        const newsId = '_id' in item ? item._id : item.id;
        navigate(`/news/${newsId}`);
    };

    // Use real news if available, otherwise fall back to provided news or dummy news
    const newsToDisplay = realNews.length > 0 ? realNews : displayNews;

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
                newsToDisplay.map((item) => {
                    const isRealNews = '_id' in item;
                    const key = isRealNews ? item._id : item.id;
                    const imageUrl = isRealNews ? item.urlImage : item.imageUrl;
                    const author = isRealNews ? item.author : item.author;
                    const timestamp = isRealNews ? item.created_at : item.timestamp;
                    const genre = isRealNews ? (item.topic && item.topic.length > 0 ? item.topic[0] : 'General') : item.genre;
                    
                    return (
                        <div 
                            key={key} 
                            className="flex overflow-hidden rounded-lg bg-white md:flex-row cursor-pointer hover:shadow-md transition-all duration-200 mb-4"
                            onClick={() => handleNewsClick(item)}
                        >
                            {imageUrl && (
                                <div className="mt-[-15px] max-h-[180px] w-full content-center items-center md:w-[40%]">
                                    <img src={imageUrl} alt={item.title} className="w-full object-cover py-4 md:h-full" />
                                </div>
                            )}
                            <div className="mt-[-15px] flex w-full flex-col content-center items-center justify-center px-4 pl-2 text-left md:w-[50%]">
                                <div>
                                    <h3 className="w-full text-[8.5pt] font-bold text-gray-800 transition-colors hover:text-blue-600 md:text-lg lg:mb-2">
                                        {item.title}
                                    </h3>
                                    <div className="text-[7pt] text-gray-500 md:text-sm lg:mb-2">
                                        By <span className="font-semibold">{author}</span> • {new Date(timestamp).toLocaleDateString()} •{' '}
                                        <span>{genre}</span>
                                    </div>
                                    <p className="line-clamp-3 text-[7pt] text-gray-700 md:text-sm">{item.content}</p>
                                </div>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
};

const NewsList = () => (
    <div className="mx-auto max-w-[800px]">
        <ListOfNews />
    </div>
);

export default NewsList;
