const RoleService = require('../services/role')

class RoleController {
  constructor () {
    this.roleService = new RoleService()
  }

  async create (req, res, next) {
    try {
      const roleInfo = req.body
      const role = await this.roleService.create(roleInfo)
      return res.status(201).json(role)
    } catch (e) {
      next(e)
    }
  }

  async update (req, res, next) {
    try {
      const roleInfo = req.body
      const roleId = req.params.role_id
      const role = await this.roleService.update(roleId, roleInfo)
      return res.status(200).json(role)
    } catch (e) {
      next(e)
    }
  }

  async get (req, res, next) {
    try {
      const roleId = req.params.role_id
      const role = await this.roleService.get(roleId)
      return res.status(200).json(role)
    } catch (e) {
      next(e)
    }
  }

  async all (req, res, next) {}

  async remove (req, res, next) {}
}

module.exports = RoleController
