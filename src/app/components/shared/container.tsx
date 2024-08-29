import React from 'react';

const Container = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return (
        <div className="flex justify-center">
            <div
                className={`xl:max-w-[1300px] w-full  lg:mx-20    sm:max-w-[90%] max-sm:px-6 ${className} sunset-font `}
            >
                {children}
            </div>
        </div>
    );
};

export default Container;
