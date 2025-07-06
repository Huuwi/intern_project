const AuthHelper = require("../Utils/AuthUtils");
const bcrypt = require("bcrypt");

module.exports = {
    login: async (req, res) => {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "missing data!" });
        }

        try {
            const userFound = await globalThis.db.collection("User").findOne({ username });
            if (!userFound) {
                return res.status(400).json({ message: "incorrect username or password" });
            }

            const isMatch = await bcrypt.compare(password, userFound.password);
            if (!isMatch) {
                return res.status(400).json({ message: "incorrect username or password" });
            }

            const { _id: userId, isAdmin } = userFound;
            const token = AuthHelper.genToken({ userId, isAdmin });

            res.cookie("token", token, {
                maxAge: 12 * 60 * 60 * 1000,
                httpOnly: true,
            });

            return res.status(200).json({
                message: "login successfully",
                userData: userFound,
            });

        } catch (error) {
            return res.status(500).json({ message: "Login failed", error: error.message });
        }
    },

    register: async (req, res) => {
        const { username, password, nickName } = req.body;
        if (!username || !password || !nickName) {
            return res.status(400).json({ message: "missing data!" });
        }

        try {
            const existingUser = await globalThis.db.collection("User").findOne({ username });
            if (existingUser) {
                return res.status(400).json({ message: "username already exists" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = {
                username,
                password: hashedPassword,
                nickName,
                isAdmin: false,
            };

            const result = await globalThis.db.collection("User").insertOne(newUser);
            const insertedUser = { ...newUser, _id: result.insertedId };

            const token = AuthHelper.genToken({ userId: insertedUser._id, isAdmin: insertedUser.isAdmin });

            res.cookie("token", token, {
                maxAge: 12 * 60 * 60 * 1000,
                httpOnly: true,
            });

            return res.status(201).json({
                message: "register successfully",
                userData: insertedUser,
            });

        } catch (error) {
            return res.status(500).json({
                message: "registration failed",
                error: error.message,
            });
        }
    }
};
