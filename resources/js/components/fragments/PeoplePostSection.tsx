import { useEffect, useRef, useState } from 'react';

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

interface PeoplePostsSectionProps {
    posts: Post[];
    onToggleLike: (postId: number) => void;
}

const PeoplePostsSection = ({ posts, onToggleLike }: PeoplePostsSectionProps) => {
    const [openComments, setOpenComments] = useState<number[]>([]);
    const [newComments, setNewComments] = useState<{ [key: number]: string }>({});
    const [replyingTo, setReplyingTo] = useState<number | null>(null);
    const [newReplies, setNewReplies] = useState<{ [key: number]: string }>({});

    const replyInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (replyingTo !== null && replyInputRef.current) {
            replyInputRef.current.focus();
        }
    }, [replyingTo]);

    const toggleComments = (postId: number) => {
        setOpenComments((prev) => (prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]));
    };

    const handleAddComment = (postId: number) => {
        const content = newComments[postId]?.trim();
        if (!content) return;

        const newComment: Comment = {
            id: Date.now(),
            author: 'You',
            content,
            timestamp: new Date().toISOString(),
            profileImage: 'https://randomuser.me/api/portraits/lego/1.jpg',
        };

        const updatedPosts = posts.map((post) => (post.id === postId ? { ...post, comments: [...post.comments, newComment] } : post));

        setNewComments((prev) => ({ ...prev, [postId]: '' }));
        alert('Comment added! (Simulated)');
    };

    const handleAddReply = (commentId: number, postId: number) => {
        const replyContent = newReplies[commentId]?.trim();
        if (!replyContent) return;

        const updatedPosts = posts.map((post) => {
            if (post.id !== postId) return post;
            const updatedComments = post.comments.map((comment) => {
                if (comment.id === commentId) {
                    return {
                        ...comment,
                        replies: [
                            ...(comment.replies || []),
                            {
                                id: Date.now(),
                                author: 'You',
                                content: replyContent,
                                timestamp: new Date().toISOString(),
                                profileImage: 'https://randomuser.me/api/portraits/lego/2.jpg',
                            },
                        ],
                    };
                }
                return comment;
            });
            return { ...post, comments: updatedComments };
        });

        setReplyingTo(null);
        setNewReplies((prev) => ({ ...prev, [commentId]: '' }));
        alert('Reply added! (Simulated)');
    };

    const handleDeleteComment = (postId: number, commentId: number) => {
        const updatedPosts = posts.map((post) => {
            if (post.id !== postId) return post;
            const updatedComments = post.comments.filter((comment) => comment.id !== commentId);
            return { ...post, comments: updatedComments };
        });
        alert('Comment deleted! (Simulated)');
    };

    const handleDeleteReply = (postId: number, commentId: number, replyId: number) => {
        const updatedPosts = posts.map((post) => {
            if (post.id !== postId) return post;
            const updatedComments = post.comments.map((comment) => {
                if (comment.id === commentId) {
                    const updatedReplies = comment.replies?.filter((reply) => reply.id !== replyId) || [];
                    return { ...comment, replies: updatedReplies };
                }
                return comment;
            });
            return { ...post, comments: updatedComments };
        });
        alert('Reply deleted! (Simulated)');
    };

    return (
        <div className="space-y-6">
            {posts.map((post) => (
                <div key={post.id} className="rounded-lg bg-white p-4 text-left shadow transition-all duration-300">
                    <div className="mb-1 text-sm font-semibold text-gray-800">{post.author}</div>
                    <div className="mb-2 text-sm text-gray-600">{post.content}</div>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>{new Date(post.timestamp).toLocaleString()}</span>
                        <div className="flex gap-4">
                            <button onClick={() => onToggleLike(post.id)} className="hover:text-blue-500">
                                {post.likedByUser ? '💙' : '🤍'} {post.likes} Likes
                            </button>
                            <button onClick={() => toggleComments(post.id)} className="hover:text-blue-500">
                                💬 Comments
                            </button>
                        </div>
                    </div>

                    {/* Animated Comments */}
                    <div
                        className={`transition-all duration-300 ${openComments.includes(post.id) ? 'max-h-[1000px] opacity-100' : 'max-h-0 overflow-hidden opacity-0'}`}
                    >
                        <div className="mt-4 space-y-4 border-t pt-3">
                            {post.comments.length === 0 ? (
                                <div className="text-xs text-gray-400">No comments yet.</div>
                            ) : (
                                post.comments.map((comment) => (
                                    <div key={comment.id} className="flex items-start gap-2 text-xs">
                                        <img
                                            src={comment.profileImage || 'https://randomuser.me/api/portraits/lego/0.jpg'}
                                            alt="profile"
                                            className="h-8 w-8 rounded-full object-cover"
                                        />
                                        <div className="w-full">
                                            <div>
                                                <span className="font-semibold text-gray-700">{comment.author}</span>:{' '}
                                                <span className="text-gray-600">{comment.content}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] text-gray-400">{new Date(comment.timestamp).toLocaleString()}</span>
                                                <button
                                                    onClick={() => setReplyingTo(comment.id)}
                                                    className="text-[10px] text-blue-500 hover:underline"
                                                >
                                                    Reply
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteComment(post.id, comment.id)}
                                                    className="text-[10px] text-red-500 hover:underline"
                                                >
                                                    Delete
                                                </button>
                                            </div>

                                            {/* Nested Replies */}
                                            {comment.replies?.map((reply) => (
                                                <div key={reply.id} className="mt-2 ml-8 flex gap-2">
                                                    <img
                                                        src={reply.profileImage || 'https://randomuser.me/api/portraits/lego/3.jpg'}
                                                        alt="profile"
                                                        className="h-6 w-6 rounded-full object-cover"
                                                    />
                                                    <div>
                                                        <span className="font-semibold text-gray-700">{reply.author}</span>:{' '}
                                                        <span className="text-gray-600">{reply.content}</span>
                                                        <div className="flex items-center gap-2 text-[10px] text-gray-400">
                                                            {new Date(reply.timestamp).toLocaleString()}
                                                            <button
                                                                onClick={() => handleDeleteReply(post.id, comment.id, reply.id)}
                                                                className="text-red-500 hover:underline"
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}

                                            {/* Reply Input */}
                                            {replyingTo === comment.id && (
                                                <div className="mt-2 ml-8 flex flex-col">
                                                    <input
                                                        ref={replyInputRef}
                                                        value={newReplies[comment.id] || ''}
                                                        onChange={(e) => setNewReplies({ ...newReplies, [comment.id]: e.target.value })}
                                                        placeholder="Write a reply..."
                                                        className="rounded border p-1 text-xs focus:ring-1 focus:ring-blue-400"
                                                    />
                                                    <button
                                                        onClick={() => handleAddReply(comment.id, post.id)}
                                                        className="mt-1 w-fit rounded bg-blue-500 px-2 py-1 text-xs text-white hover:bg-blue-600"
                                                    >
                                                        Send Reply
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}

                            {/* New Comment Input */}
                            <div className="mt-4 flex items-center gap-2">
                                <input
                                    value={newComments[post.id] || ''}
                                    onChange={(e) => setNewComments({ ...newComments, [post.id]: e.target.value })}
                                    placeholder="Add a comment..."
                                    className="w-full rounded border p-2 text-xs focus:ring-1 focus:ring-blue-400"
                                />
                                <button
                                    onClick={() => handleAddComment(post.id)}
                                    className="rounded bg-blue-500 px-4 py-2 text-xs text-white hover:bg-blue-600"
                                >
                                    Post
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PeoplePostsSection;
