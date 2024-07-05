import { Router } from "express";
import * as invoicesController  from './invoices.controller.js';
const invoicesRouter=Router();
// create a anew invoices:
invoicesRouter.post("/addInvoivce",invoicesController.addInvoice);
// update the invoice:
invoicesRouter.patch("/updateInvoice/:id",invoicesController.updateInvoice);
// get all the invoices:
invoicesRouter.get("/allInvoices",invoicesController.getAllinvoices );
// get an speciefic invoice:
invoicesRouter.get("/spInvoice/:id",invoicesController.getSpeciefic);
// get day invoices:
invoicesRouter.get("/getDayInvoices",invoicesController.getDay);
// delete an invoice =:
invoicesRouter.delete("/deleteInvoice/:invoiceId",invoicesController.deleteInvoice);

















export default invoicesRouter;
