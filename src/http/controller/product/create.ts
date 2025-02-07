import { Request, Response } from "express";
import { z } from "zod";

import prisma from "../../../prisma";
import { createLog } from "../../../utils/define-action";

const productSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  description: z.string().optional(),
  quantity: z.number().min(1, "Quantidade necessária"),
  price: z.number().min(1, "Preço necessário"),
});

export class CreateProduct {
  async execute(request: Request, response: Response) {
    try {
      const user = request.user;

      const { name, description, price, quantity } = productSchema.parse(
        request.body
      );

      const productExists = await prisma.product.findFirst({
        where: {
          name,
        },
      });

      if (productExists) {
        response
          .status(400)
          .json({ message: "Produto já cadastrado no sistema" });

        return;
      }

      const product = await prisma.product.create({
        data: {
          name,
          description,
          price,
          quantity,
        },
      });

      createLog({
        action: "CREATE",
        entity: "PRODUCT",
        entityName: product.name,
        userId: user.id,
      });

      response.status(201).json();
    } catch (error) {
      console.log(error);
    }
  }
}
