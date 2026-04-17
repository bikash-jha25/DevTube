import React from "react";
import ShimmerVideoCard from "./ShimmerVideoCard";

const ShimmerContainer = () => {
  return (
    <div className="flex flex-wrap justify-center gap-6">
      {Array(12)
        .fill("")
        .map((_, index) => (
          <ShimmerVideoCard key={index} />
        ))}
    </div>
  );
};

export default ShimmerContainer;