import React from 'react';

interface LikeButtonProps {
    liked: boolean;
    count: number;
    onToggle: () => void;
    disabled?: boolean;
}

const LikeButton: React.FC<LikeButtonProps> = ({ liked, count, onToggle, disabled = false }) => (
    <button
        className={`
            flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-200 
            ${liked 
                ? 'text-red-500 bg-red-50 hover:bg-red-100' 
                : 'text-gray-500 hover:text-red-500 hover:bg-gray-50'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            transform ${liked ? 'scale-105' : 'hover:scale-105'}
        `}
        onClick={onToggle}
        disabled={disabled}
        type="button"
    >
        <svg 
            className={`w-5 h-5 transition-all duration-200 ${liked ? 'fill-current' : 'fill-none'} stroke-current`} 
            viewBox="0 0 24 24"
        >
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
            />
        </svg>
        <span className={`font-medium ${liked ? 'text-red-500' : 'text-gray-600'}`}>
            {count}
        </span>
    </button>
);

export default LikeButton; 