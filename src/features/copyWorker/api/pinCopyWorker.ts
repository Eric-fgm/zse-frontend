import { axios } from "lib/axios";

export interface IPinCopyWorkerResponse {
  [key: string]: boolean;
}

export const pinCopyWorkerApi = async (ids: string) => {
  try {
    const { data } = await axios.post<IPinCopyWorkerResponse>(
      "/copy-worker/pin",
      { ids }
    );
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};
