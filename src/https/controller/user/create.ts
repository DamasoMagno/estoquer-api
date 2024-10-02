import { Request, Response } from "express";
import { z } from "zod";
import { hash } from "bcryptjs";

import prisma from "../../../prisma";
import { Role } from "@prisma/client";

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
      const { name, email, password, birthday, cpf, role } = userSchema.parse(
        request.body
      );

      const userExists = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (userExists) {
        response.status(400).json({
          message: "Usuário já cadastrado no sistema.",
        });

        return;
      }

      const passwordHashed = await hash(password, 10);

      await prisma.user.create({
        data: {
          email,
          name,
          password: passwordHashed,
          cpf,
          role,
          birthday,
        },
      });

      response.status(201).json();
    } catch (error) {
      console.log(error);
    }
  }
}
