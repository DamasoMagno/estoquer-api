import { Request, Response } from "express";
import { z } from "zod";

import { AuthenticateUserService } from "../../../services/user/authenticate";
import { UserRepository } from "../../../repositories/user/UserRepository";

const userRepository = new UserRepository();
const authenticateUserService = new AuthenticateUserService(userRepository);

const userSchema = z.object({
  email: z.string().min(1, "Email obrigatório"),
  password: z.string().min(6, "Minimo de 6 caracteres exigidos"),
});

export class AuthenticateUser {
  async execute(request: Request, response: Response) {
    try {
      const { email, password } = userSchema.parse(request.body);

      const { token, user } = await authenticateUserService.handle({
        email,
        password,
      });

      response.status(201).json({
        token,
        user,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
