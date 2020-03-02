const events = require('../../models/factory/mocks/events.js')
/**
 * Delete
 * @Class
 */
class Delete {
  constructor (app) {
    this.app = app
    this.run()
  }

  /**
   * middleWare
   */
  middleware () {
    this.app.delete('/events/delete/:id', (req, res) => {
      try {
        const { id } = req.params
        res.status(200).json(events.find(event => parseInt(event.id) === parseInt(id)) || {})
      } catch (err) {
        res.status(500).json({
          'code': 500,
          'message': err
        })
      }
    })
  }

  /**
   * Run
   */
  run () {
    this.middleware()
  }
}

module.exports = Delete
