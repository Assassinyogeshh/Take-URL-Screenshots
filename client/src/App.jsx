import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadUrlImages } from "./Redux/Slices/uploadImgSlice";
const App = () => {
  const [urlScreenshot, setUrlScreenshot] = useState();

  const loading = useSelector((state) => state.screenshot?.isLoading);
  const dispatch = useDispatch();

  const uploadImgData = JSON.parse(localStorage.getItem("uploadFile"));

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = "539a639895de94c3a362b7881cc33fcaf92ddc4c7eab438a";
      const response = await fetch(
        `https://api.pikwy.com?u=${urlScreenshot}&tkn=${token}&fs=0`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const blob = await response.blob();
        const imageURLS = URL.createObjectURL(blob);

        const formData = new FormData();
        formData.append("image", blob, "screenshot.jpg");

        if (imageURLS) {
          const response = dispatch(uploadUrlImages(formData));
          console.log(formData);
          alert("Screenshot Successfully Uploaded");
        }
      } else {
        console.error("Failed to fetch screenshot:");
      }
    } catch (error) {
      console.error("Error fetching screenshot:", error);
      alert("failed To Upload Image Screenshot Check Console For More Details");
    }
  };

  return (
    <div className="flex bg-sky-600 justify-center items-center w-full h-auto flex-col">
      <h1 className="text-white text-[2rem]">Take URL Screenshot</h1>
      <form
        className="flex justify-center items-center flex-col gap-y-3 p-2 border rounded-lg h-[20rem] w-[70%]"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          value={urlScreenshot}
          onChange={(e) => setUrlScreenshot(e.target.value)}
          className="w-[50%] h-[2rem] outline-none"
          placeholder="Enter URL"
        />
        <button type="submit" className="w-[20%] bg-white rounded-lg h-[2rem]">
          Submit
        </button>
      </form>

      {!loading ? (
        uploadImgData ? (
          <div className="mt-4 h-auto flex flex-col justify-center items-center  bg-sky-600 w-full">
            <img
              src={uploadImgData.img}
              alt="Screenshot"
              className="h-[100%] w-[90%]"
            />
            <p className=" text-white text-800 font-[500] text-[1.5rem]">
              Date: {uploadImgData.date}
            </p>
            <p className=" text-white text-800 font-[500] text-[1.5rem]">
              Image Size: {uploadImgData.size} bytes
            </p>
          </div>
        ) : (
          <p className="text-2xl mt-5 flex justify-center items-center w-full text-white">
            Start Adding To Get URL Screenshot
          </p>
        )
      ) : (
        <p className="text-[1rem] text-white">Loading...</p>
      )}
    </div>
  );
};

export default App;
