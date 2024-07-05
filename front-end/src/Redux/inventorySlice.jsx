import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteDataFromApi, fetchDataFromApi, postDataToApi, updateDataFromApi } from "../utils/api";


export const getAllProducts = createAsyncThunk('getProducts', 
  async()=>{
    let data = await fetchDataFromApi('/products/allProducts');
    // console.log(data);
    return data
  }
)
export const getProductByFirstLetter = createAsyncThunk('getProductByFirstLetter', 
  async(id)=>{
    let data = await fetchDataFromApi(`/products/getByFirst?letter=${id}`);
    // console.log(data);
    return data
  }
)
export const getExpiredProducts = createAsyncThunk('getExpiredProducts', 
  async()=>{
    let data = await fetchDataFromApi('/products/expiryProducts');
    console.log(data);
    return data
  }
)
export const getEmptyProducts = createAsyncThunk('getEmptyProducts', 
  async()=>{
    let data = await fetchDataFromApi('/products/getEmpty');
    // console.log(data);
    return data
  }
)
export const addProduct = createAsyncThunk('setProducts', 
  async(param)=>{
    let data = await postDataToApi('/products/addproduct', param);
    // console.log(data);
    return data
  }
)
export const deleteProduct = createAsyncThunk('deleteProducts', 
  async(id)=>{
    let data = await deleteDataFromApi(`/products/deleteProduct/${id}`);
    // console.log(data);
    return data
  }
)
export const updateProduct = createAsyncThunk('updateProducts', 
  async(arr)=>{

    let data = await updateDataFromApi(`/products/updateProduct/${arr[0][0]}`, arr[1]);
    // console.log(data);
    return data
  }
)



const initialState = {
  products:null, ExpiredProducts:null, EmptyProducts:null
}


export const productsSlice = createSlice({
  name:'products',
  initialState,
  extraReducers:(builder)=>{
    builder.addCase(getAllProducts.fulfilled, (state, action)=>{
      state.products = action.payload.results.data;
      state.isLoading = false;
    })
    builder.addCase(getEmptyProducts.fulfilled, (state, action)=>{
      state.EmptyProducts = action.payload.results.data;
      state.isLoading = false;
    })
    builder.addCase(getProductByFirstLetter.fulfilled, (state, action)=>{
      state.products = action.payload.results.results;
      state.ExpiredProducts = action.payload.results.results;
      state.EmptyProducts = action.payload.results.results;
      state.isLoading = false;
    })
    builder.addCase(getAllProducts.rejected, (state)=>{
      state.isLoading = false;
    })
    builder.addCase(getAllProducts.pending, (state)=>{
      state.isLoading = true;
    })
    builder.addCase(getExpiredProducts.fulfilled, (state, action)=>{
      state.ExpiredProducts = action.payload.data;
      state.isLoading = false;
    })
    builder.addCase(getExpiredProducts.rejected, (state)=>{
      state.isLoading = false;
    })
    builder.addCase(getExpiredProducts.pending, (state)=>{
      state.isLoading = true;
    })
  }
})

export let productsSliceReducer = productsSlice.reducer;