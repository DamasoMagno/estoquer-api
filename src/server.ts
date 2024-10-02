import express from "express";
import cors from "cors";
const app = express();

import { productRoutes } from "./https/controller/product";
import { stockRoutes } from "./https/controller/stock";
import { suppilerRoutes } from "./https/controller/suppiler";
import { userRoutes } from "./https/controller/user";
import { auditRoutes } from "./https/controller/audit";
import { notificationRoutes } from "./https/controller/notification";

app.use(express.json());
app.use(cors());

app.use("/product", productRoutes);
app.use("/supplier", suppilerRoutes);
app.use("/stock", stockRoutes);
app.use("/user", userRoutes);
app.use("/audit", auditRoutes);
app.use("/notification", notificationRoutes);

app.listen(3333, () => console.log("Server running"));
