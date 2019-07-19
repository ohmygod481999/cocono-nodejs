const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/api', userController.list);
router.post('/api', userController.create);

module.exports =router;