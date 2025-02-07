import express from "express";
import cors from "cors";
const app = express();

import { productRoutes } from "./http/controller/product";
import { stockRoutes } from "./http/controller/stock";
import { suppilerRoutes } from "./http/controller/suppiler";
import { userRoutes } from "./http/controller/user";
import { auditRoutes } from "./http/controller/audit";
import { notificationRoutes } from "./http/controller/notification";

app.use(express.json());
app.use(cors());

app.use("/product", productRoutes);
app.use("/supplier", suppilerRoutes);
app.use("/stock", stockRoutes);
app.use("/user", userRoutes);
app.use("/audit", auditRoutes);
app.use("/notification", notificationRoutes);

app.listen(3333, () => console.log("Server running"));
