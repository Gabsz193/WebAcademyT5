import axios, { AxiosInstance } from "axios";

let db_axios: AxiosInstance;

export function initializeAxios(): AxiosInstance {
  if (!process.env.DB_URL) {
    throw new Error("DB_URL is not defined in the enviroment");
  }
  if (!db_axios) {
    db_axios = axios.create({
      baseURL: process.env.DB_URL
    });
  }

  return db_axios;
}
