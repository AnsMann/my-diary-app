const mongoose = require('mongoose')

const diaryEntrySchema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
  },
  date: { type: Date, required: true },
  rating: { type: Number, required: false },
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
    status: { type: Boolean, required: true },
    sharedOn: { type: Date, required: false },
    sharedWith: { type: String, required: false },
  },
  edit: {
    status: { type: Boolean, required: true },
    editOn: { type: String, required: false },
  },
  createDate: { type: Date, required: true },
  inDatabase: { type: Boolean, required: true },
})

module.exports = mongoose.model('DiaryEntry', diaryEntrySchema)
