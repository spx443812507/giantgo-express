const {NotFoundError} = require('../errors')
const Role = require('../models/role')

class RoleService {
  async create (roleInfo) {
    try {
      const role = new Role(roleInfo)
      return await role.save()
    } catch (e) {
      throw e
    }
  }

  async update (roleId, formInfo) {
    let role

    try {
      role = await this.get(roleId)
      role = await role.update(formInfo)
    } catch (e) {
      throw e
    }

    return role
  }

  async get (roleId) {
    let role

    try {
      role = await Role.findById(roleId).populate('permissions')
    } catch (e) {
      throw e
    }

    if (!role) {
      throw new NotFoundError('role_not_exists')
    }

    return role
  }

  all () {}

  remove () {}
}

module.exports = RoleService
