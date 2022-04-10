import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteCopyWorkerApi } from "features/copyWorker/api/deleteCopyWorker";
import { getAllCopyWorkerApi } from "features/copyWorker/api/getCopyWorker";
import { pinCopyWorkerApi } from "features/copyWorker/api/pinCopyWorker";
import { TCopyWorker, TPagination } from "features/copyWorker/types";
import { RootState } from "app/store/store";

const initialState: {
  byId: { [key: string]: TCopyWorker };
  allIds: number[];
  pagination: TPagination;
  status: "idle" | "pending" | "error";
} = {
  byId: {},
  allIds: [],
  pagination: {
    page: 1,
    offset: 0,
  },
  status: "idle",
};

export const fetchCopyWorker = createAsyncThunk(
  "copyWorker/fetchFiles",
  async (payload: string, { rejectWithValue }) => {
    try {
      const response = await getAllCopyWorkerApi(payload);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const pinCopyWorker = createAsyncThunk(
  "copyWorker/pinCopyWorker",
  async (payload: string, { rejectWithValue }) => {
    try {
      const response = await pinCopyWorkerApi(payload);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const deleteCopyWorker = createAsyncThunk(
  "copyWorker/deleteCopyWorker",
  async (ids: number[] | string[], { rejectWithValue }) => {
    try {
      const response = await deleteCopyWorkerApi(ids);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const copyWorkerSlice = createSlice({
  name: "copyWorker",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCopyWorker.pending, (state, { payload }) => {
      state.status = "pending";
    });
    builder.addCase(fetchCopyWorker.fulfilled, (state, { payload }) => {
      state.status = "idle";
      state.byId = payload.byId;
      state.allIds = payload.allIds;
      state.pagination = payload.pagination;
    });
    builder.addCase(fetchCopyWorker.rejected, (state, { payload }) => {
      state.status = "error";
    });
    builder.addCase(pinCopyWorker.fulfilled, (state, { payload }) => {
      for (const id in payload) {
        const flag = payload[id];
        state.byId[id].isPinned = flag;
      }
    });
    builder.addCase(deleteCopyWorker.fulfilled, (state, { payload }) => {
      payload.forEach((id) => {
        state.allIds = state.allIds.filter((currId) => currId !== +id);
        delete state.byId[id];
      });
    });
  },
});

export const selectCopyWorker = ({ copyWorker }: RootState) => {
  const copyWorkerOutput = copyWorker.allIds.map(
    (currId) => copyWorker.byId[currId]
  );
  return {
    copyWorker: copyWorkerOutput,
    isLoading: copyWorker.status === "pending",
  };
};

// export const {} = copyWorkerSlice.actions;
export default copyWorkerSlice.reducer;
