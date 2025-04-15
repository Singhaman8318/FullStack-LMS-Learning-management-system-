import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {toast} from 'react-hot-toast'
import axiosInstance from '../../Helper/axiosInstance'
const initialState={
    key:"",
    subscription_id:"",
    isPaymentVerified:false,
    allPayments:{},
    finalMonths:{},
    monthlySalesRecord:[]
}
  // creates thunk for payments 

      export const razorpayPaymentId=createAsyncThunk("/user/payment",async()=>{
             try {
            const res= axiosInstance.get('/user/v1/payments/razorpay-key');
                    toast.promise(res,{
                        loading:"fetching  key" ,
                        success:"Fetched successfully",
                        error:"failed to feetch the course "

                    })
                    return (await res).data;
             } catch (error) {
                  return   toast.error(error?.error?.message)
             }
      })

          // for purchasing create purchase bundle thunk 

      export const purchaseCourseBundle=createAsyncThunk("/payment/pruchse" , async()=>{
        try {
            const res=axiosInstance.post('/user/v1/payments/subscribe');
            return (await res).data;
        } catch (error) {
      return    toast.error(error?.response?.data?.message)
        }
    })
  
     

        
export const razorpayPaymentVerfiy = createAsyncThunk("/payments/verify", async (data) => {
    try {
        const response = await axiosInstance.post("/user/v1/payments/verify", {
            razorpay_payment_id: data.razorpay_payment_id,
            razorpay_subscription_id: data.razorpay_subscription_id,
            razorpay_signature: data.razorpay_signature
        });
        return response.data;
    } catch(error) {

         console.log(error?.response?.data?.message);
         
        toast.error(error?.response?.data?.message);
    }
});


       

       // get all the payments record 
    export    const getAllPaymentsRecrod=createAsyncThunk('/payments/record' ,async()=>{
            try {
                const res= axiosInstance.get("/user/v1/payments?count=100" , )
                toast.promise(res,{
                    loading:"Getting the payment record ",
                    success:(data)=>{
                         return data?.data?.message;
                    },
                    error:"failed to get the payments "
                })
                return (await res).data;
            } catch (error) {
              return   toast.error("opration failed ")   
            }
       })

         // create the thunk for unsubcribe the payments 
         export const unSubcribeCourse=createAsyncThunk('/payments/unsubcribe' ,async()=>{
             const res= await axiosInstance.post('user/v1/payments/unsubscribe');
               toast.promise(res,{
                loading:"Unsubscribing  the course ",
                success:(data)=>{
                    return data?.data?.message
                } ,
                error:"failed to unsubscribe"
               })
         })

const RazorpaySlice=createSlice({
    name:"razorpay",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.
        addCase(razorpayPaymentId.fulfilled ,(state,action)=>{
            state.key=action?.payload?.key;
        })
        .addCase(purchaseCourseBundle.fulfilled ,(state,action)=>{
            state.subscription_id=action?.payload?.subscription_id;
        })
        .addCase(razorpayPaymentVerfiy.fulfilled ,(state,action)=>{

            console.log("action is slice with fullfied" ,action);
            
              toast.success(action?.payload?.message)
              state.isPaymentVerified=action?.payload?.success;
        })
        .addCase(razorpayPaymentVerfiy.rejected , (state,action)=>{
            console.log("action is slice with rejected " ,action);

             toast.error(action.payload.message)
             state.isPaymentVerified=action?.payload?.success;
        })
        .addCase(getAllPaymentsRecrod.fulfilled ,(state,action)=>{
            console.log("action in all gets payment recrd ",action);
            
            state.allPayments=action?.payload?.subscriptions;
                           
            state.finalMonths=action?.payload?.finalMonths;
            state.monthlySalesRecord=action?.payload?.monthlySalesRecord;
        })
    }
})


export default RazorpaySlice.reducer;


