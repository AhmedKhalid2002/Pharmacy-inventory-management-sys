import { configureStore } from "@reduxjs/toolkit";
import { userSliceReducer } from "./userSlice";
import { categoriesSliceReducer } from "./medicineSlice";
import { productsSliceReducer } from "./inventorySlice";
import { supplierSliceReducer } from "./supplierSlice";
import { purchaseSliceReducer } from "./purchaseSlice";
import { invoiceSliceReducer } from "./invoiceSlice";

export const store = configureStore({
  reducer:{
    user:userSliceReducer,
    inventory:productsSliceReducer,
    categories:categoriesSliceReducer,
    supplier:supplierSliceReducer,
    purchase:purchaseSliceReducer,
    invoice:invoiceSliceReducer,
  }
})