const asyncHandler = require('../utils/asyncHandler');

// Builds standard CRUD handlers for a Mongoose model.
module.exports = function crudFactory(Model, { publicFilter = {}, sort = { createdAt: -1 } } = {}) {
  return {
    list: asyncHandler(async (req, res) => {
      const filter = req.isPublic ? { ...publicFilter } : {};
      const docs = await Model.find(filter).sort(sort);
      res.json({ success: true, count: docs.length, data: docs });
    }),
    getOne: asyncHandler(async (req, res) => {
      const bySlug = /^[a-z0-9-]+$/.test(req.params.id) && !req.params.id.match(/^[0-9a-fA-F]{24}$/);
      const doc = bySlug ? await Model.findOne({ slug: req.params.id }) : await Model.findById(req.params.id);
      if (!doc) { const e = new Error(`${Model.modelName} not found`); e.statusCode = 404; throw e; }
      res.json({ success: true, data: doc });
    }),
    create: asyncHandler(async (req, res) => {
      const doc = await Model.create(req.body);
      res.status(201).json({ success: true, data: doc });
    }),
    update: asyncHandler(async (req, res) => {
      const doc = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!doc) { const e = new Error(`${Model.modelName} not found`); e.statusCode = 404; throw e; }
      res.json({ success: true, data: doc });
    }),
    remove: asyncHandler(async (req, res) => {
      const doc = await Model.findByIdAndDelete(req.params.id);
      if (!doc) { const e = new Error(`${Model.modelName} not found`); e.statusCode = 404; throw e; }
      res.json({ success: true, message: `${Model.modelName} deleted` });
    }),
  };
};
