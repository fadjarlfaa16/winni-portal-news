import { useState } from 'react';

interface UserPostSectionProps {
    onPost: (content: string) => void;
}

const UserPostSection = ({ onPost }: UserPostSectionProps) => {
    const [content, setContent] = useState('');

    const handleSend = () => {
        if (!content.trim()) return;
        onPost(content);
        setContent('');
    };

    return (
        <>
            <div className="mb-6 flex flex-col rounded-lg bg-white p-4 shadow md:flex-row md:items-start">
                <img
                    src="https://asset.kompas.com/crops/DaNGVsoX96hM0DfA1SxyHgYY_No=/51x0:687x424/1200x800/data/photo/2024/07/05/668790cfd998c.png"
                    className="mb-2 h-16 w-16 rounded-full object-cover md:mr-4 md:mb-0"
                    alt="Profile"
                />
                <div className="w-full">
                    <input
                        className="w-full rounded-lg border p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Write something..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <div className="mt-3 flex items-center justify-between">
                        <button className="rounded-lg bg-gray-200 px-4 py-2 text-sm hover:bg-gray-300">Attach</button>
                        <button onClick={handleSend} className="rounded-lg bg-blue-600 px-6 py-2 text-sm text-white hover:bg-blue-700">
                            Send Message
                        </button>
                    </div>
                </div>
            </div>
            <hr className="my-4" />
        </>
    );
};

export default UserPostSection;
