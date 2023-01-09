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

app.get("/feed", async (req: Request, res: Response) => {
  const allPosts = await prisma.post.findMany({
    where: { published: true },
    include: { author: true }
  })

  res.json(allPosts)
})



app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`)
})
