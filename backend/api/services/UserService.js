const { ObjectId } = require('mongodb');

const getAllUsers = async () => {
    return await globalThis.db.collection('User').find({}).toArray();
};

const getUserById = async (userId) => {
    return await globalThis.db.collection('User').findOne({ _id: new ObjectId(userId) });
};

const getUserByUsername = async (username) => {
    return await globalThis.db.collection('User').findOne({ username });
};

const addNewUser = async ({ username, password, nickName, isAdmin = false }) => {
    const result = await globalThis.db.collection('User').insertOne({
        username,
        password,
        nickName,
        isAdmin
    });
    return { _id: result.insertedId, username, password, nickName, isAdmin };
};

const updateUser = async ({ userId, username, password, nickName, isAdmin }) => {
    const updateDoc = {
        ...(username !== undefined && { username }),
        ...(password !== undefined && { password }),
        ...(nickName !== undefined && { nickName }),
        ...(isAdmin !== undefined && { isAdmin }),
    };

    const result = await globalThis.db.collection('User').updateOne(
        { _id: new ObjectId(userId) },
        { $set: updateDoc }
    );

    if (result.modifiedCount === 0) return null;

    return await globalThis.db.collection('User').findOne({ _id: new ObjectId(userId) });
};

const deleteUser = async (userId) => {
    const result = await globalThis.db.collection('User').deleteOne({ _id: new ObjectId(userId) });
    return result.deletedCount > 0;
};

const UserService = {
    getAllUsers,
    getUserById,
    getUserByUsername,
    addNewUser,
    updateUser,
    deleteUser
};

module.exports = UserService;
