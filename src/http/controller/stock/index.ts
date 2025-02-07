import { Router } from "express";
const stockRoutes = Router();

import { CreateStock } from "./create";
import { HistoryStock } from "./history";

import { userAuthenticate } from "../../middleware/authenticate";

const createStock = new CreateStock();
const historyStock = new HistoryStock();

stockRoutes.use(userAuthenticate);

stockRoutes.post("/", createStock.execute);
stockRoutes.get("/", historyStock.execute);

export { stockRoutes };
