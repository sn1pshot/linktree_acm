require('dotenv').config()
const jwt = require('jsonwebtoken');

exports.verifyToken = (req,res,next) => {
  const token = req.cookies.access_token;
  console.log(req.cookies);
    if (token==null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) =>{
        if(err){
            console.log(err);
            return res.sendStatus(403);
        }

        req.user_id=decoded.user_id;
        req.email=decoded.email;

        next();
    })
}

