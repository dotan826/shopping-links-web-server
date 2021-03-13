import express from 'express';
import * as path from 'path';
import * as login from './components/login';
import * as database from './components/database';
import { ObjectId } from 'mongodb';

const app = express();
const PORT = process.env.PORT || 3080;

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ DEVELOPMENT ONLY
// const cors = require("cors"); // FOR TESTING / DEVELOPMENT !
import cors from 'cors';

const corsOptions = { // FOR TESTING / DEVELOPMENT !
    origin: 'http://localhost:3000'
}
app.use(cors(corsOptions)); // FOR TESTING / DEVELOPMENT !
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ DEVELOPMENT ONLY

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Check if the request made from Secure (HTTPS) url - if not, it redirect the client browser to HTTPS !
app.use(function (req, resp, next) {
    if (req.headers['x-forwarded-proto'] == 'http') {
        return resp.redirect(301, 'https://' + req.headers.host + '/');
    } else {
        return next();
    }
});

// Print Time every time server get called !
app.use((req, resp, next) => {
    console.log(new Date().toLocaleString());
    next();
});

// Add this line after we have the build ----->>>>>
// app.use(express.static(path.join(__dirname, "build")));

// Testing ---->>>>
const start = async () => {
    console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
    console.log("Testing");
    


    console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<\n");
}
start();
// Testing ---->>>>





// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Login
app.post("/login", (req, res) => {
    login.existUser(req.body).then((document) => {
        res.send(document);
    });
});

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Add Category
app.post("/add/category", (req, res) => {
    database.connectAndGetDatabaseObject().then((db)=>{
        database.insertSpecificDocument(db, "Categories", req.body).then((insertResult)=>{
            if(insertResult.insertedCount === 1){
                console.log("Category has been Added Successfully !");
                res.send(true);
            }
            else{
                console.log("Failed to add Category !");
                res.send(false);
            }
        });
    });
});

// Get All Categories
app.get("/get/categories", (req, res) => {
    database.connectAndGetDatabaseObject().then((db) => {
        db.collection("Categories").find({}).toArray((err, documents) => {
            if (err) {
                console.log("Can't Retrieve Categories !");
                res.send(false);
            }
            else {
                console.log("Categories has been Retrieved Successfully !");
                res.send(documents);
            }
        });
    });
});

// Delete Category
app.post("/delete/category", (req, res) => {
    console.log(req.body["_id"]);
    database.connectAndGetDatabaseObject().then((db)=>{
        database.deleteSpecificDocument(db, "Categories", { "_id": new ObjectId(req.body["_id"]) }).then((deleteResult)=>{
            if(deleteResult.deletedCount === 1){
                console.log("Category has been Deleted Successfully !");
                res.send(true);
              }
              else{
                console.log("Failed to Delete Category !");
                res.send(false);
              }
        });
    });
});

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Add Product
app.post("/add/product", (req, res) => {
    database.connectAndGetDatabaseObject().then((db)=>{
        database.insertSpecificDocument(db, "Products", req.body).then((insertResult)=>{
            if(insertResult.insertedCount === 1){
                console.log("Product has been Added Successfully !");
                res.send(true);
            }
            else{
                console.log("Failed to add Product !");
                res.send(false);
            }
        });
    });
});

// Get All Products
app.get("/get/products", (req, res) => {
    database.connectAndGetDatabaseObject().then((db) => {
        db.collection("Products").find({}).toArray((err, documents) => {
            if (err) {
                console.log("Can't Retrieve Products !");
                res.send(false);
            }
            else {
                console.log("Products has been Retrieved Successfully !");
                res.send(documents);
            }
        });
    });
});

// Delete Product
app.post("/delete/product", (req, res) => {
    database.connectAndGetDatabaseObject().then((db)=>{
        database.deleteSpecificDocument(db, "Products", { "_id": new ObjectId(req.body["_id"]), "category": req.body.category }).then((deleteResult)=>{
            if(deleteResult.deletedCount === 1){
                console.log("Product has been Deleted Successfully !");
                res.send(true);
              }
              else{
                console.log("Failed to Delete Product !");
                res.send(false);
              }
        });
    });
});

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Add Request
app.post("/add/request", (req, res) => {
    database.connectAndGetDatabaseObject().then((db)=>{
        database.insertSpecificDocument(db, "Requests", req.body).then((insertResult)=>{
            if(insertResult.insertedCount === 1){
                console.log("Request has been Added Successfully !");
                res.send(true);
            }
            else{
                console.log("Failed to add Request !");
                res.send(false);
            }
        });
    });
});

// Get All Request
app.get("/get/requests", (req, res) => {
    database.connectAndGetDatabaseObject().then((db) => {
        db.collection("Requests").find({}).toArray((err, documents) => {
            if (err) {
                console.log("Can't Retrieve Requests !");
                res.send(false);
            }
            else {
                console.log("Requests has been Retrieved Successfully !");
                res.send(documents);
            }
        });
    });
});

// Delete Request
app.post("/delete/request", (req, res) => {
    database.connectAndGetDatabaseObject().then((db)=>{
        database.deleteSpecificDocument(db, "Requests", { "_id": new ObjectId(req.body["_id"]) }).then((deleteResult)=>{
            if(deleteResult.deletedCount === 1){
                console.log("Request has been Deleted Successfully !");
                res.send(true);
              }
              else{
                console.log("Failed to Delete Request !");
                res.send(false);
              }
        });
    });
});

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>






// Redirect all unknown urls back to main page !
app.get('*', function (req, res) {
    //res.redirect("/index.html");
    res.send("We are Running !"); // FOR TESTING WHILE WORKING ON BACK-END
});

// Start server listening
app.listen(PORT, () => {
    console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
    console.log(`We are running at http://localhost:${PORT} !`);
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
});







