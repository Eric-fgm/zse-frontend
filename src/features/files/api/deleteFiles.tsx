import { axios } from "lib/axios";

export const deleteFilesApi = async (ids: number[]): Promise<number[]> => {
  try {
    const response = await axios.delete(`/files/${ids.join(",")}`);
    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
};
