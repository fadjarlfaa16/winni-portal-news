interface FilterSidebarProps {
    onClose: () => void;
}

const Filter = ({ onClose }: FilterSidebarProps) => {
    return (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex justify-end bg-black">
            <div className="w-80 bg-white p-6 shadow-lg">
                <h2 className="mb-4 text-xl font-bold">Filter Options</h2>
                <p className="mb-6 text-sm text-gray-600">Here you can put your filter components (e.g. category, date, etc).</p>
                <button onClick={onClose} className="rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600">
                    Close
                </button>
            </div>
        </div>
    );
};

export default Filter;
