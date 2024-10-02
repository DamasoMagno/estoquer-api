import { Request, Response } from "express";
import { z } from "zod";

import prisma from "../../../prisma";
import { createLog } from "../../../utils/define-action";

const supplierIdSchema = z.object({
  supplierId: z.string().optional(),
});

export class DeleteSupplier {
  async execute(request: Request, response: Response) {
    try {
      const user = request.user;
      const { supplierId } = supplierIdSchema.parse(request.params);

      const supplierExists = await prisma.product.findUnique({
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

      await prisma.supplier.delete({
        where: {
          id: supplierExists?.id,
        },
      });

      createLog({
        entity: "SUPPLIER",
        action: "DELETE",
        entityName: supplierExists.name,
        userId: user.id,
      });

      response.status(201).json();
    } catch (error) {
      console.log(error);
    }
  }
}
