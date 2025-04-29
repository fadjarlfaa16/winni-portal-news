const genreList = [
    'Health',
    'Technology',
    'Politics',
    'Woman and Beauty',
    'Crime',
    'Religion',
    'Financial and Economy',
    'Government',
    'International Relation',
    'Nature',
];

const ExploresFilter = ({
    selectedGenres,
    setSelectedGenres,
    applyFilter,
}: {
    selectedGenres: string[];
    setSelectedGenres: (genres: string[]) => void;
    applyFilter: () => void;
}) => {
    const handleCheckboxChange = (genre: string) => {
        if (selectedGenres.includes(genre)) {
            setSelectedGenres(selectedGenres.filter((g) => g !== genre));
        } else {
            setSelectedGenres([...selectedGenres, genre]);
        }
    };

    return (
        <div className="rounded-lg bg-white p-4 text-left">
            <h2 className="mb-4 text-sm font-bold text-gray-800 md:text-lg">Filter</h2>
            <form className="flex flex-col gap-1">
                {genreList.map((tag, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id={tag}
                            name={tag}
                            checked={selectedGenres.includes(tag)}
                            onChange={() => handleCheckboxChange(tag)}
                            className="cursor-pointer"
                        />
                        <label htmlFor={tag} className="cursor-pointer text-xs text-gray-700 md:text-sm">
                            {tag}
                        </label>
                    </div>
                ))}
                <div className="mt-4">
                    <button
                        type="button"
                        onClick={applyFilter}
                        className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
                    >
                        Apply Filter
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ExploresFilter;
