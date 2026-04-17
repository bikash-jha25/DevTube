import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    cache: {}, //empty object to store search results
  },
  reducers: {
    addCache: (state, action) => {
      const { query, results } = action.payload;
      state.cache[query] = results; //store the search results in the cache object with the query as the key
    },
  },
});

export const{addCache}= searchSlice.actions;
export default searchSlice.reducer;