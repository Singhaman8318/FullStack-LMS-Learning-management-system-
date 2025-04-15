import authSliceReducer from './Slices/authSlice'
import courseSliceReducer from './Slices/courseSlice'
import razorpayReducer  from './Slices/RazorpaySlice'
import lectureReducer from './Slices/LectureSlice'
import statReducer from './Slices/Statslice'

import { configureStore } from '@reduxjs/toolkit';
  const store=configureStore({
    reducer:{
        auth: authSliceReducer,
        courses:courseSliceReducer,
        razorpay:razorpayReducer,
        lecture:lectureReducer ,
        stat:statReducer
    },
     
    devTools:true
})

export default store;