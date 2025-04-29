import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import PeoplePostsSection from './fragments/PeoplePostSection';
import UserPostSection from './fragments/UserPostSection';

interface Comment {
    id: number;
    author: string;
    content: string;
    timestamp: string;
    replies?: Comment[];
    profileImage?: string;
}

interface Post {
    id: number;
    author: string;
    content: string;
    likes: number;
    timestamp: string;
    comments: Comment[];
    likedByUser?: boolean;
}

interface Post {
    id: number;
    author: string;
    content: string;
    likes: number;
    timestamp: string;
    comments: Comment[];
    likedByUser?: boolean;
}

const dummyPosts: Post[] = [
    {
        id: 1,
        author: 'Alice',
        content: 'Loving this community!',
        likes: 12,
        timestamp: '2025-04-27T10:00:00Z',
        comments: [{ id: 1, author: 'Bob', content: 'Agreed!', timestamp: '2025-04-27T11:00:00Z' }],
    },
    {
        id: 2,
        author: 'Bob',
        content: 'Just dropped a new blog!',
        likes: 5,
        timestamp: '2025-04-28T09:00:00Z',
        comments: [{ id: 2, author: 'Alice', content: 'Nice one!', timestamp: '2025-04-28T10:00:00Z' }],
    },
    {
        id: 3,
        author: 'Clara',
        content: 'Tips for learning React fast!',
        likes: 20,
        timestamp: '2025-04-26T12:00:00Z',
        comments: [{ id: 3, author: 'Dan', content: 'Useful tips!', timestamp: '2025-04-26T13:00:00Z' }],
    },
];

const Community = () => {
    const [selectedTab, setSelectedTab] = useState<'trending' | 'recent'>('trending');
    const [posts, setPosts] = useState<Post[]>(dummyPosts);
    const { isAuthenticated } = useAuth();

    const handleNewPost = (content: string) => {
        if (!isAuthenticated) {
            alert('You must login to post!');
            return;
        }
        const newPost: Post = {
            id: posts.length + 1,
            author: 'You',
            content,
            likes: 0,
            timestamp: new Date().toISOString(),
            comments: [],
        };
        setPosts([newPost, ...posts]);
    };

    const handleToggleLike = (postId: number) => {
        const updatedPosts = posts.map((post) =>
            post.id === postId ? { ...post, likes: post.likes + (post.likedByUser ? -1 : 1), likedByUser: !post.likedByUser } : post,
        );
        setPosts(updatedPosts as any); // TypeScript needs forced casting here
    };

    const sortedTrending = [...posts].sort((a, b) => b.likes - a.likes);
    const sortedRecent = [...posts].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    const displayedPosts = selectedTab === 'trending' ? sortedTrending : sortedRecent;

    return (
        <div className="mx-auto max-w-4xl p-4 md:p-8">
            <UserPostSection onPost={handleNewPost} />

            {/* Tabs */}
            <div className="mb-4 flex gap-6">
                <button
                    onClick={() => setSelectedTab('trending')}
                    className={`text-base font-semibold ${selectedTab === 'trending' ? 'text-blue-600' : 'text-gray-500'}`}
                >
                    Trending
                </button>
                <button
                    onClick={() => setSelectedTab('recent')}
                    className={`text-base font-semibold ${selectedTab === 'recent' ? 'text-blue-600' : 'text-gray-500'}`}
                >
                    Recent
                </button>
            </div>

            <PeoplePostsSection posts={displayedPosts} onToggleLike={handleToggleLike} />
        </div>
    );
};

export default Community;
