import React from 'react';
import PostItem from './PostItem';
import { Comment } from './CommentItem';

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  likes: string[];
  comments: any[];
  createdAt: string;
  updatedAt: string;
}

interface PostListProps {
  posts: Post[];
  onLike: (postId: string) => void;
  onComment: (postId: string, content: string) => void;
  onReply: (postId: string, commentId: string, content: string) => void;
  onLikeComment: (postId: string, commentId: string) => void;
  currentUserId?: string;
}

const PostList: React.FC<PostListProps> = ({
  posts,
  onLike,
  onComment,
  onReply,
  onLikeComment,
  currentUserId
}) => {
  return (
    <div className="space-y-6">
      {posts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">Belum ada post. Jadilah yang pertama!</p>
        </div>
      ) : (
        posts.map((post) => (
          <PostItem
            key={post.id}
            post={post}
            onLike={onLike}
            onComment={onComment}
            onReply={onReply}
            onLikeComment={onLikeComment}
            currentUserId={currentUserId}
          />
        ))
      )}
    </div>
  );
};

export default PostList; 