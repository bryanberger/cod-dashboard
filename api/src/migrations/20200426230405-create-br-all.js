'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('br_alls', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      gamerTag: {
        type: Sequelize.STRING,
      },
      kills: {
        type: Sequelize.INTEGER,
      },
      kdRatio: {
        type: Sequelize.FLOAT,
      },
      downs: {
        type: Sequelize.INTEGER,
      },
      topTwentyFive: {
        type: Sequelize.INTEGER,
      },
      topTen: {
        type: Sequelize.INTEGER,
      },
      contracts: {
        type: Sequelize.INTEGER,
      },
      revives: {
        type: Sequelize.INTEGER,
      },
      topFive: {
        type: Sequelize.INTEGER,
      },
      score: {
        type: Sequelize.INTEGER,
      },
      timePlayed: {
        type: Sequelize.INTEGER,
      },
      gamesPlayed: {
        type: Sequelize.INTEGER,
      },
      scorePerMinute: {
        type: Sequelize.FLOAT,
      },
      cash: {
        type: Sequelize.INTEGER,
      },
      deaths: {
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      time: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('br_alls')
  },
}
