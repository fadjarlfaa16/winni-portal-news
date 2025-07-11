export interface Article {
    id: string;
    title: string;
    status: string;
    urlImage?: string;
    content?: string;
    likeCount?: number;
    topic?: string[] | string;
    author?: string;
    created_at?: string;
    updated_at?: string;
}

// Available topics for selection
export const TOPICS = [
    'Politik', 'Ekonomi', 'Teknologi', 'Olahraga', 'Kesehatan', 
    'Pendidikan', 'Hiburan', 'Internasional', 'Lingkungan', 'Sosial'
];