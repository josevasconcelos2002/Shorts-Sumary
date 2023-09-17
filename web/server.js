import axios from "axios" // conecta front com o back

export const server = axios.create({
  baseURL: "http://localhost:3333",
})
