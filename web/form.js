import { server } from "./server.js"

const form = document.querySelector("#form")
const input = document.querySelector("#url")
const content = document.querySelector("#content")

form.addEventListener("submit", async (event) => {
  event.preventDefault()
  content.classList.add("placeholder")

  const videoURL = input.value

  if (!videoURL.includes("shorts")) {
    alert("Esse video nao e um short!! Insira outro.")
    return (content.textContent = "Esse video nao parece ser um short.")
  }

  const [_, params] = videoURL.split("/shorts/")
  // params === id do video + qq coisa
  const [videoID] = params.split("?si")

  content.textContent = "Obtendo o texto do audio..."

  const transcription = await server.get("/summary/" + videoID) // tem que ser uma funcao assincrona (espera que acabe o download e dps continua)

  content.textContent = "Realizando o resumo..."

  const summary = await server.post("/summary", {
    text: transcription.data.result,
  })


  content.textContent = summary.data.result
  content.classList.remove("placeholder")
})
