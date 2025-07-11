import React from 'react';
import CommentItem, { Comment } from './CommentItem';

interface CommentListProps {
    comments: Comment[];
    onReply?: (parentId: string) => void;
}

const CommentList: React.FC<CommentListProps> = ({ comments, onReply }) => {
    if (!comments || comments.length === 0) return null;
    return (
        <div className="mt-2">
            {comments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} onReply={onReply} />
            ))}
        </div>
    );
};

export default CommentList; 