import { Request, Response } from "express";

import prisma from "../../../prisma";
import { z } from "zod";

const searchProductSchema = z.object({
  page: z.coerce.number().positive().optional(),
  itensPerPage: z.coerce.number().positive().optional(),
});

export class ListAudit {
  async execute(request: Request, response: Response) {
    try {
      const { page = 1, itensPerPage = 10 } = searchProductSchema.parse(
        request.query
      );

      const audits = await prisma.audit.findMany({
        skip: (page - 1) * itensPerPage,
        take: itensPerPage,
      });

      const totalAudits = await prisma.audit.count();

      response.status(200).json({
        audits,
        totalPages: Math.ceil(totalAudits / itensPerPage),
        currentPage: page,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
