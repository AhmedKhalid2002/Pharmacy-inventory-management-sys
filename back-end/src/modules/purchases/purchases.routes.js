import { Router } from "express";
import { addPurcase, updatePurcase } from "./purchase.controller.js";
import { getAllPurchases } from "./purchase.controller.js";
import { getDetails } from "./purchase.controller.js";
import { getPurchasesByDateAndBy } from "./purchase.controller.js";
import { getSpecifiecSupplier } from "./purchase.controller.js";
import { deletePurchase } from "./purchase.controller.js";
const purcaseRouter=Router();
purcaseRouter.post('/addPurcase',addPurcase);
purcaseRouter.put('/updatePurcase/:id',updatePurcase);
purcaseRouter.get('/getAllpurchases',getAllPurchases);
purcaseRouter.get("/detailsPurchase/:id",getDetails);
purcaseRouter.get("/getSpPuBySupplierDate",getPurchasesByDateAndBy);
purcaseRouter.get("/getSpecefiecSupplier/:id",getSpecifiecSupplier);
purcaseRouter.delete("/deletePurchase/:purchaseId",deletePurchase)
export default purcaseRouter;