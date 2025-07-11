import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

const PLACEHOLDER = '';

export default function Carousel() {
    const [newsList, setNewsList] = useState<any[]>([]);
    const [index, setIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        // Fetch news from API
        fetch('/api/news')
            .then(res => res.json())
            .then(data => setNewsList(data.slice(0, 6))) // tampilkan max 6 berita
            .catch(() => setNewsList([]));
    }, []);

    useEffect(() => {
        if (newsList.length === 0) return;
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % newsList.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [newsList]);

    const moveSlide = (step: number) => {
        if (isAnimating || newsList.length === 0) return;
        setIsAnimating(true);
        setIndex((prev) => (prev + step + newsList.length) % newsList.length);
        setTimeout(() => setIsAnimating(false), 800);
    };

    const goToSlide = (slideIndex: number) => {
        if (isAnimating || slideIndex === index || newsList.length === 0) return;
        setIsAnimating(true);
        setIndex(slideIndex);
        setTimeout(() => setIsAnimating(false), 800);
    };

    return (
        <div className="relative h-[45vh] w-full overflow-hidden md:h-[380px]">
            <div
                className="flex h-full w-full"
                style={{
                    transform: `translateX(-${index * 100}%)`,
                    transition: 'transform 0.8s ease-in-out',
                }}
            >
                {newsList.length === 0 ? (
                    // Placeholder jika belum ada berita
                    <div className="h-full w-full flex items-center justify-center bg-gray-200">
                        <span className="text-gray-400 text-xl">Tidak ada berita</span>
                    </div>
                ) : (
                    newsList.map((news, i) => (
                        <div key={i} className="relative h-full w-full flex-shrink-0">
                            {news.urlImage ? (
                                <img
                                    src={news.urlImage}
                                    alt={news.title}
                                    className="h-full w-full object-cover object-center"
                                    style={{ minHeight: '100%', minWidth: '100%' }}
                                    onError={e => (e.currentTarget.src = PLACEHOLDER)}
                                />
                            ) : (
                                <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                                    <span className="text-gray-400">No Image</span>
                                </div>
                            )}
                            {/* Overlay judul */}
                            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent px-6 py-4">
                                <h2 className="text-white text-lg md:text-2xl font-bold truncate drop-shadow-lg" title={news.title}>{news.title}</h2>
                            </div>
                        </div>
                    ))
                )}
            </div>
            {newsList.length > 1 && (
                <>
                    <button
                        onClick={() => moveSlide(-1)}
                        className="absolute top-1/2 left-4 -translate-y-1/2 rounded-full bg-gray-800/50 p-3 text-white hover:bg-gray-700"
                    >
                        <ChevronLeft size={32} />
                    </button>
                    <button
                        onClick={() => moveSlide(1)}
                        className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-gray-800/50 p-3 text-white hover:bg-gray-700"
                    >
                        <ChevronRight size={32} />
                    </button>
                </>
            )}
            {newsList.length > 1 && (
                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                    {newsList.map((_, i) => (
                        <button key={i} onClick={() => goToSlide(i)} className="focus:outline-none">
                            <div className={`h-3 w-3 rounded-full transition-all duration-300 ${i === index ? 'scale-125 bg-white' : 'bg-gray-400'}`} />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
