const httpError = require("../Models/http-error");
const axios = require('axios');

const getCoordsForAddress = async (address) =>{
    try{
        const response = await axios.get(`http://api.positionstack.com/v1/forward`, {params:{access_key:`${process.env.LOCATION_KEY}`, query:`${address}`}}).then(res => {return res.data});
        const data = {
            lat: response.data[0].latitude,
            lng: response.data[0].longitude
        }
        return data;
    }catch(err){
        console.log("err");
    }
}
module.exports= getCoordsForAddress;