import { axios } from "lib/axios";

export interface IPinFileResponse {
  [key: string]: boolean;
}

export const pinFileApi = async (id: number) => {
  try {
    const { data } = await axios.post<IPinFileResponse>("/files/pin", { id });
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};
