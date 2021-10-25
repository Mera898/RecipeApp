const express  = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

const path = require("path");

const app = express();

//const recipes = require("/routes/api/recipes.js");
const recipes = require("./routes/api/recipes");


const port = process.env.PORT || 5000;


//Body=parser middleware

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.use(express.static('./client/build'));

console.log("client build");
//DB config
const db = require("./config/keys").mongoURI;

//Connect to MongoDB
mongoose
.connect(
    process.env.MONGODB_URI||db,{useNewUrlParser:true}
)
.then(()=> console.log("MongoDB Connected Successfully"))
.catch(err => console.log(err));

//Routes
app.use("/api/recipes", recipes);

//Serve static assests if in production

if(process.env.NODE_ENV === 'production'){
    //Set static folder
    app.use(express.static(path.join("client","build")))
    
    app.get('*',(req,res)=>{

        res.sendFile(path.resolve(__dirname,'client','build','index.html'));

    });
}



//  other app.use middleware
//app.use(express.static(path.join(__dirname,"client","build")))


//...
//right before your app.listen() add this:
/*
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"client","build","index.html"));
});
*/

app.listen(port, () => console.log("Server is up an running on port " + port));



