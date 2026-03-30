import { prisma } from '../src/lib/prisma'

async function main() {
  const users = await prisma.user.findMany({
    include: {
      roles: true,
      organizer: true,
    },
    orderBy: { id: 'asc' },
  })

  console.log(JSON.stringify(users.map((u) => ({
    id: u.id,
    username: u.username,
    organizer: u.organizer?.name ?? null,
    roles: u.roles.map((r) => r.name),
  })), null, 2))
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
