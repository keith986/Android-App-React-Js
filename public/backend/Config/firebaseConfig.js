const admin = require("firebase-admin")
const { initializeApp } = require("firebase-admin/app");
const { getAuth } =  require("firebase-admin/auth");
const serviceAccount = require("./service-account-file.json");

const firebaseConfig = {
 credential: admin.credential.cert(serviceAccount)
};

const defaultApp = initializeApp(firebaseConfig); 
 const auth  = getAuth(defaultApp)
 
module.exports = auth