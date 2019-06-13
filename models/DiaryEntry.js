const mongoose = require('mongoose')

const diaryEntrySchema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
  },
  date: { type: Object, required: false },
  rating: { type: String, required: false },
  content: {
    type: String,
    required: false,
  },
  positive: {
    type: String,
    required: false,
  },
  negative: {
    type: String,
    required: false,
  },
  coachFeedback: {
    type: String,
    required: false,
  },
  additional: {
    type: String,
    required: false,
  },
  shared: {
    status: { type: Boolean, required: false },
    sharedOn: { type: Object, required: false },
    sharedWith: { type: String, required: false },
  },
  edit: {
    status: { type: Boolean, required: false },
    editOn: { type: String, required: false },
  },
  createDate: { type: Object, required: false },
})

module.exports = mongoose.model('DiaryEntry', diaryEntrySchema)
