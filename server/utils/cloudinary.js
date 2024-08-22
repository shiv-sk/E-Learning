const cloudinary = require("cloudinary").v2;
const fs = require("fs");
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET,
    secure:true
})

const uploadOnCloudinary = async (localpath)=>{
    try {
        if(!localpath){
            return null;
        }
        const uploadedMedia = await cloudinary.uploader.upload(localpath , {resource_type:"auto"});
        // console.log("the result of the Cloudinary: " , uploadedMedia);
        cloudinary.url(uploadedMedia.public_id , {
            transformation:[
                {
                    quality:"auto",
                    fetch_format:"auto"
                },
                {
                    width:"500",
                    gravity:"auto",
                    crop:"fill"
                }
            ]
        })
        fs.unlinkSync(localpath);
        return uploadedMedia;
    } catch (error) {
        fs.unlinkSync(localpath);
        console.log("Cloudinary error: " , error);
    }
}
module.exports = uploadOnCloudinary;