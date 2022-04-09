import { axios } from "lib/axios";

export interface ISendEmailResponse {
  recipients: string[];
}

export interface ISendEmailPayload {
  recipient: string;
  topic: string;
  content: string;
  attachments: string[];
}

export const sendEmailApi = async (payload: ISendEmailPayload) => {
  try {
    const { data } = await axios.post<ISendEmailResponse>("/email", {
      ...payload,
      attachments: payload.attachments.join(),
    });
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};
