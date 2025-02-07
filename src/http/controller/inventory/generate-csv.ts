import { Request, Response } from "express";
import fs from "node:fs";
import { Parser } from "@json2csv/plainjs";

import prisma from "../../../prisma";

export class GenerateCSV {
  async execute(request: Request, response: Response) {
    try {
      const products = await prisma.product.findMany({
        select: {
          name: true,
          quantity: true,
          price: true,
          description: true,
        },
      });

      const mappedProducts = products.map((product) => ({
        nome: product.name,
        quantidade: product.quantity,
        preco: product.price,
        descricao: product.description || "", 
      }));

      const fields = ["nome", "quantidade", "preco", "descricao"];
      const json2csvParser = new Parser({ fields, header: true });
      const csv = json2csvParser.parse(mappedProducts);

      fs.writeFileSync("produtos.csv", csv);

      response.status(200).json({
        message: "Arquivo gerado com sucesso",
      });
    } catch (error) {
      console.log(error);
    }
  }
}
