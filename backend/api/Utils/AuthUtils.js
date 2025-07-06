const jwt = require("jsonwebtoken")
const SECRET_KEY = process.env.SECRET_KEY;


module.exports = {
    genToken: (payload, expiresIn = "12h") => {
        return jwt.sign(payload, SECRET_KEY, { expiresIn });
    },

    validToken: (token) => {
        try {
            return jwt.verify(token, SECRET_KEY);
        } catch (err) {
            return null;
        }
    }
}