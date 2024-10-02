import { Router } from "express";
const userRoutes = Router();

import { CreateUser } from "./create";
import { ListUsers } from "./list";
import { AuthenticateUser } from "./authenticate";
import { userAuthenticate } from "../../middleware/authenticate";
import { permissions } from "../../middleware/permissions";
import { Role } from "@prisma/client";

const createUser = new CreateUser();
const authenticateUser = new AuthenticateUser();
const listUsers = new ListUsers();

userRoutes.post("/", createUser.execute);
userRoutes.post("/auth", authenticateUser.execute);
userRoutes.get(
  "/users",
  userAuthenticate,
  permissions({ roles: [Role.ADMINISTRATOR] }),
  listUsers.execute
);

export { userRoutes };
