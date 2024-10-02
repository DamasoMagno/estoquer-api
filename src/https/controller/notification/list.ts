import { Request, Response } from "express";

import prisma from "../../../prisma";

export class ListNotifications {
  async execute(request: Request, response: Response) {
    try {
      const audits = await prisma.notification.findMany();
      response.status(201).json({ audits });
    } catch (error) {
      console.log(error);
    }
  }
}
