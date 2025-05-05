const express = require('express')
const router = express.Router();
const UserController = require('../api/controllers/UserController');
const EventController = require('../api/controllers/EventController');
const authenticate = require('../middlewares/authentication');

router.post('/user', UserController.createUser);
router.post('/user/login', UserController.loginUser);

router.put('/user/validation', authenticate, UserController.validateAccount);
router.get('/user/events', authenticate, UserController.getUserEvents);
router.put('/user/events/:id', authenticate, UserController.updateUserEvent);
router.post('/events', authenticate, EventController.createEvent);

router.get('/events', EventController.getEvents);
router.get('/events/:id', EventController.getEventById);
router.post('/events/:id/subscribe', EventController.subscribeToEvent);

module.exports = router;