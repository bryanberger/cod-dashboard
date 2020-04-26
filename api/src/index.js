const { Sequelize } = require('sequelize')
const API = require('call-of-duty-api')({
  platform: 'battle',
  ratelimit: { maxRequests: 2, perMilliseconds: 1000, maxRPS: 2 },
})

const gamerTags = require('./gamerTags.json')

const initDb = async () => {
  const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER_INSERT,
    process.env.MYSQL_USER_INSERT_PASSWORD,
    {
      host: 'db',
      dialect: 'mysql',
    },
  )

  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

const init = async () => {
  try {
    await initDb()
    //await API.login(process.env.COD_API_EMAIL, process.env.COD_API_PASSWORD)
    //await mapGamerTags()
  } catch (error) {
    console.error(error)
  }
}

const mapGamerTags = async () => {
  gamerTags.map(async (gamer) => {
    console.log(gamer)
    const wz = await API.MWwz(gamer)
    // insert
  })
}

init()
