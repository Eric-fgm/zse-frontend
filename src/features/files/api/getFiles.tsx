import { normalize, schema } from "normalizr";
import { axios } from "lib/axios";
import { TFile, TPagination } from "features/files/types";

export interface IGetFilesResponse {
  files: TFile[];
  pagination: TPagination;
}

const filesSchema = new schema.Entity(
  "files",
  {},
  {
    idAttribute: "id",
  }
);

export const getFilesApi = async (payload: string) => {
  try {
    const { data } = await axios.get<IGetFilesResponse>(`/files` + payload);
    const { entities, result } = normalize<TFile>(data.files, [filesSchema]);
    return {
      byId: entities.files || {},
      allIds: result as number[],
      pagination: data.pagination,
    };
  } catch (err) {
    return Promise.reject(err);
  }
};
