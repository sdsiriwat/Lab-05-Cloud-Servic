import { prisma } from '../lib/prisma'

export function findByUsername(username: string) {
  return prisma.user.findUnique({
    where: {
      username,
    },
    include: {
      roles: true,
      organizer: true,
    },
  })
}
