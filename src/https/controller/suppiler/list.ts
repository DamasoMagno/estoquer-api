import { Request, Response } from "express";
import { z } from "zod";

import prisma from "../../../prisma";

const searchSupplierSchema = z.object({
  name: z.string().optional(),
  page: z.coerce.number().positive().optional(),
  itensPerPage: z.coerce.number().positive().optional(),
});

export class ListSuppilers {
  async execute(request: Request, response: Response) {
    try {
      const {
        name,
        page = 1,
        itensPerPage = 10,
      } = searchSupplierSchema.parse(request.query);

      const suppliers = await prisma.supplier.findMany({
        where: {
          name: {
            contains: name,
          },
        },
        skip: (page - 1) * itensPerPage,
        take: itensPerPage,
      });

      const totalSuppliers = await prisma.product.count({
        where: {
          name: {
            contains: name,
          },
        },
      });

      response.status(200).json({
        suppliers,
        totalPages: Math.ceil(totalSuppliers / itensPerPage),
        currentPage: page,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
