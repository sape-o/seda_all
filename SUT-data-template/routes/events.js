const router = require('express').Router()
const Event = require('../models/event')

router.get('/', async(req, res) => {
  const events = await Event.find()
  res.render('events/list', {events})
})

router.get('/events/new', (req, res) => {
  res.render('events/new')
})

router.get('/events/:id', async (req, res) => {
  try {
    const { id } = req.params
    const event = await Event.findById(id)
    res.render('events/detail', { event })
  } catch (err) {
    res.status(400).send('error')
  }

})
router.get('/events/:id/edit', async (req, res) => {
  try {
    const { id } = req.params
    const event = await Event.findById(id)
    res.render('events/edit', { event })
  } catch (err) {
    res.status(400).send('error')
  }
})

// router.put('/events/:id')
router.post('/events/:id', async (req, res) => {
  try {
    const { id } = req.params
    const updated = { $set: req.body }
    const options = { new: true }
    const event = await Event.findByIdAndUpdate(id, updated, options)
    res.redirect('/')

  } catch (err) {
    res.status(400).send('error')
  }
})
router.post('/events/', async (req, res) => {
  const event = new Event(req.body)
  const data = await event.save()
  res.redirect('/events/'+data._id)
})


router.delete('/events/:id', async (req, res) => {
  try {
    const { id } = req.params
    await Event.findByIdAndRemove(id)
    res.json({})
  } catch (err) {
    res.status(400).send('error')
  }
})

module.exports = router
