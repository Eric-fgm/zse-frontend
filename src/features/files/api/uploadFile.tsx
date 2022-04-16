import { axios } from "lib/axios";
import { getFileType, sleep } from "utils/helpers";
import { TFile } from "features/files/types";

export type TUploadFileChunk = {
  file: File;
  fileId: number;
  uniqueId: string;
  byteRangeStart: number;
};

export const uploadFileChunksApi = async ({
  file,
  fileId,
  uniqueId,
  byteRangeStart,
}: TUploadFileChunk) => {
  try {
    const formData = new FormData();
    const chunk = file.slice(byteRangeStart, byteRangeStart + 1024 * 1024);

    formData.append("chunk", chunk, file.name);
    formData.append("fileId", uniqueId);

    const { data } = await axios.post<{
      hasEnded?: boolean;
      byteRangeStart?: number;
    }>(`/files/upload`, formData, {
      headers: {
        "Content-Range": `bytes=${byteRangeStart}-${
          byteRangeStart + chunk.size
        }/${file.size}`,
        "X-File-Id": fileId,
        "X-Unique-Id": uniqueId,
      },
    });
    await sleep(250);
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const uploadFileRequestApi = async (payload: File) => {
  try {
    let fileType = payload.type;
    if (!fileType) fileType = `application/${getFileType(payload.name)}`;
    console.log(fileType);
    const { data } = await axios.post<
      { fileId: number; uniqueId: string } & TFile
    >(
      `/files/upload-request`,
      { name: payload.name, size: payload.size, type: fileType },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};
