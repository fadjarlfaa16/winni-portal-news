const hashtags = [
    '#AI',
    '#Technology',
    '#Innovation',
    '#Startup',
    '#Programming',
    '#HealthTech',
    '#ClimateChange',
    '#Education',
    '#FinTech',
    '#SpaceTech',
];

const TrendingTopics = () => (
    <div className="rounded-lg bg-white text-left">
        <h2 className="mb-4 text-sm font-bold text-gray-800 md:text-lg">Trending Topics</h2>
        <ul className="">
            {hashtags.map((tag, index) => (
                <li key={index} className="cursor-pointer text-xs text-blue-600 hover:underline md:text-sm">
                    {tag}
                </li>
            ))}
        </ul>
    </div>
);

export default TrendingTopics;
