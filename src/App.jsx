import React from "react";
import Header from "./components/Header";
import Body from "./components/Body";
import { Provider } from "react-redux";
import store from "./utils/store";
import { createBrowserRouter, Route, RouterProvider } from "react-router-dom";
import WatchPage from "./components/WatchPage";
import MainContainer from "./components/MainContainer";
import Pomodoro from "./components/Pomodoro/Pomodoro";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header /> {/* ✅ KEEP HEADER HERE */}
        <Body />
      </>
    ),
    children: [
      {
        path: "/",
        element: <MainContainer />,
      },
      {
        path: "watch",
        element: <WatchPage />,
      },
      { path: "focus", element: <Pomodoro /> },
    ],
  },
]);

const App = () => {
  return (
    <Provider store={store}>
      <div className="h-screen flex flex-col overflow-hidden bg-[#0f0f0f] text-white">
        {/* <Header /> */}
        <RouterProvider router={appRouter} />
      </div>
    </Provider>
  );
};

export default App;
