import { Request, Response } from "express";
import { z } from "zod";

import prisma from "../../../prisma";

const searchProductSchema = z.object({
  name: z.string().optional(),
  id: z.string().uuid().optional(),
  page: z.coerce.number().positive().optional(),
  itensPerPage: z.coerce.number().positive().optional(),
});

export class ListProducts {
  async execute(request: Request, response: Response) {
    try {
      const {
        id,
        name,
        page = 1,
        itensPerPage = 10,
      } = searchProductSchema.parse(request.query);

      const products = await prisma.product.findMany({
        where: {
          id: {
            contains: id,
          },
          name: {
            contains: name,
          },
        },
        skip: (page - 1) * itensPerPage,
        take: itensPerPage,
      });

      const totalProducts = await prisma.product.count({
        where: {
          id: {
            contains: id,
          },
          name: {
            contains: name,
          },
        },
      });

      response.status(200).json({
        products,
        totalPages: Math.ceil(totalProducts / itensPerPage),
        currentPage: page,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
