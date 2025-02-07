import { User } from "@prisma/client";

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(user: User): Promise<void>;
  findAllContainingName(
    page: number,
    itens: number,
    name?: string
  ): Promise<User[]>;
  countUsers(name?: string): Promise<number>;
}
