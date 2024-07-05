import { Router } from "express";
import controllerAddSuplier from "./supplier.conroller.js";
import {controllerDeleteSuplier} from './supplier.conroller.js';
import { controllerUpdateSupplier } from "./supplier.conroller.js";
import { getAllSupplier } from "./supplier.conroller.js";
let routerSuppliers=Router();
// add a new suppliers:
// superAdmin:
routerSuppliers.post("/addSupplier",controllerAddSuplier);
// delete supllier:
routerSuppliers.delete("/deleteSupplier/:id",controllerDeleteSuplier);
// updateSupplier:
routerSuppliers.put("/updateSupplier/:id",controllerUpdateSupplier);
// get all suplliers:
routerSuppliers.get("/getAllSuplliers",getAllSupplier)
export default routerSuppliers;