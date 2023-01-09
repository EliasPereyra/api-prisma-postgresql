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
  try {
    const allPosts = await prisma.post.findMany({
      where: { published: true },
      include: { author: true }
    })

    res.json(allPosts)
  } catch (error) {
    res.json({ message: error })
  }
})

app.get("/posts/:id", async (req: Request, res: Response) => {
  const { id } = req.params

  const post = await prisma.post.findUnique({
    where: { id: Number(id) }
  })

  res.json(post)
})

app.post("/user", async (req: Request, res: Response) => {
  const user = await prisma.user.create({
    data: { ...req.body }
  })

  res.json(user)
})



app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`)
})
