import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";

const PORT = 3005

const prisma = new PrismaClient();
const app = express()

app.use(express.json())

app.get("/users", async (req: Request, res: Response) => {
  const allUsers = await prisma.user.findMany()

  res.json(allUsers)
})

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`)
})
