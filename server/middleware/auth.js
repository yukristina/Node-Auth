const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {

        // check if token is passed or not
        const token = req.header("x-auth-token");
        if (!token) {
            return res.status(401).json({ msg: "No auth token, access denied!" });
        }

        // if passed, check if the token is true
        const verified = jwt.verify(token, "passwordKey");

        if (!verified) {
            return res.status(401).json({ msg: "Token verification failed, authorization denied!" });
        }

        // if true that means it is the user then give the id
        req.user = verified.id;
        req.token = token;
        // only after writing next, the next function works after this function
        next();

    } catch (error) {
        return res.status(500).json({ error: error.message });

    }
};

module.exports = auth;