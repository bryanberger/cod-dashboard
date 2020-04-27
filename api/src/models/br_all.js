'use strict'
module.exports = (sequelize, DataTypes) => {
  const br_all = sequelize.define(
    'br_all',
    {
      gamerTag: DataTypes.STRING,
      kills: DataTypes.INTEGER,
      kdRatio: DataTypes.FLOAT,
      downs: DataTypes.INTEGER,
      topTwentyFive: DataTypes.INTEGER,
      topTen: DataTypes.INTEGER,
      contracts: DataTypes.INTEGER,
      revives: DataTypes.INTEGER,
      topFive: DataTypes.INTEGER,
      score: DataTypes.INTEGER,
      timePlayed: DataTypes.INTEGER,
      gamesPlayed: DataTypes.INTEGER,
      scorePerMinute: DataTypes.FLOAT,
      cash: DataTypes.INTEGER,
      deaths: DataTypes.INTEGER,
      title: DataTypes.STRING,
    },
    {
      // I want `createdAt` to actually be called `time`, for use in grafana
      timestamps: true,
      createdAt: 'time',
      updatedAt: false,
    },
  )
  br_all.associate = function (models) {
    // associations can be defined here
  }
  return br_all
}
