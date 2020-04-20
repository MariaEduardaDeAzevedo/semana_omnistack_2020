const knex = require('knex')
const confs = require('../../knexfile')

const con = knex(confs.development)

module.exports = con