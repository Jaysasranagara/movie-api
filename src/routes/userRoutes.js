const router = require('express').Router();

const userController = require('../controllers/userController')
const userMiddleware = require('../middlewares/userMiddleware')


router.post('/register', userController.register)

router.post('/login', userMiddleware.validateLogin, userController.login);

module.exports = router;