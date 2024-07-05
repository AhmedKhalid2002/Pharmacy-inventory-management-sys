import { Router } from "express";
import { addCategory } from "./categories.controller.js";
import { deleteCategory } from "./categories.controller.js";
import { updateCategory } from "./categories.controller.js";
import { getAllCategories } from "./categories.controller.js";
import { getProductCatefory } from "./categories.controller.js";
import { getAllCategoiresProduts } from "./categories.controller.js";
let routerCategories=Router();

// add category:
routerCategories.post("/addCategory",addCategory);
// delete the products:
routerCategories.delete("/deleteCategory",deleteCategory);
// update the products:
routerCategories.put("/updateCategory",updateCategory);
// get all the categories:
routerCategories.get("/getAllCategories",getAllCategories);
// get an specifiec category:
routerCategories.get("/getCategoryProducts",getProductCatefory);
// get an category products:
routerCategories.get("/getAllproductsCategories",getAllCategoiresProduts)
export default routerCategories;