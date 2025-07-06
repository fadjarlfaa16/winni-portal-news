import React, { useState } from 'react';
import { Article } from './types';


interface ArticleFormProps {
    article: Article | null;
    onSave: (article: Article) => void;
    onCancel: () => void;
    topics: string[];
    onAddTopic: (name: string) => Promise<void>;
}

const ArticleForm: React.FC<ArticleFormProps> = ({ article, onSave, onCancel, topics, onAddTopic }) => {
    const [newTopic, setNewTopic] = useState('');
    const [formData, setFormData] = useState<Article>({
        title: article?.title || '',
        urlImage: article?.urlImage || '',
        content: article?.content || '',
        likeCount: article?.likeCount || 0,
        topic: Array.isArray(article?.topic) ? article?.topic : (article?.topic ? [article.topic] : []),
        status: article?.status || 'Draft',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title || !formData.urlImage || !formData.content || !formData.topic || (Array.isArray(formData.topic) && formData.topic.length === 0)) {
            alert('Mohon lengkapi semua field yang wajib diisi');
            return;
        }
        onSave({ ...article, ...formData } as Article);
    };

    const handleTopicToggle = (topic: string) => {
        setFormData(prev => ({
            ...prev,
            topic: Array.isArray(prev.topic)
                ? (prev.topic.includes(topic)
                    ? prev.topic.filter(t => t !== topic)
                    : [...prev.topic, topic])
                : [topic]
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="mx-5 mb-3 bg-white rounded-2xl p-3">
            <div className="flex items-center mb-6">
                <div className="w-1 h-8 bg-black rounded-full mr-4"></div>
                <h3 className="text-xl font-bold text-gray-800">
                    {article ? 'Edit News' : 'Create News'}
                </h3>
            </div>

            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 text-left">
                            News Title *
                        </label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                            className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-800 focus:border-transparent transition-all duration-200 hover:border-gray-300"
                            placeholder="Enter news title..."
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 text-left">
                            Image URL *
                        </label>
                        <input
                            type="url"
                            value={formData.urlImage}
                            onChange={(e) => setFormData({...formData, urlImage: e.target.value})}
                            className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-800 focus:border-transparent transition-all duration-200 hover:border-gray-300"
                            placeholder="https://example.com/image.jpg"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 text-left">
                        Content *
                    </label>
                    <textarea
                        value={formData.content}
                        onChange={(e) => setFormData({...formData, content: e.target.value})}
                        rows={6}
                        className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-800 focus:border-transparent transition-all duration-200 hover:border-gray-300 resize-none"
                        placeholder="Write content here..."
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 text-left">
                            Status
                        </label>
                        <select
                            value={formData.status}
                            onChange={(e) => setFormData({...formData, status: e.target.value})}
                            className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-800 focus:border-transparent transition-all duration-200 hover:border-gray-300"
                        >
                            <option value="Draft">Draft</option>
                            <option value="Published">Published</option>
                        </select>
                    </div>
                    <div></div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3 text-left">
                        Topic (Choose at least 1)
                    </label>
                    <div className="flex gap-2 mb-3">
                        <input
                            type="text"
                            value={newTopic}
                            onChange={(e) => setNewTopic(e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-800 focus:border-transparent transition-all duration-200"
                            placeholder="Add new topic..."
                        />
                        <button
                            type="button"
                            className="bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800"
                            onClick={async () => {
                                const trimmed = newTopic.trim();
                                if (trimmed && !topics.includes(trimmed)) {
                                    await onAddTopic(trimmed);
                                    setNewTopic('');
                                }
                            }}
                            disabled={!newTopic.trim() || topics.includes(newTopic.trim())}
                        >
                            Add
                        </button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                        {topics.map((topic) => (
                            <label
                                key={topic}
                                className={`flex items-center p-3 rounded-xl border-2 cursor-pointer transition-all duration-100 hover:scale-102 ${
                                    Array.isArray(formData.topic) && formData.topic.includes(topic)
                                        ? 'bg-black border-gray-200 text-white shadow-lg'
                                        : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:shadow-md'
                                }`}
                            >
                                <input
                                    type="checkbox"
                                    checked={Array.isArray(formData.topic) && formData.topic.includes(topic)}
                                    onChange={() => handleTopicToggle(topic)}
                                    className="hidden"
                                />
                                <span className="text-sm font-medium">{topic}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Save
                    </button>
                </div>
            </div>
        </form>
    );
};

export default ArticleForm;