const router = require('express').Router();
const {
  getUsers,
  getOneUser,
  addUser,
  updateUser,
  deleteUser,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(addUser);

// /api/users/:userId
router.route('/:userId')
      .get(getOneUser)
      .put(updateUser)
      .delete(deleteUser);

// /api/users/:userId/friends
router.route('/:userId/friends').post(addReaction);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').delete(deleteReaction);

module.exports = router;