import { Request, Response } from "express";
import { z } from "zod";

import prisma from "../../../prisma";
import { createLog } from "../../../utils/define-action";

const productSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  email: z.string().email().min(1, "Email obrigatório"),
  contact: z.string().min(1, "Contato obrigatório"),
  phone: z.string().min(1, "Número obrigatório"),
});

export class CreateSupplier {
  async execute(request: Request, response: Response) {
    try {
      const user = request.user;

      const { name, contact, email, phone } = productSchema.parse(request.body);

      const suppilerExists = await prisma.supplier.findUnique({
        where: {
          email,
        },
      });

      if (suppilerExists) {
        response
          .status(400)
          .json({ message: "Fornecedor já cadastrado no sistema" });

        return;
      }

      const newSupplier = await prisma.supplier.create({
        data: {
          name,
          contact,
          email,
          phone,
        },
      });

      createLog({
        entity: "SUPPLIER",
        action: "CREATE",
        entityName: newSupplier.name,
        userId: user.id,
      });

      response.status(201).json();
    } catch (error) {
      console.log(error);
    }
  }
}
