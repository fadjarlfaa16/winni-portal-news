export interface NewsItem {
    id: number;
    author: string;
    title: string;
    content: string;
    timestamp: string;
    imageUrl?: string;
}

const dummyNews: NewsItem[] = [
    {
        id: 1,
        author: 'Andi Saputra',
        title: 'Pembaruan Teknologi AI di Tahun 2025',
        content: 'Teknologi kecerdasan buatan semakin maju dengan diluncurkannya model-model terbaru yang mampu memahami konteks lebih dalam.',
        timestamp: '2025-04-20T09:15:00Z',
        imageUrl: 'https://via.placeholder.com/800x400.png?text=AI+Update',
    },
    {
        id: 2,
        author: 'Siti Nurhaliza',
        title: 'Perkembangan Ekonomi Digital Indonesia',
        content: 'Pertumbuhan ekonomi digital di Indonesia diperkirakan mencapai 5% pada kuartal kedua, ditopang oleh e‑commerce dan fintech.',
        timestamp: '2025-04-19T14:30:00Z',
        imageUrl: 'https://via.placeholder.com/800x400.png?text=Ekonomi+Digital',
    },
    {
        id: 3,
        author: 'Budi Wijaya',
        title: 'Tips Sehat Bersepeda di Musim Hujan',
        content: 'Musim hujan bukan halangan untuk bersepeda. Berikut beberapa tips menjaga sepeda dan keselamatan kamu saat hujan turun.',
        timestamp: '2025-04-18T07:45:00Z',
        imageUrl: 'https://via.placeholder.com/800x400.png?text=Sepeda+Hujan',
    },
];

const ListOfNews = ({ news }: { news: NewsItem[] }) => (
    <div className="space-y-6 md:w-1/2">
        {news.map((item) => (
            <div key={item.id} className="overflow-hidden rounded-lg bg-white shadow">
                {item.imageUrl && <img src={item.imageUrl} alt={item.title} className="h-48 w-full object-cover" />}
                <div className="p-4">
                    <div className="mb-2 flex items-center justify-between">
                        <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                        <span className="text-sm text-gray-500">{new Date(item.timestamp).toLocaleString()}</span>
                    </div>
                    <p className="mb-2 text-sm text-gray-600">
                        By <span className="font-medium">{item.author}</span>
                    </p>
                    <p className="text-gray-700">{item.content}</p>
                </div>
            </div>
        ))}
    </div>
);

const NewsList = () => (
    <div className="w-50% container mx-auto p-4">
        <ListOfNews news={dummyNews} />
    </div>
);

export default NewsList;
