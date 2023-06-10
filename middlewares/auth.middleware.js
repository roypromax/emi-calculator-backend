require('dotenv').config();

const jwt = require('jsonwebtoken');

const auth = (req,res,next)=>{

    try {
        const token = req.headers?.authorization.split(" ")[1];
        jwt.verify(token, process.env.privateKey, function(err, decoded) {
            if(decoded){
                req.body.name = decoded.name;
                req.body.email = decoded.email
                next();
            }else{
                console.log(err);
                res.status(400).json({error:err});
            }
          });
    } catch (error) {
        console.log(error);
        res.status(400).json({error:error});
    }

}



module.exports = {auth};