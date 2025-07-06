const AuthUtils = require("../Utils/AuthUtils")

module.exports = async function(req, res, next) {
try {
            const cookies = req.cookies;
            if (!cookies?.token) {
                return res.status(401).json({ message: 'missing token.' });
            }
            const decodeToken = AuthUtils.validToken(cookies.token)
            req.decodeToken = decodeToken
            next();
        } catch (err) {
            console.log("err when checkUser : ", err)
            return res.status(401).json({ message: 'Unauthorized.' });
        }
}