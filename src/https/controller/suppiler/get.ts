import { Request, Response } from "express";
import { z } from "zod";

import prisma from "../../../prisma";

const supplierSchema = z.object({
  supplerId: z.string().uuid(),
});

export class GetSupplier {
  async execute(request: Request, response: Response) {
    try {
      const { supplerId } = supplierSchema.parse(request.params);

      const supplier = await prisma.supplier.findUnique({
        where: {
          id: supplerId,
        },
      });

      response.status(200).json({
        supplier,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
