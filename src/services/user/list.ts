import prisma from "../../prisma";
import { UserRepository } from "../../repositories/user/UserRepository";

interface User {
  name?: string;
  page: number;
  itensPerPage: number;
}

export class ListUsersService {
  constructor(private userRepository: UserRepository) {}

  async handle({ itensPerPage, name, page }: User) {
    try {
      const users = await this.userRepository.findAllContainingName(
        page,
        itensPerPage,
        name
      );

      const totalUsers = await this.userRepository.countUsers(name);

      return {
        users,
        totalPages: Math.ceil(totalUsers / Number(itensPerPage)),
        currentPage: page,
      };
    } catch (error) {
      console.log(error);
    }
  }
}
