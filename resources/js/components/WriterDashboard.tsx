import React, { useState, useRef, useEffect } from 'react';
import ArticleForm from './fragments/ArticleForm';
import ArticleList from './fragments/ArticleList';
import DashboardStats from './fragments/DashboardStats';
import { Article } from './fragments/types';
import { useAuth } from '../context/AuthContext';

const WriterDashboard = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [topics, setTopics] = useState<string[]>([]);
    const [editingArticle, setEditingArticle] = useState<Article | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const formRef = useRef<HTMLDivElement>(null);
    const { userName, token, logout } = useAuth();

    // Helper for session expiration
    const handleSessionExpired = () => {
        alert('Your session has expired. Please log in again.');
        if (logout) logout();
        window.location.href = '/login';
    };

    // Load articles and topics on mount
    useEffect(() => {
        const fetchArticles = async () => {
            const res = await fetch('/api/news', {
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
                },
            });
            const contentType = res.headers.get('content-type');
            if (res.status === 401 || (contentType && contentType.includes('text/html'))) {
                handleSessionExpired();
                return;
            }
            const data = await res.json();
            setArticles(data);
        };
        if (token) fetchArticles();
        // topics fetch can remain as is unless protected
        fetch('/api/topics')
            .then(res => res.json())
            .then(data => setTopics(data.map((t: any) => t.name)));
    }, [token]);

    // CRUD Handlers
    const handleCreate = async (article: Article) => {
        console.log('Creating article as', userName, 'with token', token);
        const payload = {
            ...article,
            author: userName,
        };
        delete payload.created_at;
        const res = await fetch('/api/news', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
            },
            body: JSON.stringify(payload),
        });

        const contentType = res.headers.get('content-type');
        if (res.status === 401 || (contentType && contentType.includes('text/html'))) {
            handleSessionExpired();
            return;
        }

        let newArticle;
        if (contentType && contentType.includes('application/json')) {
            newArticle = await res.json();
        } else {
            const text = await res.text();
            alert('Failed to create news: ' + text);
            return;
        }
        if (!res.ok) {
            alert('Failed to create news: ' + (newArticle?.message || res.statusText));
            return;
        }
        setArticles(prev => [...prev, newArticle]);
        setShowForm(false);
    };

    const handleEdit = (article: Article) => {
        setEditingArticle(article);
        setShowForm(true);
        setTimeout(() => {
            if (formRef.current) {
                formRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }, 0);
    };

    const handleUpdate = async (updatedArticle: Article) => {
        console.log('Updating article as', userName, 'with token', token);
        const payload = {
            ...updatedArticle,
            author: userName,
        };
        delete payload.created_at;
        const res = await fetch(`/api/news/${updatedArticle.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
            },
            body: JSON.stringify(payload),
        });

        const contentType = res.headers.get('content-type');
        if (res.status === 401 || (contentType && contentType.includes('text/html'))) {
            handleSessionExpired();
            return;
        }

        let saved;
        if (contentType && contentType.includes('application/json')) {
            saved = await res.json();
        } else {
            const text = await res.text();
            alert('Failed to update news: ' + text);
            return;
        }
        if (!res.ok) {
            alert('Failed to update news: ' + (saved?.message || res.statusText));
            return;
        }
        setArticles(prev => prev.map(a => (a.id === saved.id ? saved : a)));
        setEditingArticle(null);
        setShowForm(false);
    };

    const handleDelete = async (id?: string) => {
        if (!id) return;
        if (window.confirm('Are you sure to delete this article?')) {
            const res = await fetch(`/api/news/${id}`, { method: 'DELETE' });
            const contentType = res.headers.get('content-type');
            if (res.status === 401 || (contentType && contentType.includes('text/html'))) {
                handleSessionExpired();
                return;
            }
            setArticles(prev => prev.filter(a => a.id !== id));
        }
    };

    // Topic add handler
    const handleAddTopic = async (name: string) => {
        const res = await fetch('/api/topics', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name }),
        });
        const newTopic = await res.json();
        setTopics(prev => [...prev, newTopic.name]);
    };

    // Filtering logic (unchanged)
    const filteredArticles = articles
        .filter(article => article.author === userName) // hanya milik user login
        .filter(article => {
            const matchesSearch =
                (article.title && article.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (article.content && article.content.toLowerCase().includes(searchTerm.toLowerCase()));
            const matchesStatus = filterStatus === 'All' || article.status === filterStatus;
            return matchesSearch && matchesStatus;
        });

    // Toggle form open/close
    const handleToggleForm = () => {
        if (showForm) {
            setShowForm(false);
            setEditingArticle(null);
        } else {
            setShowForm(true);
            setEditingArticle(null);
        }
    };

    return (
        <div className="min-h-screen ">
            {/* Header */}
            <div className="bg-white ">
                <div className="flex items-center justify-between py-6 mx-5">
                    <div>
                        <h1 className="text-3xl font-bold bg-black bg-clip-text text-transparent">
                            Writer Dashboard
                        </h1>
                </div>
                    <button
                        onClick={handleToggleForm}
                        className="px-6 py-3 bg-black text-white rounded-xl font-semibold hover:shadow-md transition-all duration-100 transform hover:scale-102 flex items-center gap-2"
                    >
                        {showForm ? (
                            <>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Close Form
                            </>
                        ) : (
                            <>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                </svg>
                                New Article
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Form */}
            <div ref={formRef}>
                {showForm && (
                    <ArticleForm
                        article={editingArticle}
                        onSave={editingArticle ? handleUpdate : handleCreate}
                        onCancel={() => { setEditingArticle(null); setShowForm(false); }}
                        topics={topics}
                        onAddTopic={handleAddTopic}
                    />
                )}
            </div>
            <DashboardStats articles={filteredArticles} />
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-8 mx-5">
                <div className="flex-1">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search news..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 "
                        />
                        <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 hover:border-blue-300"
                >
                    <option value="All">All</option>
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                </select>
            </div>
            {/* Articles List */}
            <ArticleList
                articles={filteredArticles}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default WriterDashboard;