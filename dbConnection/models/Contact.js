const Sequulize = require('sequelize');
const seq = require('../database/db')

module.exports = seq.define(
    'contacts',
    {
        id: {
            type: Sequulize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequulize.STRING
        },
        phoneNumber: {
            type: Sequulize.STRING
        },
        address: {
            type: Sequulize.STRING
        }
    },
    {
        timestamps: false
    }
)