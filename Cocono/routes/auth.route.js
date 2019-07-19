const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// router.get('/api', authController.list);
router.post('/api', authController.create);
router.post('/login',authController.login);
router.get('/logout',authController.logout);
router.post('/sign-up',authController.create);
module.exports =router;