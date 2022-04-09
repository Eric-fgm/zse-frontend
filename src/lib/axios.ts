import Axios, { AxiosError, AxiosResponse } from "axios";

export const API_URL = "https://api-zse.herokuapp.com";

export const axios = Axios.create({
  baseURL: API_URL,
});

const onResponse = (response: AxiosResponse): AxiosResponse => {
  console.info(`[response] [${JSON.stringify(response)}]`);
  return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[response error] [${JSON.stringify(error)}]`);
  return Promise.reject(error);
};

axios.interceptors.response.use(onResponse, onResponseError);
