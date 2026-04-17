import React from "react";
import Button from "./Button";

const ButtonList = () => {
  const buttonNames = [
    "All",
    "Music",
    "Sports",
    "Gaming",
    "News",
    "Live",
    "Podcasts",
    "Movies",
    "Education",
    "Technology",
    "Programming",
    "React",
    "JavaScript",
    "AI",
    "Machine Learning",
    "Data Science",
    "Cricket",
    "Football",
    "Cooking",
    "Travel",
    "Vlogs",
    "Comedy",
    "Motivation",
    "Fitness",
    "Health",
    "Finance",
    "Startups",
    "Business",
    "Anime",
    "Cars",
    "Science",
    "Space",
    "History",
  ];
  return (
    <div className="flex gap-3 overflow-x-auto px-4 py-2 scrollbar-hide  bg-[#0f0f0f]  sticky top-0 z-40">
      {buttonNames.map((btn, index) => (
        <Button name={btn} key={index} />
      ))}
    </div>
  );
};

export default ButtonList;
