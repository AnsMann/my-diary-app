const setupServer = require('./setup-server')
const app = setupServer()

const DiaryEntry = require('./models/DiaryEntry')

// add your api here
app.get('/diaryentries', (req, res) => {
  DiaryEntry.find()
    .then(entry => res.json(entry))
    .catch(err => res.json(err))
})
