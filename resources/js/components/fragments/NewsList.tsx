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

export const ListOfNews = ({ news }: { news?: NewsItem[] }) => {
    const displayNews = news ?? dummyNews;

    return (
        <div className="w-full">
            {displayNews.map((item) => (
                <div key={item.id} className="mb-4 flex overflow-hidden rounded-lg bg-white md:flex-row">
                    {item.imageUrl && (
                        <div className="max-h-[200px] w-full content-center items-center md:w-[40%]">
                            <img src={item.imageUrl} alt={item.title} className="w-full object-cover py-4 md:h-full" />
                        </div>
                    )}
                    <div className="flex w-full flex-col content-center items-center justify-center px-4 pl-2 text-left md:w-[60%] lg:py-4">
                        <div>
                            <h3 className="w-full cursor-pointer text-[8.5pt] font-bold text-gray-800 transition-colors hover:text-blue-600 md:text-lg lg:mb-2">
                                {item.title}
                            </h3>
                            <div className="text-[7pt] text-gray-500 md:text-sm lg:mb-2">
                                By <span className="font-semibold">{item.author}</span> • {new Date(item.timestamp).toLocaleDateString()} •{' '}
                                <span>{item.genre}</span>
                            </div>
                            <p className="line-clamp-3 text-[7pt] text-gray-700 md:text-sm">{item.content}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

const NewsList = () => (
    <div className="mx-auto max-w-[800px]">
        <ListOfNews />
    </div>
);

export default NewsList;
