const router = require('express').Router()

const Hobbits = require('./hobbitsModel.js')

router.get('/', (req,res) => {
    Hobbits.getAll()
      .then(hobbits => {
        res.status(200).json(hobbits);
      })
      .catch(err => res.send(err));
})

router.post('/', (req,res) => {
  let hobbit = req.body
  Hobbits.insert(hobbit)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
})

router.delete('/:id', async (req, res) => {
  try {
    const count = await Hobbits.remove(req.params.id)
      
    if (count > 0) {
      res.status(200).json({count});
    } else {
      res.status(404).json({ message: 'Record not found' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});


module.exports = router;