import React from 'react';

const HomeSkeleton = ({skeletonCount}) => {

    return (
        <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-6 w-full px-1 lg:pl-20 lg:pt-24">
            {Array.from({ length: skeletonCount }).map((_, index) => (
                <div
                    key={index}
                    className="h-[30rem] w-[11rem] lg:w-[20rem] flex flex-col justify-center lg:px-2 lg:hover:scale-105 transition-all duration-30"
                >
                    <div className="flex justify-center items-center h-[25rem] w-full bg-gray-300 animate-pulse rounded-lg"></div>

                    <div className="w-full flex flex-col justify-between items-center pr-5 pl-6 mt-6">
                        <div className="flex justify-between w-full">
                            <div className="h-6 w-1/2 bg-gray-300 animate-pulse rounded-md"></div>
                            <div className="h-6 w-1/4 bg-gray-300 animate-pulse rounded-md"></div>
                        </div>

                        <div className="w-full mt-2">
                            <div className="h-4 w-3/4 bg-gray-300 animate-pulse rounded-md"></div>
                            <div className="h-4 w-1/2 bg-gray-300 animate-pulse rounded-md mt-1"></div>
                        </div>

                        <div className="h-4 w-1/3 bg-gray-300 animate-pulse rounded-md mt-4"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HomeSkeleton;
