import { Request, Response } from "express";
import { z } from "zod";

import prisma from "../../../prisma";

const searchProductSchema = z.object({
  name: z.string().optional(),
  id: z.string().uuid().optional(),
});

export class Inventory {
  async execute(request: Request, response: Response) {
    try {
      const { id, name } = searchProductSchema.parse(request.query);

      const products = await prisma.product.findMany({
        where: {
          id: {
            contains: id,
          },
          name: {
            contains: name,
          },
        },
      });

      const productsFormatted = products.map((product) => {
        return {
          ...product,
          avaliable: product.quantity > 0,
        };
      });

      response.status(200).json({
        productsFormatted,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
