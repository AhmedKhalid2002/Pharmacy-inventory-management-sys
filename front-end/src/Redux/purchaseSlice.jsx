import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteDataFromApi, fetchDataFromApi, postDataToApi, updateDataFromApi } from "../utils/api";


export const getAllPurchase = createAsyncThunk('getAllPurchase', 
  async()=>{
    let data = await fetchDataFromApi('/purchase/getAllpurchases');
    // console.log(data.results.data);
    return data.results.data
  } 
)
export const getPurchaseDetails = createAsyncThunk('getPurchaseDetails', 
  async(id)=>{
    let {results} = await fetchDataFromApi(`/purchase/detailsPurchase/${id}`);
    // console.log(data.results.data);
    return results
  }
)

export const addpurchase = createAsyncThunk('addpurchase', 
  async(param)=>{

  //   let param ={
  //   array:[{
  //     name:"qwertyuiop",
  //     price_of_sale:134,
  //     price_of_buy:124,
  //     quantity:124524,
  //     sale:10,   // must be  10 , 15 , 0 , 5
  //     expiry_date:"1/2/23",
  //     packets_section:12,
  //     inventory_id:1,
  //     category_name:"eye"
  // }],
  //   total_number_of_products:1200,	
  //   total_price_purchases:12000,
  //   supplier_id:6,
  //   rest_of_mony:0,
  //   cash:"YES"
  // }

    let data = await postDataToApi('/purchase/addPurcase', param);
    // console.log(data);
    return data
  }
)
export const deletepurchase = createAsyncThunk('deletepurchase', 
  async(values)=>{
    // console.log(values);
    let param = {
      IdSuperAdmin:values[0]
    }
    let data = await deleteDataFromApi(`/purchase/deletePurchase/${values[1]}`, param);
    console.log(data);
    return data
  }
)
export const updatepurchase = createAsyncThunk('updatepurchase', 
  async(arr)=>{
    let data = await updateDataFromApi(`/purchase/updatePurcase/${arr[0]}`, arr[1]);
    return data
  }
)



const initialState = {
  purchase:null
}


export const purchaseSlice = createSlice({
  name:'purchase',
  initialState,
  extraReducers:(builder)=>{
    builder.addCase(getAllPurchase.fulfilled, (state, action)=>{
      state.purchase = action.payload;
      state.isLoading = false;
    })
    builder.addCase(getAllPurchase.rejected, (state)=>{
      state.isLoading = false;
    })
    builder.addCase(getAllPurchase.pending, (state)=>{
      state.isLoading = true;
    })
  }
})

export let purchaseSliceReducer = purchaseSlice.reducer;