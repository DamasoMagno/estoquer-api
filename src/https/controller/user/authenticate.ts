import { Request, Response } from "express";
import { z } from "zod";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import prisma from "../../../prisma";

const userSchema = z.object({
  email: z.string().min(1, "Email obrigatório"),
  password: z.string().min(6, "Minimo de 6 caracteres exigidos"),
});

export class AuthenticateUser {
  async execute(request: Request, response: Response) {
    try {
      const { email, password } = userSchema.parse(request.body);

      const userExists = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!userExists) {
        response.status(400).json({
          message: "Email/Senha incorretos",
        });

        return;
      }

      const match = await compare(password, userExists.password);

      if (!match) {
        response.status(400).json({ message: "Email/Senha incorretos" });
      }

      const token = sign(
        {
          role: userExists.role,
        },
        "estoquer",
        {
          subject: userExists.id,
          expiresIn: "7d",
        }
      );

      response.status(201).json({
        token,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
