import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getFilesApi } from "features/files/api/getFiles";
import { TFile, TPagination } from "features/files/types";
import { deleteFilesApi } from "features/files/api/deleteFiles";
import { pinFileApi } from "features/files/api/pinFile";
import {
  TUploadFileChunk,
  uploadFileChunksApi,
  uploadFileRequestApi,
} from "features/files/api/uploadFile";
import { RootState } from "app/store/store";

const initialState: {
  uploadingBytes: { [key: string]: number };
  byId: { [key: string]: TFile };
  allIds: number[];
  pagination: TPagination;
  status: "idle" | "pending" | "error";
} = {
  uploadingBytes: {},
  byId: {},
  allIds: [],
  pagination: {
    page: 1,
    offset: 0,
  },
  status: "idle",
};

export const fetchFiles = createAsyncThunk(
  "files/fetchFiles",
  async (payload: string, { rejectWithValue }) => {
    try {
      const response = await getFilesApi(payload);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const deleteFiles = createAsyncThunk(
  "files/deleteFiles",
  async (ids: number[], { rejectWithValue }) => {
    try {
      const response = await deleteFilesApi(ids);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const pinFile = createAsyncThunk(
  "files/pinFile",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await pinFileApi(id);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const uploadFileChunks = createAsyncThunk(
  "files/uploadFileChunks",
  async (payload: TUploadFileChunk, { dispatch, rejectWithValue }) => {
    try {
      const { hasEnded, byteRangeStart = 0 } = await uploadFileChunksApi(
        payload
      );
      if (!hasEnded) dispatch(uploadFileChunks({ ...payload, byteRangeStart }));
      return { id: payload.fileId, bytes: byteRangeStart, hasEnded };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const uploadFileRequest = createAsyncThunk(
  "files/uploadFileRequest",
  async (file: File, { dispatch, rejectWithValue }) => {
    try {
      const response = await uploadFileRequestApi(file);
      dispatch(
        uploadFileChunks({
          file,
          fileId: response.fileId,
          uniqueId: response.uniqueId,
          byteRangeStart: 0,
        })
      );
      return { ...response, size: file.size };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFiles.pending, (state, { payload }) => {
      state.status = "pending";
    });
    builder.addCase(fetchFiles.fulfilled, (state, { payload }) => {
      state.status = "idle";
      state.byId = payload.byId;
      state.allIds = payload.allIds;
      state.pagination = payload.pagination;
    });
    builder.addCase(fetchFiles.rejected, (state, { payload }) => {
      state.status = "error";
    });
    builder.addCase(pinFile.fulfilled, (state, { payload }) => {
      for (const id in payload) {
        const flag = payload[id];
        state.byId[id].isPinned = flag;
      }
    });
    builder.addCase(deleteFiles.fulfilled, (state, { payload }) => {
      payload.forEach((id) => {
        state.allIds = state.allIds.filter((currId) => currId !== +id);
        delete state.byId[id];
      });
    });
    builder.addCase(uploadFileRequest.fulfilled, (state, { payload }) => {
      const { fileId, uniqueId, ...file } = payload;
      state.byId[file.id] = file;
      state.allIds.unshift(file.id);
      state.uploadingBytes[file.id] = 0;
    });
    builder.addCase(uploadFileChunks.fulfilled, (state, { payload }) => {
      const { id, bytes, hasEnded } = payload;
      if (hasEnded) delete state.uploadingBytes[id];
      else state.uploadingBytes[id] = bytes;
    });
  },
});

export const selectFiles = ({ files }: RootState) => {
  const filesOutput = files.allIds.map((currId) => files.byId[currId]);
  return {
    files: filesOutput,
    isLoading: files.status === "pending",
  };
};

export const selectUploadingChunks = ({ files }: RootState) => {
  return files.uploadingBytes;
};

export default filesSlice.reducer;
