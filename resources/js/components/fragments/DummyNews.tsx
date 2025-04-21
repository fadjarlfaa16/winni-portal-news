// src/components/fragments/NewsListDemo.tsx
import { NewsItem } from '@/components/fragments/NewsList';

// Data dummy dengan preview image
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

export default dummyNews;
