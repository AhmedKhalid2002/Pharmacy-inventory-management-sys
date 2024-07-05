import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteDataFromApi, fetchDataFromApi, postDataToApi, updateDataFromApi } from "../utils/api";


export const getAllInvoices = createAsyncThunk('getAllInvoices', 
  async()=>{
    let data = await fetchDataFromApi('/invoices/allInvoices');
    // console.log(data.results.data);
    return data.results.data
  }
)
export const getSpecificInvoice = createAsyncThunk('getSpecificInvoice', 
  async(id)=>{
    let data = await fetchDataFromApi(`invoices/spInvoice/${id}`);
    console.log(data.results);
    return data.results
  }
)
export const addInvoivce = createAsyncThunk('addInvoivce', 
  async(param)=>{
    let data = await postDataToApi('/invoices/addInvoivce', param);
    // console.log(data);
    return data
  }
)
export const deleteInvoivce = createAsyncThunk('deleteInvoivce', 
  async(id)=>{
    let data = await deleteDataFromApi(`/invoices/deleteInvoice/${id}`);
    console.log(data);
    return data
  }
)
// export const updateProduct = createAsyncThunk('updateProducts', 
//   async(arr)=>{

//     let data = await updateDataFromApi(`/products/updateProduct/${arr[0][0]}`, arr[1]);
//     // console.log(data);
//     return data
//   }
// )



const initialState = {
  invoices:null
}


export const invoiceSlice = createSlice({
  name:'invoices',
  initialState,
  extraReducers:(builder)=>{
    builder.addCase(getAllInvoices.fulfilled, (state, action)=>{
      state.invoices = action.payload;
      state.isLoading = false;
    })
    builder.addCase(getAllInvoices.rejected, (state)=>{
      state.isLoading = false;
    })
    builder.addCase(getAllInvoices.pending, (state)=>{
      state.isLoading = true;
    })
  }
})

export let invoiceSliceReducer = invoiceSlice.reducer;