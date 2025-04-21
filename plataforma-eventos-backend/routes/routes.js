const express = require('express')
const router = express.Router();
const UserController = require('../api/controllers/UserController')

router.get('/users/:id', (req, res) => {
    const filter = req.query.filter;

    const version = req.headers.version;

    return res.status(200).send("some data");
});

router.post('/users', UserController.createUser);

module.exports = router;