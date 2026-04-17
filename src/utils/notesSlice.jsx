import { createSlice } from "@reduxjs/toolkit";

const notesSlice = createSlice({
  name: "notes",
  initialState: {
    content: [], // BlockNote stores content as JSON array
  },
  reducers: {
    saveNotes: (state, action) => {
      state.content = action.payload;
    },
  },
});

export const { saveNotes } = notesSlice.actions;
export default notesSlice.reducer;