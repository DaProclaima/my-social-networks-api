const Ticketing = require('../models/ticketing.js')

/**
 * Ticketing 
 * @class
 */
class Ticketings {
  constructor (app, connect) {
    this.app = app
    this.TickModel = connect.model('Ticketing', Ticketing)

    this.create() 
    this.delete()
    this.show()
    this.update()
    this.list()
  }

  /**
   * Create
   */
  create () {
    this.app.post('/ticketings/create', (req, res) => {
      try {
        const tickModel = new this.TickModel(req.body)
        
        tickModel.save().then(result => {
          res.status(200).json(result || {})
        }).catch(err => {
          res.status(500).json({
            'code': 500,
            'message': err
          })
        })
      } catch (err) {
        res.status(500).json({
          'code': 500,
          'message': err
        })
      }
    })
  }

  /**
   * Delete
   */
  delete () {
    this.app.delete('/ticketings/delete/:id', (req, res) => {
      try {
        this.TickModel.findOneAndDelete({_id: req.params.id})
          .then(result => {
            res.status(200).json(result || {})
          }).catch(err => {
            res.status(500).json({
              'code': 500,
              'message': err
            })
          })
      } catch (err) {
        res.status(500).json({
          'code': 500,
          'message': err
        })
      }
    })
  }

  /**
   * Show
   */
  show () {
    this.app.get('/ticketings/show/:id', (req, res) => {
      try {
        this.TickModel.findOne({_id: req.params.id}).then(result => {
          res.status(200).json(result || {})
        }).catch(err => {
          res.status(500).json({
            'code': 500,
            'message': err
          })
        })
      } catch (err) {
        res.status(500).json({
          'code': 500,
          'message': err
        })
      }
    })
  }

  /**
   * Update
   */
  update () {
    this.app.put('/ticketings/update/:id', (req, res) => {
      try {
        this.TickModel.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {new: true}, (err, doc) => {
          if (err) {
            res.status(500).json({
              'code': 500,
              'message': err
            })
          } else {
            res.status(200).json(doc || {})
          }
        })
      } catch (err) {
        res.status(500).json({
          'code': 500,
          'message': err
        })
      }
    })
  }

  /**
   * List all
   */
  list () {
    this.app.get('/ticketings/list', (req, res) => {
      try {
        this.TickModel.find({}, function (err, result) {
          if (err) {
            return res.status(500).json({
              'code': 500,
              'message': err
            })
          } else {
            res.status(200).json(result)
          }   
        })
      } catch (err) {
        res.status(500).json({
          'code': 500,
          'message': err
        })
      }
    })
  }
}

module.exports = Ticketings