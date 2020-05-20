const db = require('./models')
const logger = require('./logger')
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
    logger.error('[Database] Error:', error)
  }
}

const init = async () => {
  try {
    await initDb()
    await API.login(process.env.COD_API_EMAIL, process.env.COD_API_PASSWORD)
    await mapGamerTags()
  } catch (error) {
    logger.error('[COD API] Error:', error)
  }
}

const mapGamerTags = async () => {
  const bulk = []
  await Promise.all(
    gamerTags.map(async (gamerTag) => {
      try {
        const wz = await API.MWwz(gamerTag)
        if (wz.hasOwnProperty('br_all')) {
          logger.info(`[COD API] Got data for: ${gamerTag}`)
          if (
            Object.keys(wz.br_all).length === 0 &&
            obj.constructor === Object
          ) {
            logger.error(`[COD API] Data was null for: ${gamerTag}`)
            return
          }
          return bulk.push({
            gamerTag: gamerTag,
            ...wz.br_all,
          })
        }
      } catch (error) {
        logger.error(`[COD API/Database Error] for ${gamerTag}`, error)
      }
    }),
  )
  if (bulk.length > 0) {
    await db.br_all.bulkCreate(bulk)
    logger.info(`[COD API] Inserted data`)
  }
}

const loop = setInterval(async () => {
  try {
    await mapGamerTags()
  } catch (error) {
    logger.error('[LOOP] Error:', error)
  }
}, LOOP_TIMEOUT)

const shutdown = () => {
  logger.info('Shutdown')
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
