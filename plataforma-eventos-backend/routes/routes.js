const express = require('express')
const router = express.Router();
const UserController = require('../api/controllers/UserController');
const authenticate = require('../middlewares/authentication');

router.post('/users', UserController.createUser);
router.put('/users/validation', authenticate, UserController.validateAccount);

module.exports = router;