const SkeletonLoader = () => {
    return (
        <div className="flex gap-6 p-4 border border-gray-200 animate-pulse w-[783.6px] h-[123.2px]">
            <div className="flex-1">
                <div className="h-5 bg-gray-300 rounded mb-2 max-w-[750px]"></div>
                
                <div className="flex flex-wrap gap-2 mb-2 max-w-[750px]">
                    {[...Array(3)].map((_, index) => (
                        <div
                            key={index}
                            className="px-4 py-1 bg-gray-300 rounded-3xl w-20 h-6"
                        ></div>
                    ))}
                </div>

                <div className="flex justify-between items-center">
                    <div className="flex flex-row items-center gap-4">
                        {[...Array(3)].map((_, index) => (
                            <div key={index} className="flex items-center gap-1">
                                <div className="h-4 w-4 bg-gray-300 rounded"></div>
                                <div className="h-4 w-8 bg-gray-300 rounded"></div>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="h-4 w-24 bg-gray-300 rounded"></div>
                        <div className="h-4 w-16 bg-gray-300 rounded"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonLoader;
