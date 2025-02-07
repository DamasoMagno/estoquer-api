import { Request, Response } from "express";
import { z } from "zod";

import prisma from "../../../prisma";
import { createLog } from "../../../utils/define-action";

const productSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  contact: z.string().optional(),
  phone: z.string().optional(),
});

const supplierIdSchema = z.object({
  supplierId: z.string().optional(),
});

export class UpdateSupplier {
  async execute(request: Request, response: Response) {
    try {
      const user = request.user;

      const { supplierId } = supplierIdSchema.parse(request.params);
      const { name, contact, email, phone } = productSchema.parse(request.body);

      const supplierExists = await prisma.supplier.findUnique({
        where: {
          id: supplierId,
        },
      });

      if (!supplierExists) {
        response
          .status(400)
          .json({ message: "Fornecedor não cadastrado no sistema" });

        return;
      }

      await prisma.supplier.update({
        where: {
          id: supplierExists?.id,
        },
        data: {
          name,
          contact,
          email,
          phone,
        },
      });

      createLog({
        action: "UPDATE",
        entity: "SUPPLIER",
        entityName: supplierExists.name,
        userId: user.id,
      });
      response.status(201).json();
    } catch (error) {
      console.log(error);
    }
  }
}
