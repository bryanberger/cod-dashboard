'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('br_alls', 'kdRatio', Sequelize.DOUBLE),
      queryInterface.changeColumn(
        'br_alls',
        'scorePerMinute',
        Sequelize.DOUBLE,
      ),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('br_alls', 'kdRatio', Sequelize.FLOAT),
      queryInterface.changeColumn('br_alls', 'scorePerMinute', Sequelize.FLOAT),
    ])
  },
}
