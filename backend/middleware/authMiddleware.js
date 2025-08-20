const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const authMiddleware = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1]
      if (!token) return res.status(401).json({ message: "No token provided" });
    jwt.verify(token,process.env.SECRET_KEY,(err, decoded) => {
        req.id = decoded
        next();
    })
    }catch(e){
        console.log(e)
    }
}

module.exports = authMiddleware