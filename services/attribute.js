const errors = require('../errors')
const Attribute = require('../models/attribute')

class AttributeService {
  create (entityId, attributeInfo) {
    return new Promise((resolve, reject) => {
      const attribute = new Attribute(attributeInfo)

      attribute.save((err, attribute) => {
        if (err) {
          return reject(new errors[err.name](err))
        }

        resolve(attribute)
      })
    })
  }
  update (attributeId, attributeInfo) {

  }
  get () {}
  all () {}
  remove () {}
}

module.exports = AttributeService
