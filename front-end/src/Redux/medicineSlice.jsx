import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteDataFromApi, fetchDataFromApi, postDataToApi, updateDataFromApi } from "../utils/api";


export const getCategories = createAsyncThunk('getCategories', 
  async()=>{
    let data = await fetchDataFromApi('/categories/getAllCategories');
    // console.log(data);
    return data
  }
)
export const setCategories = createAsyncThunk('setCategories', 
  async(param)=>{
    let data = await postDataToApi('/categories/addCategory', param);
    // console.log(data);
    return data
  }
)
export const deleteCategories = createAsyncThunk('deleteCategories', 
  async(Name)=>{
    let data = await deleteDataFromApi(`/categories/deleteCategory?name=${Name}`);
    // console.log(data);
    return data
  }
)
export const updateCategories = createAsyncThunk('updateCategories', 
  async(arr)=>{
    let param = {
        name_category:arr[1]
    }

    let data = await updateDataFromApi(`/categories/updateCategory?name=${arr[0]}`, param);
    console.log(data);
    return data
  }
)



const initialState = {
  categories:null
}


export const categoriesSlice = createSlice({
  name:'categories',
  initialState,
  extraReducers:(builder)=>{
    builder.addCase(getCategories.fulfilled, (state, action)=>{
      state.categories = action.payload.results.data;
      state.isLoading = false;
    })
    builder.addCase(getCategories.rejected, (state)=>{
      state.isLoading = false;
    })
    builder.addCase(getCategories.pending, (state)=>{
      state.isLoading = true;
    })
  }
})

export let categoriesSliceReducer = categoriesSlice.reducer;