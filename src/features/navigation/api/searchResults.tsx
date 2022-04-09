import { TCopyWorker } from "features/copyWorker/types";
import { TFile } from "features/files/types";
import { axios } from "lib/axios";

export const searchResultsApi = async (payload: string) => {
  try {
    const response = await axios.get<{
      files: TFile[];
      copyWorker: TCopyWorker[];
    }>(`/search` + payload);
    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
};
