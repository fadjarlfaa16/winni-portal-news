import React, { useState } from 'react';
import LikeButton from './LikeButton';
import CommentList from './CommentList';
import { Comment } from './CommentItem';

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  profilePath?: string;
  likes: string[];
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
}

interface PostItemProps {
  post: Post;
  onLike: (postId: string) => void;
  onComment: (postId: string, content: string) => void;
  onReply: (postId: string, commentId: string, content: string) => void;
  onLikeComment: (postId: string, commentId: string) => void;
  currentUserId?: string;
}

const PostItem: React.FC<PostItemProps> = ({
  post,
  onLike,
  onComment,
  onReply,
  onLikeComment,
  currentUserId
}) => {
  const [commentContent, setCommentContent] = useState('');
  const [showComments, setShowComments] = useState(false);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentContent.trim()) {
      onComment(post.id, commentContent.trim());
      setCommentContent('');
    }
  };

  const isLiked = currentUserId ? post.likes.includes(currentUserId) : false;
  const isAuthor = currentUserId === post.author;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-6 hover:shadow-xl transition-shadow duration-300">
      {/* Post Header with User Info */}
      <div className="flex items-center mb-4">
        <div className="relative">
          {post.profilePath ? (
            <img
              src={post.profilePath}
              alt={post.author}
              className="w-12 h-12 rounded-full object-cover mr-4 shadow-md"
              onError={e => (e.currentTarget.src = 'https://ui-avatars.com/api/?name=' + post.author)}
            />
          ) : post.author ? (
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-lg text-gray-400 mr-4 shadow-md">
              {post.author.charAt(0).toUpperCase()}
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-lg text-gray-400 mr-4 shadow-md">
              ?
            </div>
          )}
          {isAuthor && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-gray-900 text-lg">{post.author}</h3>
            {isAuthor && (
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                Anda
              </span>
            )}
            <p className="text-sm text-gray-500">
            {new Date(post.createdAt).toLocaleDateString('id-ID', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
          </div>
         
        </div>
      </div>

      {/* Post Content */}
      <div className="mb-6 ml-5">
        {/* <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight">{post.title}</h2> */}
        <p className="text-gray-700 leading-relaxed text-left">{post.content}</p>
      </div>

      {/* Post Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-4">
          <LikeButton
            liked={isLiked}
            count={post.likes.length}
            onToggle={() => onLike(post.id)}
            disabled={!currentUserId}
          />
          
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-colors duration-200 px-3 py-2 rounded-full hover:bg-blue-50"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="font-medium">{post.comments.length} Komentar</span>
          </button>
        </div>
      </div>

      {/* Comment Form */}
      {currentUserId && (
        <form onSubmit={handleSubmitComment} className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex space-x-3">
            <input
              type="text"
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              placeholder="Tulis komentar..."
              className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            <button
              type="submit"
              disabled={!commentContent.trim()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
            >
              Kirim
            </button>
          </div>
        </form>
      )}

      {/* Comments Section */}
      {showComments && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <CommentList
            comments={post.comments}
            onReply={(parentId) => onReply(post.id, parentId, '')}
          />
        </div>
      )}
    </div>
  );
};

export default PostItem; 