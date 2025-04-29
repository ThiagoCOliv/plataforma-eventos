const express = require('express')
const router = express.Router();
const UserController = require('../api/controllers/UserController')

router.post('/users', UserController.createUser);
router.put('/users/validation', UserController.validateAccount);

module.exports = router;