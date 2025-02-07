import { Request, Response } from "express";
import { z } from "zod";

import { ListUsersService } from "../../../services/user/list";
import { UserRepository } from "../../../repositories/user/UserRepository";

const userRepository = new UserRepository();
const listUserService = new ListUsersService(userRepository);

const searchProductSchema = z.object({
  name: z.string().optional(),
  page: z.coerce.number().positive().optional(),
  itensPerPage: z.coerce.number().positive().optional(),
});

export class ListUsers {
  async execute(request: Request, response: Response) {
    try {
      const {
        name,
        page = 1,
        itensPerPage = 10,
      } = searchProductSchema.parse(request.query);

      const users = await listUserService.handle({ name, page, itensPerPage });

      response.status(200).json(users);
    } catch (error) {
      console.log(error);
    }
  }
}
