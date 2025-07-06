import React from 'react';
import { Article } from './types';

interface ArticleListProps {
    articles: Article[];
    onEdit: (article: Article) => void;
    onDelete: (id?: number) => void;
}

const ArticleList: React.FC<ArticleListProps> = ({ articles, onEdit, onDelete }) => {
    if (articles.length === 0) {
        return (
            <div className="text-center py-10">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Tidak ada artikel ditemukan</h3>
                <p className="text-gray-500">Mulai buat artikel pertama Anda atau coba ubah filter pencarian</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 mx-5">
            {articles.map((article) => (
                <div
                    key={article.id}
                    className="flex bg-white overflow-hidden duration-200"
                >
                    <img
                        src={article.urlImage || 'https://via.placeholder.com/120x120'}
                        alt={article.title}
                        className="w-64 h-32 object-cover flex-shrink-0"
                    />
                    <div className="flex flex-col flex-1 p-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <h2 className="text-xl font-bold mb-1 md:mb-0 md:mr-4">{article.title}</h2>
                            <div className="flex gap-2 mt-1 md:mt-0">
                                <button
                                    className="text-blue-600 hover:underline text-sm font-medium"
                                    onClick={() => onEdit(article)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="text-red-600 hover:underline text-sm font-medium"
                                    onClick={() => onDelete(article.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                        <div className="text-sm text-gray-500 mb-1 text-left">
                            By <span className="font-semibold text-indigo-700">{article.author || 'Unknown'}</span>
                            {article.updated_at && (
                                <>
                                    {' '}• Last updated on {new Date(article.updated_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                </>
                            )}
                            {article.topic && article.topic.length > 0 && (
                                <>
                                    {' '}• <span className="text-gray-400">{Array.isArray(article.topic) ? article.topic.join(', ') : article.topic}</span>
                                </>
                            )}
                        </div>
                        <div className="text-gray-700 text-sm line-clamp-2 text-justify">
                            {article.content}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ArticleList;