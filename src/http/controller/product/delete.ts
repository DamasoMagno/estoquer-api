import { Request, Response } from "express";
import { z } from "zod";

import prisma from "../../../prisma";
import { createLog } from "../../../utils/define-action";

const productSchema = z.object({
  productId: z.string().uuid(),
});

export class DeleteProduct {
  async execute(request: Request, response: Response) {
    try {
      const user = request.user
      const { productId } = productSchema.parse(request.params);

      const productExists = await prisma.product.findFirst({
        where: {
          id: productId,
        },
      });

      if (!productExists) {
        response.status(400).json({ message: "Produto não encontrado" });
        return;
      }

      await prisma.product.delete({
        where: {
          id: productExists?.id,
        },
      });

      createLog({
        action: "DELETE",
        entity: "PRODUCT",
        entityName: productExists.name,
        userId: user.id,
      });

      response.status(201).json();
    } catch (error) {
      console.log(error);
    }
  }
}
