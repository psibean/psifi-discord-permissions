import prisma from "../db";

export default class UserRepository {

  public deleteUser(id: string) {
    return prisma.user.delete({
      where: {
        id: id
      }
    })
  }
}