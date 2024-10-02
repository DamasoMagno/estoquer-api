import { Request, Response } from "express";

import prisma from "../../../prisma";
import { z, ZodError } from "zod";
import { Origin } from "@prisma/client";

const searchStockSchema = z.object({
  origin: z.enum([Origin.INPUT, Origin.OUTPUT]).optional(),
  createdAt: z.enum(["asc", "desc"]).optional(),
  itensPerPage: z.coerce.number().positive().optional(),
  page: z.coerce.number().positive().optional(),
});

export class HistoryStock {
  async execute(request: Request, response: Response) {
    try {
      const {
        origin,
        createdAt,
        page = 1,
        itensPerPage = 10,
      } = searchStockSchema.parse(request.query);

      const historyStock = await prisma.stock.findMany({
        where: {
          origin: {
            equals: origin,
          },
        },
        orderBy: {
          createdAt: createdAt,
        },
        skip: (page - 1) * itensPerPage,
        take: itensPerPage,
      });

      const totalItemsInHistory = await prisma.stock.count({
        where: {
          origin: {
            equals: origin,
          },
        },
      });

      response.status(201).json({
        history: historyStock,
        totalPage: Math.ceil(totalItemsInHistory / itensPerPage),
        page,
      });
    } catch (error) {
      if(error instanceof ZodError){
        response.status(500).json({
          error: error.message
        })
      }
    }
  }
}
