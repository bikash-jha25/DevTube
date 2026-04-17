import React from "react";
import SideBar from "./SideBar";
import MainContainer from "./MainContainer";
import { Outlet } from "react-router-dom";
import WatchPage from "./WatchPage";

const Body = () => {
  return (
    <div className="flex flex-1 min-h-0">
      <SideBar />
      <Outlet />
    </div>
  );
};

export default Body;
