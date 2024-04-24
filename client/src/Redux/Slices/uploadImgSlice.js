import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

const initialState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    data: null
}


export const uploadUrlImages = createAsyncThunk('/uploadImages', async (image) => {
    try {

        // const apiUrl = 'http://localhost:3000';
        const apiUrl = 'https://take-url-screenshots.onrender.com';

        const response = await axios.post(`${apiUrl}/UrlImages/uploadScreenshot`, image);

        const imgData = response?.data?.uploadedImage

        const imgObject = {
            img: imgData.secure_url,
            date: imgData.created_at,
            size: imgData.bytes
        }

        localStorage.setItem("uploadFile", JSON.stringify(imgObject));


        return response.data

    } catch (error) {
        console.log(error);
    }
})

export const imageSlice = createSlice({
    name: 'screenshot',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(uploadUrlImages.pending, (state) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                state.data = null
            })
            .addCase(uploadUrlImages.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.data = action.payload
            })
            .addCase(uploadUrlImages.rejected, (state) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.data = null
            })
    }

})
export const { reset } = imageSlice.actions;
export default imageSlice.reducer