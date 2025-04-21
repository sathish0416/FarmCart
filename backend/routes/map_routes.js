const express = require("express");
const {getCoordinates}= require("../map_api/map_controllers");
const router = express.Router();

router.get("/geocode",getCoordinates);

module.exports=router;