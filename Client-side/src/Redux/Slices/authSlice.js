import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axiosInstance from '../../Helper/axiosInstance'
import toast from 'react-hot-toast'


// // create the inital state 

const initialState={
    isLoggedIn:(()=>{
        const storedIsLoggedIn=localStorage.getItem("isLoggedIn")
        try {
             if (storedIsLoggedIn) {
                 return JSON.parse(storedIsLoggedIn)
             }else{
                return false;
             }
        } catch (error) {
            localStorage.removeItem(storedIsLoggedIn)
            return error;
        }
    })  (),

    role:localStorage.getItem('role')
    ,

    data:(()=>{
        const storedData=localStorage.getItem("data")
        try {
             if (storedData) {
                return JSON.parse(storedData)
             }
        } catch (error) {
            return error
        }
    })  ()
}



  // create a asyncthunk for network request thunk means in programming term thunk is a function that delays the executin of another function 
  // in the context of the reduxx thunk is a middleware that allow ys to write the asynchronou logic inside the action creators 


      // creating a thunk 
      export const createAccount=createAsyncThunk("auth/signup" , async(data)=>{
        try {
            const res=  axiosInstance.post("user/v1/register",data);
            toast.promise(res,{
                loading:"Wait !.. creating your account ", 
                success:(data)=>{
                    return data?.data?.message;
                },
                error:"failed to create an account "
            });

            console.log("resonse in slice", await res);
            
            // if all things done then return 
            return (await res).data;
        } catch (error) {
            toast.error(error?.response?.data?.message );        }
      })


     export const login=createAsyncThunk("auth/login",async(data)=>{
         try {
             const res=axiosInstance.post("user/v1/login",data);
             toast.promise(res,{
                loading:"Logging in your account",
                // 
                success:"Log In successfully",
                error:"Error in log in"
             }, 
             
            );
            return (await res).data;
             
         } catch (error) {
            toast.error(error?.response?.data?.message );        }
         }
      );

    export const logoutAccount=createAsyncThunk("auth/logout",async()=>{
          try {
            const res=axiosInstance.get("user/v1/logout");
            toast.promise(res,{
                loading:"Logout ..",
                success:(data)=>{
                   return  data?.data?.message;
                },
                error:"Logout failed"
            })
            return (await res).data;
          } catch (error) {
            toast.error(error?.response?.data?.message)
          }
     })

        export const updateprofile=createAsyncThunk("auth/update",async(data)=>{
            try {
                console.log("data in update " ,data);
                  // in asyncthnl we pass only one parameter second is thunk object so we can do it in form of aaray or object 
                  // aur jaha se dipatch kr rhe wha pe aaray ya object se wrap krr k sedn krna h 
                const res = axiosInstance.put(`user/v1/update/${data[0]}`, data[1]);
                toast.promise(res, {
                    loading: "Wait! profile update in progress...",
                    success: (data) => {
                        return data?.data?.message;
                    },
                    error: "Failed to update profile"
                });
                return (await res).data;
            } catch(error) {
                toast.error(error?.response?.data?.message);
            }
        });

        export const getUserData = createAsyncThunk("/user/details", async () => {
            try {
                const res = axiosInstance.get("user/v1/me");

                console.log("res in get data.........", await res);
                
                return (await res).data;
            } catch(error) {
                toast.error(error.message);
            }
        })

       export  const changePassword=createAsyncThunk("user/reset", async(data)=>{
                    try {
                        const response=axiosInstance.post('/user/v1/change-password',data);
                        toast.promise(response,{
                            loading: "Changing password...",
                            success: "Password changed successfully!",
                            error: "Failed to change password",
                        })
                        return (await response).data;
                    } catch (error) {
                        return toast.error(error?.response?.message)
                    }
        })

       
        
const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(login.fulfilled ,(state,action)=>{
            localStorage.setItem('data',JSON.stringify(action?.payload?.user));
            localStorage.setItem('isLoggedIn',JSON.stringify(true));
            localStorage.setItem('role',action?.payload?.user?.role);

            // now manage the state 
            state.isLoggedIn=true;
            state.data=action?.payload?.user;
            state.role=action?.payload?.user?.role;

            console.log("udated store " , state);
            
            console.log("local store ", localStorage.getItem("role"));
            
        }) 
        // for logout reset the state 
        .addCase(logoutAccount.fulfilled ,(state)=>{
            localStorage.clear();
            state.isLoggedIn=false;
            state.data={},
            state.role=""

        })
        // for get user prfile update the state
        .addCase(getUserData.fulfilled, (state, action) => {
            if(!action?.payload?.user) return;
            localStorage.setItem("data", JSON.stringify(action?.payload?.user));
            localStorage.setItem("isLoggedIn", JSON.stringify(true));
            localStorage.setItem("role", action?.payload?.user?.role);
            state.isLoggedIn = true;
            state.data = action?.payload?.user;
            state.role = action?.payload?.user?.role
        });
    }
})

export const {}=authSlice.actions;

export default authSlice.reducer;




// import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
// import axiosInstance from '../../Helper/axiosInstance'
// import toast from 'react-hot-toast'
// // create the inital state

