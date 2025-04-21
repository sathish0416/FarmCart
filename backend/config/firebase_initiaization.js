const admin = require("firebase-admin")
const serviceAccount = require("./config/farmcart-852fb-firebase-adminsdk-fbsvc-b4c12b12b9.json")

const initializeFirebaseApp = async()=>{
    await admin.initializeApp({
    credential:admin.credential.cert(serviceAccount)
});
}
module.exports=initializeFirebaseApp;
