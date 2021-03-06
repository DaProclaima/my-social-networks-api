const Event = require('../models/event.js')
const validator = require('node-validator')
const check = require('./payload-validator/events.js')
const JWT = require('../jwt.js')
const jwt = new JWT()

/**
 * Events
 * @class
 */
class Events {
  constructor (app, connect) {
    this.app = app
    this.EventModel = connect.model('Event', Event)

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
    this.app.post('/events/create', validator.express(check), async (req, res) => {
      try {
        if (jwt.getToken(req.body.token)) {
          const eventModel = new this.EventModel(req.body)
          
          eventModel.save().then(event => {
            res.status(200).json(event || {})
          }).catch(err => {
            res.status(500).json({
              'code': 500,
              'message': err
            })
          })
        } else {
          res.status(401).json({
            'code': 401,
            'message': 'Access Denied' 
          })
        }
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
    this.app.delete('/events/delete/:id', validator.express(check), async (req, res) => {
      try {
        if (jwt.getToken(req.body.token)) {
          this.EventModel.findOneAndDelete({_id: req.params.id})
            .then(event => {
              res.status(200).json(event || {})
            }).catch(err => {
              res.status(500).json({
                'code': 500,
                'message': err
              })
            })
        } else {
          res.status(401).json({
            'code': 401,
            'message': 'Access Denied' 
          })
        }
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
    this.app.get('/events/show/:id', validator.express(check), async (req, res) => {
      try {
        if (jwt.getToken(req.body.token)) {
          this.EventModel.findOne({_id: req.params.id}).then(event => {
            res.status(200).json(event || {})
          }).catch(err => {
            res.status(500).json({
              'code': 500,
              'message': err
            })
          })
        } else {
          res.status(401).json({
            'code': 401,
            'message': 'Access Denied' 
          })
        }
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
    this.app.put('/events/update/:id', validator.express(check), async (req, res) => {
      try {
        if (jwt.getToken(req.body.token)) {
          this.EventModel.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {new: true}, (err, doc) => {
            if (err) {
              res.status(500).json({
                'code': 500,
                'message': err
              })
            } else {
              res.status(200).json(doc || {})
            }
          })
        } else {
          res.status(401).json({
            'code': 401,
            'message': 'Access Denied' 
          })
        }
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
    this.app.get('/events/list', validator.express(check), async (req, res) => {
      try {
        if (jwt.getToken(req.body.token)) {
          this.EventModel.find({}, function (err, result) {
            if (err) {
              res.status(500).json({
                'code': 500,
                'message': err
              })
            } else {
              res.status(200).json(result)
            }   
          })
        } else {
          res.status(401).json({
            'code': 401,
            'message': 'Access Denied' 
          })
        }
      } catch (err) {
        res.status(500).json({
          'code': 500,
          'message': err
        })
      }
    })
  }
}

module.exports = Events
