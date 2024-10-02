import { Router } from "express";
const suppilerRoutes = Router();

import { CreateSupplier } from "./create";
import { DeleteSupplier } from "./delete";
import { UpdateSupplier } from "./update";
import { ListSuppilers } from "./list";

import { userAuthenticate } from "../../middleware/authenticate";
import { permissions } from "../../middleware/permissions";
import { Role } from "@prisma/client";

const createSupplier = new CreateSupplier();
const updateSuppiler = new UpdateSupplier();
const deleteSuppiler = new DeleteSupplier();
const listSuppilers = new ListSuppilers();

suppilerRoutes.use(userAuthenticate);

suppilerRoutes.get(
  "/",
  permissions({ roles: [Role.ADMINISTRATOR, Role.EMPLOYEE] }),
  listSuppilers.execute
);
suppilerRoutes.post(
  "/",
  permissions({ roles: [Role.ADMINISTRATOR] }),
  createSupplier.execute
);
suppilerRoutes.delete(
  "/:supplierId",
  permissions({ roles: [Role.ADMINISTRATOR] }),
  deleteSuppiler.execute
);
suppilerRoutes.patch(
  "/:supplierId",
  permissions({ roles: [Role.ADMINISTRATOR] }),
  updateSuppiler.execute
);

export { suppilerRoutes };
