import React from "react";

const ShimmerVideoCard = () => {
  return (
    <div className="w-80 animate-pulse">
      
      {/* Thumbnail */}
      <div className="w-full h-44 bg-gray-700 rounded-xl"></div>

      {/* Info Section */}
      <div className="flex mt-3 gap-3">
        
        {/* Channel icon */}
        <div className="w-10 h-10 bg-gray-700 rounded-full"></div>

        {/* Text */}
        <div className="flex flex-col gap-2 w-full">
          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2"></div>
          <div className="h-3 bg-gray-700 rounded w-1/3"></div>
        </div>

      </div>
    </div>
  );
};

export default ShimmerVideoCard;