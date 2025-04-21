const admin = require("firebase-admin")
// const serviceAccount = require("./config/farmcart-852fb-firebase-adminsdk-fbsvc-b4c12b12b9.json")
// connectDB();

// admin.initializeApp({
//     credential:admin.credential.cert(serviceAccount)
// });
const { initializeApp }=require("firebase/app");
const { getMessaging, getToken }=require("firebase/messaging");

const firebaseConfig = {

    apiKey: "AIzaSyDzIt9BTg3ehG-OuQvXuA9XopMcuCvOz0M",
  
    authDomain: "farmcart-852fb.firebaseapp.com",
  
    projectId: "farmcart-852fb",
  
    storageBucket: "farmcart-852fb.firebasestorage.app",
  
    messagingSenderId: "921870699674",
  
    appId: "1:921870699674:web:a5906fb61afb38ea24a323",
  
    measurementId: "G-FW6F5ED705"
  
  };
  
  
  // Initialize Firebase
  
  const firebaseApp = initializeApp(firebaseConfig);
  
const messaging = getMessaging(firebaseApp);

async function requestPermissionAndGetToken() {
    try {
        const token = await getToken(messaging, { vapidKey: "YOUR_VAPID_KEY" });
        console.log("FCM Token:", token);
    } catch (error) {
        console.error("Error getting token:", error);
    }
}

requestPermissionAndGetToken();


const sendNotification = async (registrationToken,message)=>{
    const sendMessage = {
        token:registrationToken,
        notification:{
            title:"Hello",
            body:"World"
        },
        data:{
            key1:"value1"
        },
        android:{
            priority:"high"
        },
        apns:{
            payload:{
                aps:{
                    badges:42
                }
            }
        }

    };
    admin
        .messaging()
        .send(sendMessage)
        .then(response=>{
            console.log("Successfully sent message :",response);
        }).catche(error=>{
            console.error("Error sending message: ",error);

        })

}