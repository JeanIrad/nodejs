const express = require('express');

const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const { signup, login } = authController;
const { getUser, getAllUsers, updateUser, deleteUser, createUser } =
  userController;

const router = express.Router();
router.post('/signup', signup);
router.post('/login', login);

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
