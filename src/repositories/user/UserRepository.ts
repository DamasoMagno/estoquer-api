import { User, Role } from "@prisma/client";
import { IUserRepository } from "./IUserRepository";
import prisma from "../../prisma";

interface IUser {
  email: string;
  name: string;
  password: string;
  cpf: string;
  role: Role;
  birthday: Date;
}

export class UserRepository implements IUserRepository {
  async countUsers(name?: string): Promise<number> {
    return await prisma.user.count({
      where: {
        name: {
          contains: name,
        },
      },
    });
  }
  async findAllContainingName(
    page: number,
    itens: number,
    name?: string
  ): Promise<User[]> {
    return await prisma.user.findMany({
      where: {
        name: {
          contains: name,
        },
      },
      skip: (page - 1) * itens,
      take: itens,
    });
  }
  async findById(id: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });

  }
  async create(user: IUser): Promise<void> {
    await prisma.user.create({
      data: user,
    });
  }
}
