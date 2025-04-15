import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {toast} from 'react-hot-toast'
import  axiosInstance from '../../Helper/axiosInstance'
const initialState={
  alluserCount: 0,
  subscribeCount: 0
};


   export const getStastData=createAsyncThunk("stat/get", async()=>{
      try {
          const response=axiosInstance.get('/user/v1/alluser/count')
           toast.promise(response,{
            loading:"Fetching the details",
            success:"Fetch record successfully",
            error:"Failed to fetch the details"
           }) 
           return (await response).data;
      } catch (error) {
        toast.error(error?.response?.message)
      }
   })

const statSlice=createSlice({
    name:"stat",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getStastData.fulfilled , (state,action)=>{
          console.log("Acrion in stats data ",action);
          state.alluserCount=action?.payload?.allUserCount;
          state.subscribeCount=action?.payload?.subsciptionStatus;
          
        })
    }
     
})

export default  statSlice.reducer;




