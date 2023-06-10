const express = require("express");
const { auth } = require("../middlewares/auth.middleware");

const emiRoute = express.Router();

emiRoute.use(auth);

emiRoute.post("/calculateEMI",(req,res)=>{
    const {amount,interest,tenure} = req.body;

    const calculateEmi = (amount,interest,tenure) =>{
        let P = amount;
        let r = (interest/12/100);
        let n = tenure;

        let EMI = Math.round((P * r * (( 1 + r )**n))/ ( (( 1 + r )**n)- 1 ));
        let totalPay = EMI * n;
        let interestPay = totalPay - P;

        return {EMI,totalPay,interestPay};
    }

    const emiDetails = calculateEmi(amount,interest,tenure);

    res.status(200).json({data:emiDetails});
})

module.exports = {emiRoute};

