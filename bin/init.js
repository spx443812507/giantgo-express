#!/usr/bin/env node

/**
 * Module dependencies.
 */

const mongoose = require('mongoose')
const config = require('config')
const {Role, Permission} = require('../models')
const roleSeed = require('../seeds/roles')
const permissionSeeds = require('../seeds/permissions')

mongoose.connect(config.get('mongo'))
mongoose.connection.on('error', console.error.bind(console, 'connection error:'))
mongoose.connection.once('open', async function () {
  console.log('MongoDB连接成功，初始化数据！')
  let role = await Role.create(roleSeed)
  let promises = permissionSeeds.map(seed => Permission.create({
    name: seed.name,
    display_name: seed.display_name,
    description: seed.description
  }))

  for (let promise of promises) {
    role.permissions.push(await promise)
  }

  await role.save()
  process.exit(0)
})