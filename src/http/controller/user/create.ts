import { Request, Response } from "express";
import { z } from "zod";

import { Role } from "@prisma/client";

import { CreateUserService } from "../../../services/user/create";
import { UserRepository } from "../../../repositories/user/UserRepository";

const userRepository = new UserRepository();
const createUserService = new CreateUserService(userRepository);

const userSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  email: z.string().min(1, "Email obrigatório"),
  cpf: z.string().min(1, "CPF obrigatório"),
  role: z.enum([Role.ADMINISTRATOR, Role.EMPLOYEE]),
  password: z.string().min(6, "Minimo de 6 caracteres exigidos"),
  birthday: z.coerce.date({
    message: "Data de aniversário orbigatória",
  }),
});

export class CreateUser {
  async execute(request: Request, response: Response) {
    try {
      const user = userSchema.parse(request.body);

      await createUserService.handle(user);

      response.status(201).json();
    } catch (error) {
      console.log(error);
    }
  }
}
