import { Request, Response } from "express";
import { z } from "zod";

import prisma from "../../../prisma";

const productSchema = z.object({
  productId: z.string().uuid(),
});

export class GetProduct {
  async execute(request: Request, response: Response) {
    try {
      const { productId } = productSchema.parse(request.params);

      const product = await prisma.product.findUnique({
        where: {
          id: productId,
        },
      });

      response.status(200).json({
        product,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
