import { Router } from "express";
import { Role } from "@prisma/client";
const productRoutes = Router();

import { CreateProduct } from "./create";
import { DeleteProduct } from "./delete";
import { UpdateProduct } from "./update";
import { ListProducts } from "./list";

import { userAuthenticate } from "../../middleware/authenticate";
import { permissions } from "../../middleware/permissions";

const createProduct = new CreateProduct();
const updateProduct = new UpdateProduct();
const deleteProduct = new DeleteProduct();
const listProducts = new ListProducts();

productRoutes.use(userAuthenticate);
productRoutes.use(permissions({ roles: [Role.ADMINISTRATOR, Role.EMPLOYEE] }));

productRoutes.get("/", listProducts.execute);
productRoutes.post("/", createProduct.execute);
productRoutes.delete("/:productId", deleteProduct.execute);
productRoutes.patch("/:productId", updateProduct.execute);

export { productRoutes };
