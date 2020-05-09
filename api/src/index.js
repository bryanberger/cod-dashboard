const db = require('./models')
const API = require('call-of-duty-api')({
  platform: 'battle',
  ratelimit: { maxRequests: 1, perMilliseconds: 3000 },
})
const gamerTags = require('./gamerTags.json')
const LOOP_TIMEOUT = 15 * 60 * 1000

const initDb = async () => {
  try {
    await db.sequelize.sync()
  } catch (error) {
    console.error('[Database] Error:', error)
  }
}

const init = async () => {
  try {
    await initDb()
    await API.login(process.env.COD_API_EMAIL, process.env.COD_API_PASSWORD)
    await mapGamerTags()
  } catch (error) {
    console.error('[COD API] Error:', error)
  }
}

const mapGamerTags = async () => {
  const bulk = []
  await Promise.all(
    gamerTags.map(async (gamerTag) => {
      try {
        const wz = await API.MWwz(gamerTag)
        if (wz.hasOwnProperty('br_all')) {
          console.log(`[COD API] Got data for: ${gamerTag}`)
          return bulk.push({
            gamerTag: gamerTag,
            ...wz.br_all,
          })
        } else {
          throw new Error('api response error')
        }
      } catch (error) {
        console.error('[COD API/Database Error:]', error)
      }
    }),
  )
  if (bulk.length > 0) {
    await db.br_all.bulkCreate(bulk)
    console.log(`[COD API] Inserted data`)
  }
}

const loop = setInterval(async () => {
  try {
    await mapGamerTags()
  } catch (error) {
    console.error('[LOOP] Error:', error)
  }
}, LOOP_TIMEOUT)

const shutdown = () => {
  console.log('Shutdown')
  clearInterval(loop)
  db.sequelize.close()
  process.exit(0)
}

process.on('SIGINT', () => {
  shutdown()
})

process.on('SIGTERM', () => {
  shutdown()
})

init()
