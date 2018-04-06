const _ = require('lodash')
const errors = require('../errors')
const Entity = require('../models/entity')
const Attribute = require('../models/attribute')

class EntityService {
  create (entityInfo) {
    return new Promise((resolve, reject) => {
      Entity.create({
        entity_name: entityInfo.entity_name,
        entity_code: entityInfo.entity_code,
        description: entityInfo.description
      }, (err, entity) => {
        if (err) {
          return reject(new errors[err.name](err))
        }

        if (entityInfo.attributes && entityInfo.attributes.length) {
          Attribute.create(_.map(entityInfo.attributes, attribute => {
            attribute.entity = entity._id
            return attribute
          }))
        }

        resolve(entity)
      })
    })
  }
  update (entityId, entityInfo) {

  }
  get () {}
  all () {}
  remove () {}
}

module.exports = EntityService
