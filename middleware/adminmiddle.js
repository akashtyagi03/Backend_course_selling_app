const jwt = require('jsonwebtoken');
const { JWT_ADMIN_PASSWORD } = require('../config');

function adminMiddleware(req, res, next){
    const token = req.headers.token;
    const decoded = jwt.verify(token, JWT_ADMIN_PASSWORD);

    if(decoded){
        req.adminId = decoded.AdminId;
        next();
    }else{
        return res.status(401).json({ error: "Unauthorized access, you are not signin" });
    }
}

module.exports = {
    adminMiddleware
};