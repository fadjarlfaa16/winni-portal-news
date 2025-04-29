import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

const images = [
    'https://png.pngtree.com/thumb_back/fh260/background/20240801/pngtree-new-cb-background-images-photos-pics-wallpaper-pictures-image_16123145.jpg',
    'https://png.pngtree.com/thumb_back/fh260/background/20240801/pngtree-new-cb-background-images-photos-pics-wallpaper-pictures-image_16123145.jpg',
    'https://png.pngtree.com/thumb_back/fh260/background/20240801/pngtree-new-cb-background-images-photos-pics-wallpaper-pictures-image_16123145.jpg',
    'https://png.pngtree.com/thumb_back/fh260/background/20240801/pngtree-new-cb-background-images-photos-pics-wallpaper-pictures-image_16123145.jpg',
    'https://png.pngtree.com/thumb_back/fh260/background/20240801/pngtree-new-cb-background-images-photos-pics-wallpaper-pictures-image_16123145.jpg',
];

export default function Carousel() {
    const [index, setIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []); // dependency array kosong

    const moveSlide = (step: number) => {
        if (isAnimating) return;
        setIsAnimating(false);
        setIndex((prev) => (prev + step + images.length) % images.length);
        setTimeout(() => setIsAnimating(false), 800);
    };

    const goToSlide = (slideIndex: number) => {
        if (isAnimating || slideIndex === index) return;
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
                {[...images, images[0]].map((src, i) => (
                    <img key={i} src={src} alt={`Slide ${i + 1}`} className="h-full w-full flex-shrink-0 object-cover" />
                ))}
            </div>
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
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                {images.map((_, i) => (
                    <button key={i} onClick={() => goToSlide(i)} className="focus:outline-none">
                        <div className={`h-3 w-3 rounded-full transition-all duration-300 ${i === index ? 'scale-125 bg-white' : 'bg-gray-400'}`} />
                    </button>
                ))}
            </div>
        </div>
    );
}
