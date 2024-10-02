import { Router } from "express";
import { Role } from "@prisma/client";
const auditRoutes = Router();

import { ListAudit } from "./list";
const listAudits = new ListAudit();

import { userAuthenticate } from "../../middleware/authenticate";
import { permissions } from "../../middleware/permissions";

auditRoutes.use(userAuthenticate);
auditRoutes.use(permissions({ roles: [Role.ADMINISTRATOR] }));

auditRoutes.get("/", listAudits.execute);

export { auditRoutes };
