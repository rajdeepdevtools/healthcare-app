const router = require('express').Router();
const c = require('../controllers/feedbackController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

router.post('/', c.create);                 // public submit
router.get('/', c.listApproved);            // public approved list
router.get('/all', authenticate, authorize('admin'), c.listAll);
router.patch('/:id/status', authenticate, authorize('admin'), c.setStatus);

module.exports = router;
