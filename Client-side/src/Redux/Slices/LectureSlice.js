import  {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axiosInstance from '../../Helper/axiosInstance'
import toast from 'react-hot-toast';

const initialState = { 
     lectures: []
 };



 // get all lectures by a particular course id 
    
export  const getAllLectures=createAsyncThunk("/course/getLectures",async(courseId)=>{
             try {
                 const response= axiosInstance.get(`/v1/course/${courseId}`);
                 
                toast.promise(response ,{
                     loading:"Fetching  the lectures",
                     success:"Lectures load successfully",
                     error:"failed to load the lectrures"
                })
                 return (await response).data
             } catch (error) {
                return toast.error(error?.response?.data?.message)
             }
 })
                
                        // add the lectures by course  id 
              export      const addLecture =createAsyncThunk("course/addLectrue" , async(data)=>{
                         try {

                              console.log("data property",data);
                              

                              const formData = new FormData();
                              formData.append("lecture", data.lecture);
                                   formData.append("title", data.title);
                                   formData.append("description", data.description);
                              const res =  axiosInstance.post(`/v1/course/${data.id}`,formData);

                              console.log("resonse in slice",res);
                              
                              toast.promise(res,{
                              loading:"Adding lectures ",
                              success:"Lectures added successfully ",
                              error:"faiiled to add lectures"
                            })

                            return (await res).data
                         } catch (error) {
                              console.log("error message is in add lecture ui",error?.response?.data?.message);
                              
                            return toast.error(error?.response?.data?.message)
                         }
                    })              

     // remove the lecture by 

    export const removeLecture=createAsyncThunk("courses/remove / ",async(data)=>{
          try {
               const response = axiosInstance.delete(
                    `/v1/course/lecture/${data.courseId}/${data.lectureId}`);
                                 toast.promise(response, {
                    loading:"Deleting the lecture",
                    success:"Lecture delted successfully",
                    error:"failed to delte the lecture "
               })
          } catch (error) {
               return toast.error(error?.response?.data?.message)
          }
     })
             
const LectureSlice=createSlice({
      name: 'lecture',
      initialState ,
      reducers:{} ,
      extraReducers:(builder)=>{
          builder.addCase(getAllLectures.fulfilled ,(state,action)=>{
               console.log("action in lecture in case oo get all course ",action);
               state.lectures=action.payload?.course?.lectures  || [];
               
          })
          .addCase(addLecture.fulfilled ,(state,action)=>{
                console.log("action in add lcture ",action);
                state.lectures=action?.payload?.course?.lectures ;
          })
      }
})


export default LectureSlice.reducer;


