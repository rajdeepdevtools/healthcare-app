const router = require('express').Router();
const c = require('../controllers/authController');
const { authenticate } = require('../middleware/authMiddleware');

router.post('/register', c.register);
router.post('/login', c.login);
router.get('/me', authenticate, c.me);
router.post('/forgot-password', c.forgotPassword);
router.post('/reset-password/:token', c.resetPassword);

module.exports = router;
