const Sequulize = require('sequelize');
const seq = new Sequulize('phonebook', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = seq;