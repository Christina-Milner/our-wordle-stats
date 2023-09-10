const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth') 
const homeController = require('../controllers/home')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

// Simple stuff
router.get('/', homeController.getIndex)
router.get('/about', homeController.getAbout)
router.get('/stats', homeController.getStats)



//Login
router.get('/login', authController.getLogin)
router.post('/login', authController.postLogin)
router.get('/logout', authController.logout) 

module.exports = router