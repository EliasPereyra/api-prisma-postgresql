import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const newUser = await prisma.user.create({
    data: {
      name: 'elias',
      email: 'elias@hotmail.com',
      posts: {
        create: {
          title: "Hello world!"
        }
      }
    }
  })

  console.log("User created", newUser)

  const allUsers = await prisma.user.findMany({
    include: { posts: true }
  })

  console.dir(allUsers, { depth: null, colors: true })
}

main()
  .catch(e => console.error("There was an error: ", e))
  .finally(async () => await prisma.$disconnect())
