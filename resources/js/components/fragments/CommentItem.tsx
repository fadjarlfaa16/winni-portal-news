import React from 'react';

export interface Comment {
    id: string;
    author: string;
    content: string;
    created_at: string;
    replies?: Comment[];
}

interface CommentItemProps {
    comment: Comment;
    onReply?: (parentId: string) => void;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, onReply }) => {
    return (
        <div className="mb-2 ml-2 border-l-2 border-gray-200 pl-3">
            <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-indigo-700 text-sm">{comment.author}</span>
                <span className="text-xs text-gray-400">{new Date(comment.created_at).toLocaleString('id-ID')}</span>
            </div>
            <div className="text-gray-800 text-sm mb-1">{comment.content}</div>
            {onReply && (
                <button
                    className="text-xs text-blue-600 hover:underline mb-1"
                    onClick={() => onReply(comment.id)}
                >
                    Balas
                </button>
            )}
            {/* Render replies recursively */}
            {comment.replies && comment.replies.length > 0 && (
                <div className="ml-4 mt-1">
                    {comment.replies.map((reply) => (
                        <CommentItem key={reply.id} comment={reply} onReply={onReply} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CommentItem; 