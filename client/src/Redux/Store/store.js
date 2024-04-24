import { configureStore } from "@reduxjs/toolkit";
import  imageSlice  from "../Slices/uploadImgSlice";

const store= configureStore({
    reducer:{
        screenshot:imageSlice,
    }
})

export default store;