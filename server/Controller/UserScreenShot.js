import cloudinary from '../Utils.js'

export const urlImages = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(404).json("Upload Image Not Found");
        }

        const uploadedImage = await cloudinary.uploader.upload(req.file.path);

        console.log(uploadedImage);

        return res.status(200).json({ message: "Screenshot Successfully Saved", uploadedImage })

    } catch (error) {
        console.log(error);
        return res.status(500).json("Failed To Upload/Get The Images");
    }
}