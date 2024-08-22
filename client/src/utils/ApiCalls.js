import axios from "axios";
export const baseurl = `http://localhost:4000/api/v1`
export const getReq = async(url)=>{
    try {
        const response = await axios({
            method:"get",
            url
        })
        // console.log("response from apicall: ", response);
        return response.data
    } catch (error) {
        console.error("error from apicall: ", error);
    }
}

export const postReq = async (url , data , token , isFormData = false) =>{
    console.log("form-data" , isFormData);
    try {
        const response = await axios({
            method:"post",
            url,
            headers:{"Content-Type":isFormData ? "multipart/form-data" :"application/json" , ...(token && {"authorization" : `${token}`})},
            data
        })
        // console.log("reponse of the post request: " , response.data)
        // console.log("the data of the request: " , data);
        return response.data
    } catch (error) {
        console.error("axios post request error" , {
            message:error.message,
            config:error.config,
            response:error.response
        });
        // return {error:true , message:"an error occured"};
        throw error;
    }
}
