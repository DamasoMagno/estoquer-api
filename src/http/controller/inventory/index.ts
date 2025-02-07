import { Router } from "express";
import { Role } from "@prisma/client";
const inventoryRoutes = Router();

import { Inventory } from "./list";
import { GenerateCSV } from "./generate-csv";
const inventory = new Inventory();
const generateCsv = new GenerateCSV();

import { userAuthenticate } from "../../middleware/authenticate";
import { permissions } from "../../middleware/permissions";

inventoryRoutes.use(userAuthenticate);
inventoryRoutes.use(
  permissions({ roles: [Role.ADMINISTRATOR, Role.EMPLOYEE] })
);

inventoryRoutes.get("/", inventory.execute);
inventoryRoutes.post("/csv", generateCsv.execute);
