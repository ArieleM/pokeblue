import axios from "axios";

export const pokeapi = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

export const api = axios.create({
  baseURL: "/api",
});
