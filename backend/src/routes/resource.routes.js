const { Router } = require('express');
const crudFactory = require('../controllers/crudFactory');
const { authenticate, authorize } = require('../middleware/authMiddleware');

// Creates a router with public reads and admin-protected writes.
module.exports = function resourceRoutes(Model, options = {}) {
  const router = Router();
  const h = crudFactory(Model, options);
  const markPublic = (req, res, next) => { req.isPublic = true; next(); };

  router.get('/', markPublic, h.list);
  router.get('/:id', h.getOne);
  router.post('/', authenticate, authorize('admin', 'doctor'), h.create);
  router.put('/:id', authenticate, authorize('admin', 'doctor'), h.update);
  router.delete('/:id', authenticate, authorize('admin'), h.remove);
  return router;
};
