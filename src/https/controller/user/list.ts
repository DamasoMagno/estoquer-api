import { Request, Response } from "express";
import { z } from "zod";

import prisma from "../../../prisma";

const searchProductSchema = z.object({
  name: z.string().optional(),
  page: z.coerce.number().positive().optional(),
  itensPerPage: z.coerce.number().positive().optional(),
});

export class ListUsers {
  async execute(request: Request, response: Response) {
    try {
      const {
        name,
        page = 1,
        itensPerPage = 10,
      } = searchProductSchema.parse(request.query);

      const users = await prisma.user.findMany({
        where: {
          name: {
            contains: name,
          },
        },
        skip: (page - 1) * itensPerPage,
        take: itensPerPage,
      });

      const totalUsers = await prisma.user.count({
        where: {
          name: {
            contains: name,
          },
        },
      });

      response.status(200).json({
        users,
        totalPages: Math.ceil(totalUsers / itensPerPage),
        currentPage: page,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
