
const res = require('express/lib/response');
const jwt = require('jsonwebtoken');
const Jwt_Sign = "Abhi@bhai"



const fetchuser = (req,res,next) =>{
    const token = req.header('auth-token');
    try {
    if(!token){
        return res.status(401).send({error:"please login using Valid token"})
    }
    const data = jwt.verify(token,Jwt_Sign)
    req.user = data.user;
    next();
}catch (error) {
    return res.status(401).send({error:"please login using Valid token"})
}
}

module.exports = fetchuser;