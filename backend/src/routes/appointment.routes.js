const router = require('express').Router();
const c = require('../controllers/appointmentController');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

router.post('/', upload.single('report'), c.create);       // public booking
router.get('/mine', authenticate, c.mine);                  // patient portal
router.get('/', authenticate, authorize('admin', 'doctor'), c.list);
router.patch('/:id/status', authenticate, authorize('admin', 'doctor'), c.updateStatus);
router.delete('/:id', authenticate, authorize('admin'), c.remove);

module.exports = router;
