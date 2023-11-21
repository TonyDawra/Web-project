const jwt = require("jsonwebtoken");
require('dotenv').config();

// middleware function
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token === null){
        // 401 Unauthorized
        return res.sendStatus(401)
    }

// Verifying the token using the secret key
    jwt.verify(token, process.env.SECRET_KEY, (err, user)=>{
        if(err){
            // 403 Forbidden
            return res.sendStatus(403)
        }
        req.user = user;
    });
    
    // Passing control to the next middleware or route handler
    next();
}

module.exports = authenticateToken;