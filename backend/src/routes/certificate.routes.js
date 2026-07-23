const router = require('express').Router();
const c = require('../controllers/certificateController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

router.get('/verify/:code', c.verify);                                    // public verification
router.get('/', authenticate, authorize('admin', 'doctor'), c.list);      // admin list
router.post('/', authenticate, authorize('admin', 'doctor'), c.issue);    // admin issue
router.patch('/:id/revoke', authenticate, authorize('admin'), c.revoke);  // admin revoke

module.exports = router;
