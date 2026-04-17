import React from "react";
import ButtonList from "./ButtonList";
import VideoContainer from "./VideoContainer";

const MainContainer = () => {
  return (
    <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
      <ButtonList />
      <div className="flex-1 overflow-y-auto mt-6">
        <VideoContainer />
      </div>
    </div>
  );
};

export default MainContainer;
