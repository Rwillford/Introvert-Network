const { User } = require('../models');

const userController = {
    //Get All Users
    getAllUser(req,res) {
        User.find({})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    //Get One User
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({
            path: 'thoughts',
        })
        .populate({
            path: 'friends',
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No User found with this ID'})
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    //Create User
    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },

    //Add Friend to User's Friend list
    createFriend({ params, body }, res) {
        User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { friends: body.friendsId } },
                { new: true }
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No User Found with this ID!'})
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    //Update User
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id}, body, { new: true, runValidators: true})
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No User found wioth this ID!' })
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    },

    //Delete User
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No User found with this ID!' })
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err);
        })
    },

    //Delete Friend :(
    deleteFriend({ params, body }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: body.friendsId }  },
            { new: true}
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No Use found with this ID!' })
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    }

};

module.exports = userController;