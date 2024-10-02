import { Request, Response } from "express";

import prisma from "../../../prisma";
import { z } from "zod";

const notificationSchema = z.object({
  notificationId: z.string().uuid()
})

export class ReadNotification {
  async execute(request: Request, response: Response) {
    try {
      const { notificationId } = notificationSchema.parse(request.params)

      const notificationExists = await prisma.notification.findUnique({
        where: {
          id: notificationId
        }
      });

      if(!notificationExists){
        response.status(404).json({
          error: "Notificação não encontrada"
        })
      }

      await prisma.notification.update({
        where: {
          id: notificationExists?.id
        },
        data: {
          read: true
        }
      });

      response.status(201).json();
    } catch (error) {
      console.log(error);
    }
  }
}
