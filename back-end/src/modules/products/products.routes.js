import { Router } from "express";
import  * as controller from './prodcucts.controller.js';
const productsRouter=Router();


// create ana ew products:
productsRouter.post("/addproduct",controller.addProductContoroller);
// get all the products:
productsRouter.get("/allProducts",controller.getAllProducts);
//update an  define products:
productsRouter.put("/updateProduct/:id",controller.updateProduct);
//delete an products:
productsRouter.delete("/deleteProduct/:id",controller.deleteProducts);
// get  by first  letter:
// letter=الحرف:
productsRouter.get("/getByFirst",controller.getProductsByLetter);
//get  by first name:
productsRouter.get("/getByName",controller.getProductsByName);
// this is the empty products in the inventory:
productsRouter.get("/getEmpty",controller.emptyMedicines);
//get the expiry products in the inventory:
productsRouter.get("/expiryProducts",controller.getExpiryProducts);
export default productsRouter;