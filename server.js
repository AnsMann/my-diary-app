const setupServer = require('./setup-server')
const app = setupServer()

const DiaryEntry = require('./models/DiaryEntry')

// add your api here
app.get('/diaryentries', (req, res) => {
  DiaryEntry.find()
    .then(entry => res.json(entry))
    .catch(err => res.json(err))
})

app.get('/diaryentries/:id', (req, res) => {
  const { id } = req.params
  DiaryEntry.findById(id)
    .then(entry => res.json(entry))
    .catch(err => res.json(err))
})

app.post('/diaryentries', (req, res) => {
  DiaryEntry.create(req.body)
    .then(entry => res.json(entry))
    .catch(err => res.json(err))
})

app.patch('/diaryentries/:id', (req, res) => {
  const { id } = req.params
  DiaryEntry.findByIdAndUpdate(id, req.body, { new: true })
    .then(entry => res.json(entry))
    .catch(err => res.json(err))
})

app.delete('/diaryentries/:id', (req, res) => {
  const { id } = req.params
  DiaryEntry.findByIdAndDelete(id)
    .then(entry => res.json(entry))
    .catch(err => res.json(err))
})
