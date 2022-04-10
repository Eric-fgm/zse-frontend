import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TCopyWorker } from "features/copyWorker/types";
import { TFile } from "features/files/types";
import { searchResultsApi } from "features/navigation/api/searchResults";
import { RootState } from "app/store/store";

const initialState: {
  hints: {
    files: TFile[];
    copyWorker: TCopyWorker[];
  };
  status: "idle" | "pending" | "error";
} = {
  hints: { files: [], copyWorker: [] },
  status: "idle",
};

export const fetchSearchResults = createAsyncThunk(
  "navigation/fetchSearchResults",
  async (payload: string, { rejectWithValue }) => {
    try {
      const response = await searchResultsApi(payload);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSearchResults.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(fetchSearchResults.fulfilled, (state, { payload }) => {
      const { files, copyWorker } = payload;
      state.status = "idle";
      state.hints.files = files;
      state.hints.copyWorker = copyWorker;
    });
    builder.addCase(fetchSearchResults.rejected, (state) => {
      state.status = "error";
    });
  },
});

export const selectHints = ({ navigation }: RootState) => {
  const { files, copyWorker } = navigation.hints;
  return { isLoading: navigation.status === "pending", files, copyWorker };
};

export default navigationSlice.reducer;
