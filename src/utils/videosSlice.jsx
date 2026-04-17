import { createSlice } from "@reduxjs/toolkit";

const videosSlice = createSlice({
  name: "videos",
  initialState: {
    items: [],
    nextPageToken: null,
    isFetching: false,
  },
  reducers: {
    appendVideos: (state, action) => {
      state.items = [...state.items, ...action.payload.items];
      state.nextPageToken = action.payload.nextPageToken;
    },
    setFetching: (state, action) => {
      state.isFetching = action.payload;
    },
    searchVideos: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { appendVideos, setFetching , searchVideos} = videosSlice.actions;
export default videosSlice.reducer;
