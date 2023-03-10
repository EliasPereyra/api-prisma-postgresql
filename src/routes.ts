import { PrismaClient } from "@prisma/client";
import { Express, Request, Response } from "express"

const prisma = new PrismaClient();

function routes(app: Express) {
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

  app.post("/post", async (req: Request, res: Response) => {
    const { title, content, authorEmail } = req.body
    const post = await prisma.post.create({
      data: {
        title,
        content,
        published: false,
        author: { connect: { email: authorEmail } }
      }
    })

    res.json(post)
  })

  app.put("/post/publish/:id", async (req: Request, res: Response) => {
    const { id } = req.params

    const postUpdated = await prisma.post.update({
      where: { id: Number(id) },
      data: { published: true }
    })

    res.json(postUpdated)
  })

  app.delete("/post/:id", async (req: Request, res: Response) => {
    const { id } = req.params

    await prisma.post.delete({
      where: { id: Number(id) },
    })

    res.json("Post deleted")
  })
}
