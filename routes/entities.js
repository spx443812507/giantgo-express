const express = require('express')
const router = express.Router()
const EntityController = require('../controllers/entity')
const entityController = new EntityController()

router.post('/', entityController.create.bind(entityController))
router.put('/:entity_id', entityController.update.bind(entityController))
router.delete('/:entity_id', entityController.remove.bind(entityController))
router.get('/', entityController.all.bind(entityController))
router.get('/:entity_id', entityController.get.bind(entityController))

module.exports = router
