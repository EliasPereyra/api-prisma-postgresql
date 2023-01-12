import express from "express";

const PORT = 3005

const app = express()

app.use(express.json())

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`)
})
