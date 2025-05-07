const express = require('express')
const router = express.Router();
const UserController = require('../api/controllers/UserController');
const EventController = require('../api/controllers/EventController');
const authenticate = require('../middlewares/authentication');

router.post('/user', UserController.createUser);
router.post('/user/login', UserController.loginUser);
router.post('/events/:id/subscribe', EventController.subscribeToEvent);
router.post('/events', authenticate, EventController.createEvent);

router.put('/user/validation', authenticate, UserController.validateAccount);
router.put('/events/:id', authenticate, EventController.updateEvent);

router.get('/user/events', authenticate, EventController.getUserEvents);
router.get('/events', EventController.getEvents);
router.get('/events/:id', EventController.getEventById);
router.get('/user/validation/number', authenticate, UserController.getValidationNumber);

module.exports = router;