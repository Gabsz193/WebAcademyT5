import axios from "axios";

export const produtosApi = axios.create({
  baseURL: "https://ranekapi.origamid.dev/json/api",
});

export const favoritosApi = axios.create({
  baseURL: "https://favoritos-json-server-ruby.vercel.app"
})