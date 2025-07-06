export interface Article {
    id?: number;
    title: string;
    status: string;
    urlImage?: string;
    content?: string;
    likeCount?: number;
    topic?: string[] | string;
    author?: string;
    createdAt?: string;
    updated_at?: string;
}

// Available topics for selection
export const TOPICS = [
    'Politik', 'Ekonomi', 'Teknologi', 'Olahraga', 'Kesehatan', 
    'Pendidikan', 'Hiburan', 'Internasional', 'Lingkungan', 'Sosial'
];