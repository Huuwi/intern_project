const AuthUtils = require("../Utils/AuthUtils")

module.exports = async function(req, res, next) {
try {
            const cookies = req.cookies;
            if (!cookies?.token) {
                return res.status(401).json({ message: 'missing token.' });
            }
            const decodeToken = AuthUtils.validToken(cookies.token)
            if (!decodeToken?.isAdmin) {
                return res.status(402).json({ message: 'forbidden' });
            }
            req.decodeToken = decodeToken
            next();
        } catch (err) {
            console.log("err when checkAdmin : ", err)
            return res.status(401).json({ message: 'Unauthorized.' });
        }
}