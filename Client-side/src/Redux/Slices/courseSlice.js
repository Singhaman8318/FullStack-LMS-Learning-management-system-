import { createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import axiosInstance from '../../Helper/axiosInstance'
import { createAsyncThunk } from "@reduxjs/toolkit"
const initialState={
    courseData:[]
}


          export const getAllCourse=createAsyncThunk("courses/get",async()=>{
               try {
                const res=axiosInstance.get("v1/course");

                console.log("res",res);
                
                toast.promise(res,{
                    loading:"Loading course data ...",
                    success:"course loaded successfully",
                    error:"failed to get the courses"
                })
                 console.log("log " , (await res).data.courses);
                 
                //  return (await res).data.courses;
                return (await res).data.courses;
               } catch (error) {
                toast.error(error?.response?.message)
               }
          })


    // delete the course 
    export const deleteCourse=createAsyncThunk("course/delete", async(id)=>{
      try {
          const response=axiosInstance.delete(`v1/course/${id}`);
          toast.promise(response,{
            loading:"Deleting the course",
            success:"Delted course succesfully " , 
            error:"Failed to delte the course"
          })
      } catch (error) {
        toast.error(error?.response?.message)
      }
    })

          export const createNewCourse=createAsyncThunk("/course/post" , async(data)=>{
              try {

                const formData=new FormData();
                formData.append("title",data?.title);
                formData.append("description",data?.description);
                formData.append("category",data?.category);
                formData.append("createdBy",data?.createdBy);
                formData.append("thumbnail",data?.thumbnail);

                 const res=axiosInstance.post('v1/course/',formData);
                 await toast.promise(res,{
                    loading:"Creating new Course",
                    success:"Course created successfully",
                    error:"failed to create the course"
                 })

                 console.log(res);

                 return (await res).data;
                 
              } catch (error) {
                 toast.error(error?.response?.message)
              }
          })
const courseSlice=createSlice({
    name:"courses",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllCourse.fulfilled,(state,action)=>{
            console.log("actoin 1" , action.payload);
            
            if (action.payload) {
                console.log("action payload ",action.payload);
                
                state.courseData=[...action.payload]
            }
        })
    }
})


export default courseSlice.reducer;
