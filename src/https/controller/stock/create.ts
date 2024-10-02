import { Request, Response } from "express";
import { z } from "zod";

import prisma from "../../../prisma";
import { createLog } from "../../../utils/define-action";

const stockSchema = z.object({
  productId: z.string().uuid(),
  origin: z.enum(["INPUT", "OUTPUT"]),
  quantity: z.number().positive(),
});

export class CreateStock {
  async execute(request: Request, response: Response) {
    try {
      const user = request.user;
      const { productId, quantity, origin } = stockSchema.parse(request.body);

      const product = await prisma.product.findUnique({
        where: {
          id: productId,
        },
      });

      if (!product) {
        response.status(401).json({
          message: "Produto não encontrado",
        });

        return;
      }

      const resposne = await prisma.stock.create({
        data: {
          quantity,
          userId: user.id,
          origin,
          productId,
        },
        include: {
          user: true,
        },
      });

      if (origin === "OUTPUT" && product.quantity === 0) {
        await prisma.notification.create({
          data: {
            message: `${product.name} fora de estoque`,
            productId: product.id,
          },
        });

        response.status(400).json({
          message: "Produto indisponivel",
        });

        return;
      }

      if (
        origin === "OUTPUT" &&
        (product.quantity <= 0 || product.quantity - quantity < 0)
      ) {
        response.status(400).json({
          message: "Produto indisponivel",
        });
        return;
      }

      const newProductQuantity =
        origin === "INPUT"
          ? product.quantity + quantity
          : product.quantity - quantity;

      await prisma.product.update({
        where: {
          id: productId,
        },
        data: {
          quantity: newProductQuantity,
        },
      });

      createLog({
        action: origin === "INPUT" ? "CREATE" : "DELETE",
        entity: "STOCK",
        entityName: product.name,
        userId: resposne.user.id,
      });

      response.status(201).json({
        message: "Estoque atualizado com sucesso",
        product: {
          id: product.id,
          name: product.name,
          quantity: newProductQuantity,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
