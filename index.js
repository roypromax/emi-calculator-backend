const express = require("express");

const {connection} = require("./configs/db");

const {userRoute} = require("./routes/user.routes");

const cors = require("cors");
const { emiRoute } = require("./routes/emi.routes");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/",(req,res)=>{
    res.status(200).send(`EMI Calculator Backend
    Routes: 
    1.POST  /user/register 
    2.POST /user/login  
    3.GET /user/profile  
    4.POST /emi/calculateEMI `);
})

app.use("/user",userRoute);

app.use("/emi",emiRoute);

app.listen(8080,async function(){
    try {
        await connection;
        console.log("Connected to database");
    } catch (error) {
        console.log("Error in connecting to database");
        console.log("Error",error);
    }
    console.log("Server is running at port 8080");
})