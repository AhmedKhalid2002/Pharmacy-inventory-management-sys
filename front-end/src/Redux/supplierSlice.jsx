import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteDataFromApi, fetchDataFromApi, postDataToApi, updateDataFromApi } from "../utils/api";


export const getAllSuplliers = createAsyncThunk('getAllSuplliers', 
  async()=>{
    let data = await fetchDataFromApi('/suppliers/getAllSuplliers');
    console.log(data.results.data);
    return data.results.data
  }
)
export const addSupplier = createAsyncThunk('addSupplier', 
  async(param)=>{

    let data = await postDataToApi('/suppliers/addSupplier', param);
    // console.log(data);
    return data
  }
)
export const deleteSupplier = createAsyncThunk('deleteSupplier', 
  async(id)=>{
    let data = await deleteDataFromApi(`/suppliers/deleteSupplier/${id}`);
    // console.log(data);
    return data
  }
)
export const updateSupplier = createAsyncThunk('updateCategories', 
  async(arr)=>{

    let data = await updateDataFromApi(`/suppliers/updateSupplier/${arr[0][0]}`, arr[1]);
    // console.log(data);
    return data
  }
)



const initialState = {
  supplier:null
}


export const supplierSlice = createSlice({
  name:'supplier',
  initialState,
  extraReducers:(builder)=>{
    builder.addCase(getAllSuplliers.fulfilled, (state, action)=>{
      state.supplier = action.payload;
      state.isLoading = false;
    })
    builder.addCase(getAllSuplliers.rejected, (state)=>{
      state.isLoading = false;
    })
    builder.addCase(getAllSuplliers.pending, (state)=>{
      state.isLoading = true;
    })
  }
})

export let supplierSliceReducer = supplierSlice.reducer;