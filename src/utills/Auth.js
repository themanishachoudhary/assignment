const jsonwebtoken = require("jsonwebtoken");

const generateToken = (payload) => {
    return jsonwebtoken.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
}

const Authentication = (req, res, next)=>{
    try{
    const authorization = req.headers.authorization;
    const token = authorization.split(" ")[1];
    
    const decode = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    if(!decode){
        return res.status(401).json({message: "unauthorizes"});
    }
    req.user = decode.id;
    next();
}catch(err){
    console.error(err.message);
    return res.status(500).json({message: "Server error", error: err.message}); 
}

}
module.exports = {generateToken, Authentication};