import express from 'express';
import cors from 'cors';
import userRouter from './src/modules/users/users.routes.js';
import routerSuppliers from './src/modules/suppliers/suppliers.routes.js';
import routerCategories from './src/modules/categories/categories.routes.js';
import productsRouter from './src/modules/products/products.routes.js';
import purcaseRouter from './src/modules/purchases/purchases.routes.js';
import invoicesRouter from './src/modules/invoices/invoices.routes.js';
const app=express();
app.use(express.json());
app.use(cors());
app.use("/users",userRouter);
app.use("/suppliers",routerSuppliers);
app.use("/products",productsRouter);
app.use("/categories",routerCategories);
app.use("/invoices",invoicesRouter);
app.use("/purchase",purcaseRouter);
app.all("*",(req,res,next)=>
{
    return res.json({sucess:false,message:"there is no requets by their url (there api is not founded)"});
})
app.listen(3000,()=>
{
    console.log("the server is running",3000);
});