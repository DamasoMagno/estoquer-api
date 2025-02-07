import { Request, Response } from "express";
import { z } from "zod";

import prisma from "../../../prisma";
import { createLog } from "../../../utils/define-action";

const productSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  quantity: z.number().optional(),
  price: z.number().optional(),
});

const productIdSchema = z.object({
  productId: z.string().optional(),
});

export class UpdateProduct {
  async execute(request: Request, response: Response) {
    try {
      const user = request.user;

      const { productId } = productIdSchema.parse(request.params);
      const { name, description, price, quantity } = productSchema.parse(
        request.body
      );

      const productExists = await prisma.product.findUnique({
        where: {
          id: productId,
        },
      });

      if (!productExists) {
        response
          .status(400)
          .json({ message: "Produto não encontrado no sistema" });

          return;
      }

      await prisma.product.update({
        where: {
          id: productExists?.id,
        },
        data: {
          name,
          description,
          price,
          quantity,
        },
      });

      createLog({
        action: "UPDATE",
        entityName: productExists.name,
        entity: "PRODUCT",
        userId: user.id,
      });
      response.status(201).json();
    } catch (error) {
      console.log(error);
    }
  }
}