// const initialState = {
//     isLoggedIn: (() => {
//         const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
//         try {
//             return storedIsLoggedIn ? JSON.parse(storedIsLoggedIn) : false;
//         } catch (error) {
//             console.error("Error parsing isLoggedIn from localStorage:", error);
//             localStorage.removeItem('isLoggedIn'); // Consider removing invalid data
//             return false;
//         }
//     })(),
//     role: localStorage.getItem('role') || "",
//     data: (() => {
//         const storedData = localStorage.getItem('data');
//         try {
//             return storedData ? JSON.parse(storedData) : {};
//         } catch (error) {
//             console.error("Error parsing data from localStorage:", error);
//             localStorage.removeItem('data'); // Consider removing invalid data
//             return {};
//         }
//     })()
// };


//   // create a asyncthunk for network request thunk means in programming term thunk is a function that delays the executin of another function
//   // in the context of the reduxx thunk is a middleware that allow ys to write the asynchronou logic inside the action creators


//       // creating a thunk
//       export const createAccount=createAsyncThunk("auth/signup" , async(data)=>{
//         try {
//             const res=  axiosInstance.post("user/v1/register",data);
//             toast.promise(res,{
//                 loading:"Wait !.. creating your account ",
//                 success:(data)=>{
//                     return data?.data?.message;
//                 },
//                 error:"failed to create an account "
//             });

//             console.log("resonse in slice", await res);

//             // if all things done then return
//             return (await res).data;
//         } catch (error) {
//             toast.error(error?.response?.data?.message );        }
//       })


//      export const login=createAsyncThunk("auth/login",async(data)=>{
//          try {
//              const res=axiosInstance.post("user/v1/login",data);
//              toast.promise(res,{
//                 loading:"Logging in your account",
//                 //
//                 success:"Log In successfully",
//                 error:"Error in log in"
//              },

//             );
//             return (await res).data;

//          } catch (error) {
//             toast.error(error?.response?.data?.message );        }
//          }
//       );

//     export const logoutAccount=createAsyncThunk("auth/logout",async()=>{
//           try {
//             const res=axiosInstance.get("user/v1/logout");
//             toast.promise(res,{
//                 loading:"Logout ..",
//                 success:(data)=>{
//                    return  data?.data?.message;
//                 },
//                 error:"Logout failed"
//             })
//             return (await res).data;
//           } catch (error) {
//             toast.error(error?.response?.data?.message)
//           }
//      })

//         export const updateprofile=createAsyncThunk("auth/update",async(data)=>{
//             try {
//                 console.log("data in update " ,data);
//                   // in asyncthnl we pass only one parameter second is thunk object so we can do it in form of aaray or object
//                   // aur jaha se dipatch kr rhe wha pe aaray ya object se wrap krr k sedn krna h
//                 const res = axiosInstance.put(`user/v1/update/${data[0]}`, data[1]);
//                 toast.promise(res, {
//                     loading: "Wait! profile update in progress...",
//                     success: (data) => {
//                         return data?.data?.message;
//                     },
//                     error: "Failed to update profile"
//                 });
//                 return (await res).data;
//             } catch(error) {
//                 toast.error(error?.response?.data?.message);
//             }
//         });

//         export const getUserData = createAsyncThunk("/user/details", async () => {
//             try {
//                 const res = axiosInstance.get("user/v1/me");

//                 console.log("res in get data.........", await res);

//                 return (await res).data;
//             } catch(error) {
//                 toast.error(error.message);
//             }
//         })

//        export  const changePassword=createAsyncThunk("user/reset", async(data)=>{
//                     try {
//                         const response=axiosInstance.post('/user/v1/change-password',data);
//                         toast.promise(response,{
//                             loading: "Changing password...",
//                             success: "Password changed successfully!",
//                             error: "Failed to change password",
//                         })
//                         return (await response).data;
//                     } catch (error) {
//                         return toast.error(error?.response?.message)
//                     }
//         })


// const authSlice=createSlice({
//     name:"auth",
//     initialState,
//     reducers:{},
//     extraReducers:(builder)=>{
//         builder.addCase(login.fulfilled ,(state,action)=>{
//             localStorage.setItem('data',JSON.stringify(action?.payload?.user));
//             localStorage.setItem('isLoggedIn',JSON.stringify(true));
//             localStorage.setItem('role',action?.payload?.user?.role);

//             // now manage the state
//             state.isLoggedIn=true;
//             state.data=action?.payload?.user;
//             state.role=action?.payload?.user?.role;

//             console.log("udated store " , state);

//             console.log("local store ", localStorage.getItem("role"));

//         })
//         // for logout reset the state
//         .addCase(logoutAccount.fulfilled ,(state)=>{
//             localStorage.clear();
//             state.isLoggedIn=false;
//             state.data={},
//             state.role=""

//         })
//         // for get user prfile update the state
//         .addCase(getUserData.fulfilled, (state, action) => {
//             if(!action?.payload?.user) return;
//             localStorage.setItem("data", JSON.stringify(action?.payload?.user));
//             localStorage.setItem("isLoggedIn", JSON.stringify(true));
//             localStorage.setItem("role", action?.payload?.user?.role);
//             state.isLoggedIn = true;
//             state.data = action?.payload?.user;
//             state.role = action?.payload?.user?.role
//         });
//     }
// })

// export const {}=authSlice.actions;

// export default authSlice.reducer;