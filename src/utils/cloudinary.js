import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
      // if file is not on the localhost 
        if(!localFilePath) return null
        // upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
          resource_type: 'auto'
        })
        // file has been uploaded successfully
        // console.log("File is uploaded on cloudinary",
        //   response.url
        // );
        fs.unlinkSync(localFilePath)
        return response;
    } catch (error) {
      // it will do remove the locally saved temporart file as the upload operation got failed
        fs.unlinkSync(localFilePath)
        return null;
    }
}

export {uploadOnCloudinary}