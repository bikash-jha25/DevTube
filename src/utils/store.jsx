import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appSlice";
import searchReducer from "./searchSlice";
import chatReducer from "./chatSlice";
import notesReducer from "./notesSlice";
import videosReducer from "./videosSlice";

const store = configureStore({
  reducer: {
    app: appReducer,
    search: searchReducer,
    chat: chatReducer,
    notes: notesReducer,
    videos: videosReducer,
  },
});

export default store;
