import React from 'react';

interface ExploresFilterProps {
    selectedGenres: string[];
    setSelectedGenres: (genres: string[]) => void;
    applyFilter: () => void;
    topics: string[];
}

const ExploresFilter: React.FC<ExploresFilterProps> = ({ selectedGenres, setSelectedGenres, applyFilter, topics }) => {
    const handleCheckbox = (topic: string) => {
        if (selectedGenres.includes(topic)) {
            setSelectedGenres(selectedGenres.filter(g => g !== topic));
        } else {
            setSelectedGenres([...selectedGenres, topic]);
        }
    };
    return (
        <div className="bg-white rounded-lg p-4 shadow text-left">
            <h3 className="font-bold mb-2 text-sm">Filter Topics</h3>
            <div className="flex flex-col gap-2 mb-4">
                {topics.map(topic => (
                    <label key={topic} className="flex items-center gap-2 text-xs">
                        <input
                            type="checkbox"
                            checked={selectedGenres.includes(topic)}
                            onChange={() => handleCheckbox(topic)}
                        />
                        {topic}
                    </label>
                ))}
            </div>
            <button
                className="w-full py-2 px-2 bg-blue-600 text-white rounded text-xs font-semibold hover:bg-blue-700"
                onClick={applyFilter}
            >
                Apply Filter
            </button>
        </div>
    );
};

export default ExploresFilter;
