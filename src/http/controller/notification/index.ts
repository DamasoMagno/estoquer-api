import { Router } from "express";
import { Role } from "@prisma/client";
const notificationRoutes = Router();

import { ListNotifications } from "./list";
import { ReadNotification } from "./read";

import { userAuthenticate } from "../../middleware/authenticate";
import { permissions } from "../../middleware/permissions";

const listNotifications = new ListNotifications();
const readNotification = new ReadNotification();

notificationRoutes.use(userAuthenticate);
notificationRoutes.use(
  permissions({ roles: [Role.ADMINISTRATOR, Role.EMPLOYEE] })
);

notificationRoutes.get("/", listNotifications.execute);
notificationRoutes.post("/read", readNotification.execute);

export { notificationRoutes };
