const EntityService = require('../services/entity')

class EntityController {
  constructor () {
    this.entityService = new EntityService()
  }

  create (req, res, next) {
    const entityInfo = req.body

    this.entityService.create(entityInfo).then(entity => {
      return res.status(201).json(entity)
    }).catch(error => {
      next(error)
    })
  }
  update () {}
  get () {}
  all () {}
  remove () {}
}

module.exports = EntityController
