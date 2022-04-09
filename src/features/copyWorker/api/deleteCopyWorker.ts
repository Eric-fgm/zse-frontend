import { axios } from "lib/axios";

export const deleteCopyWorkerApi = async (ids: number[] | string[]) => {
  try {
    const response = await axios.delete<string[]>(
      `/copy-worker/${ids.join(",")}`
    );
    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
};
