const { User } = require('../models');

const userController = {
    //Get All Users
    getAllUser(req,res) {
        User.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
    }

    //Get One User

    //Create User

    //Update User

    //Delete User
}