const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true, index: true },
    title: { type: String, required: true, trim: true },
    content: { type: String, trim: true },
    videoUrl: { type: String, default: '' },
    duration: { type: String, default: '' },
    order: { type: Number, default: 0 },
    isFreePreview: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Lesson', lessonSchema);
