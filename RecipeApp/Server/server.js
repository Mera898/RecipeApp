
const express  = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

const app = express();

const recipes = require("./routes/api/recipes");


//Body=parser middleware

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());


//DB config
const db = require("./config/keys").mongoURI;

//Connect to MongoDB
mongoose
.connect(
    db,{useNewUrlParser:true}
)
.then(()=> console.log("MongoDB Connected Successfully"))
.catch(err => console.log(err));

//Routes
app.use("/api/recipes", recipes);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Server is up an running on port " + port));
