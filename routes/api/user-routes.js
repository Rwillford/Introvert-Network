const router = require('express').Router();
const {
    getAllUser,
    getUserById,
    createUser,
    createFriend,
    updateUser,
    deleteUser,
    deleteFriend
} = require('../../controllers/user-controller');

router
    .route('/')
    .get(getAllUser)
    .post(createUser);

router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

router
    .route('/:userId/friends/:friendId')
    .post(createFriend)
    .delete(deleteFriend);
    
module.exports = router;