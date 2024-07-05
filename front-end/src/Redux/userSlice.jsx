import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteDataFromApi, fetchDataFromApi, postDataToApi } from "../utils/api";


export const getAllUsers = createAsyncThunk('getAllUsers', 
  async()=>{
    let data = await fetchDataFromApi('/users/allAdmins');
    console.log(data);
    return data.results.data
  }
)
export const addNewUser = createAsyncThunk('addNewUser', 
  async(param)=>{
    let data = await postDataToApi('/users/signup', param);
    console.log(data);
    return data.results
  }
)
export const deleteUser = createAsyncThunk('deleteUser', 
  async(id)=>{
    let data = await deleteDataFromApi(`/users/admin/${id}`);
    console.log(data);
    return data.results;
  }
)


const initialState = {
  userToken:JSON.parse(localStorage.getItem('userToken')),
  users:null
}


export const userSlice = createSlice({
  name:'user',
  initialState,
  reducers:{
    setUserToken:(state,action)=>{
      state.userToken = action.payload
    }
  },
  extraReducers:(builder)=>{
    builder.addCase(getAllUsers.fulfilled, (state, action)=>{
      state.users = action.payload;
      state.isLoading = false;
    })
    builder.addCase(getAllUsers.rejected, (state)=>{
      state.isLoading = false;
    })
    builder.addCase(getAllUsers.pending, (state)=>{
      state.isLoading = true;
    })
  }
})

export let userSliceReducer = userSlice.reducer;
export let {setUserToken} = userSlice.actions;