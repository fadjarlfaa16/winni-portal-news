import React, { useEffect, useState } from 'react';
import PostList from './fragments/PostList';
import { useAuth } from '../context/AuthContext';

interface Post {
  id: string;
  author: string;
  content: string;
  title: string;
  profilePath?: string;
  likes: string[];
  comments: any[];
  createdAt: string;
  updatedAt: string;
}

const Community: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState('');
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState('');

  // Gunakan useAuth hook untuk mendapatkan user info
  const { isAuthenticated, userName, token } = useAuth();

  // Fallback untuk username dari localStorage jika tidak ada di context
  const currentUser = userName || localStorage.getItem('userName') || '';

  // Debug: Log auth state
  console.log('Community Auth State:', { 
    isAuthenticated, 
    userName, 
    currentUser,
    token,
    localStorage: {
      token: localStorage.getItem('token'),
      userName: localStorage.getItem('userName'),
      isVerified: localStorage.getItem('isVerified')
    }
  });

  // Fetch posts
  const fetchPosts = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/posts');
      console.log('Fetch posts response:', res.status, res.statusText);
      
      if (!res.ok) throw new Error('Failed to fetch posts');
      
      let data = await res.json();
      console.log('Raw posts data:', data);
      
      // Map backend fields to frontend expected fields (id dari _id, author string)
      data = data.map((post: any) => ({
        ...post,
        id: typeof post._id === 'object' && post._id.$oid ? post._id.$oid : post._id || post.id,
        title: post.content.slice(0, 50) + (post.content.length > 50 ? '...' : ''),
        profilePath: post.profilePath || '',
        createdAt: post.created_at || post.createdAt,
        updatedAt: post.updated_at || post.updatedAt,
      }));
      setPosts(data);
    } catch (err) {
      setError('Gagal memuat postingan');
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Like/Unlike
  const handleLike = async (postId: string) => {
    console.log('Attempting to like post:', postId, 'User:', currentUser);
    
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      
      // Add username to header
      if (currentUser) {
        headers['X-Username'] = currentUser;
      }
      
      // Add token if available
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      console.log('Like request headers:', headers);

      const res = await fetch(`/api/posts/${postId}/like`, { 
        method: 'POST',
        headers
      });
      
      console.log('Like response status:', res.status, res.statusText);
      
      const responseData = await res.json();
      console.log('Like response data:', responseData);
      
      if (!res.ok) {
        if (res.status === 401) {
          alert('Silakan login untuk memberikan like');
          return;
        }
        if (res.status === 404) {
          alert('Post tidak ditemukan. Mungkin sudah dihapus.');
          fetchPosts(); // Refresh posts
          return;
        }
        throw new Error(responseData.message || 'Failed to like post');
      }
      
      if (responseData.success) {
        console.log('Like successful:', responseData.message);
        // Refresh posts to show updated like count
        fetchPosts();
      } else {
        throw new Error(responseData.message || 'Failed to like post');
      }
      
    } catch (err) {
      console.error('Error liking post:', err);
      alert(`Gagal memberikan like: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  // Create sample posts for testing
  const createSamplePosts = async () => {
    try {
      const res = await fetch('/api/posts/create-sample', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      
      const data = await res.json();
      console.log('Create sample posts response:', data);
      
      if (res.ok) {
        alert('Sample posts created successfully!');
        fetchPosts();
      } else {
        alert('Failed to create sample posts: ' + (data.message || 'Unknown error'));
      }
    } catch (err) {
      console.error('Error creating sample posts:', err);
      alert('Failed to create sample posts');
    }
  };

  // Add Comment
  const handleComment = async (postId: string, content: string) => {
    console.log('Attempting to comment on post:', postId, 'Content:', content, 'User:', currentUser);
    
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      
      if (currentUser) {
        headers['X-Username'] = currentUser;
      }
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const res = await fetch(`/api/posts/${postId}/comment`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ content }),
      });
      
      console.log('Comment response:', res.status, res.statusText);
      
      if (!res.ok) throw new Error('Failed to add comment');
      fetchPosts();
    } catch (err) {
      console.error('Error adding comment:', err);
      alert('Gagal menambahkan komentar');
    }
  };

  // Add Reply
  const handleReply = async (postId: string, parentId: string, content: string) => {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      
      if (currentUser) {
        headers['X-Username'] = currentUser;
      }
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const res = await fetch(`/api/posts/${postId}/comment`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ content, parent_id: parentId }),
      });
      
      if (!res.ok) throw new Error('Failed to add reply');
      fetchPosts();
    } catch (err) {
      console.error('Error adding reply:', err);
      alert('Gagal menambahkan balasan');
    }
  };

  // Like Comment (opsional, jika backend support)
  const handleLikeComment = () => {};

  // Tambah postingan baru
  const handleAddPost = async () => {
    if (!newPost.trim()) return;
    if (!currentUser) {
      alert('Silakan login untuk membuat postingan');
      return;
    }

    console.log('Attempting to create post:', { content: newPost, user: currentUser });

    setPosting(true);
    setError('');
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      
      if (currentUser) {
        headers['X-Username'] = currentUser;
      }
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      console.log('Create post headers:', headers);

      const res = await fetch('/api/posts', {
        method: 'POST',
        headers,
        body: JSON.stringify({ content: newPost }),
      });
      
      console.log('Create post response:', res.status, res.statusText);
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.log('Create post error data:', errorData);
        throw new Error('Failed to create post');
      }
      
      setNewPost('');
      fetchPosts();
    } catch (err) {
      setError('Gagal membuat postingan');
      console.error('Error creating post:', err);
    } finally {
      setPosting(false);
    }
  };

  return (
    <div className="min-h-screen  py-8">
      <div className="max-w-4xl mx-auto px-4">

        {/* Debug Info
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800 text-sm">
            <strong>Debug Info:</strong> Auth: {isAuthenticated ? 'Yes' : 'No'}, 
            User: {currentUser || 'None'}, 
            Token: {token ? 'Present' : 'None'}
          </div>
        )} */}

        {/* Form tambah postingan */}
        <div className="mb-8 bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {currentUser ? currentUser.charAt(0).toUpperCase() : '?'}
            </div>
            <div className="flex-1">
              <textarea
                className="w-full border-0 focus:ring-0 resize-none text-lg"
                placeholder="Apa yang ingin Anda bagikan hari ini?"
                value={newPost}
                onChange={e => setNewPost(e.target.value)}
                rows={3}
                disabled={!currentUser}
              />
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-gray-500">
                  {currentUser ? `Posting sebagai ${currentUser}` : 'Silakan login untuk posting'}
                </div>
                <button
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-lg"
                  onClick={handleAddPost}
                  disabled={!newPost.trim() || posting || !currentUser}
                >
                  {posting ? 'Mengirim...' : 'Posting'}
                </button>
              </div>
            </div>
          </div>
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}
        </div>

        {/* List postingan */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Memuat postingan...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Belum ada postingan</h3>
            <p className="text-gray-600">Jadilah yang pertama untuk memulai diskusi!</p>
            {/* <button
              className="mt-4 px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors duration-200 font-medium shadow-lg"
              onClick={createSamplePosts}
            >
              Buat Postingan Sampel
            </button> */}
          </div>
        ) : (
          <PostList
            posts={posts}
            onLike={handleLike}
            onComment={handleComment}
            onReply={handleReply}
            onLikeComment={handleLikeComment}
            currentUserId={currentUser || ''}
          />
        )}
      </div>
    </div>
  );
};

export default Community;
