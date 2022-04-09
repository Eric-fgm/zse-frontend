import { normalize, schema } from "normalizr";
import { axios } from "lib/axios";
import { TCopyWorker, TPagination } from "features/copyWorker/types";

export interface IGetCopyWorkerResponse {
  copyWorker: TCopyWorker[];
  pagination: TPagination;
}

const copyWorkerSchema = new schema.Entity(
  "copyWorker",
  {},
  {
    idAttribute: "id",
  }
);

export const getAllCopyWorkerApi = async (payload: string) => {
  try {
    const { data } = await axios.get<IGetCopyWorkerResponse>(
      "/copy-worker" + payload
    );
    const { entities, result } = normalize<TCopyWorker>(data.copyWorker, [
      copyWorkerSchema,
    ]);
    return {
      byId: entities.copyWorker || {},
      allIds: result as number[],
      pagination: data.pagination,
    };
  } catch (err) {
    return Promise.reject(err);
  }
};
