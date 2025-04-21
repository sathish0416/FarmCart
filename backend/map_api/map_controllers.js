const { Client } = require("@googlemaps/google-maps-services-js");
const dotenv=require("dotenv");
const client = new Client({});
dotenv.config();

exports.getCoordinates = async (req,res)=>{
    try{
        
        const {address}=req.query;
        if(!address){
            return res.status(400).json({message:"Address is required"});
        }
        const response = await client.geocode({
            params:{
                address:address,
                key:process.env.GOOGLE_MAPS_API_KEY

            }
        });
        const location = response.data.results[0].geometry.location;
        res.json({latitude:location.lat,longitude:location.lng});
    }catch(e){
        res.status(500).json({message:"Error fetching coordinates",error:e.message});

    }
};