const db = require('./models')
const logger = require('./logger')
const API = require('call-of-duty-api')({
  platform: 'battle',
  ratelimit: { maxRequests: 1, perMilliseconds: 5000 },
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

const CustomMWRequest = (gamertag, platform = 'battle') => {
  return new Promise((resolve, reject) => {
    brDetails = {}
    API.MWwz(gamertag, platform)
      .then((data) => {
        let lifetime = data.lifetime
        if (typeof lifetime !== 'undefined') {
          let filtered = Object.keys(lifetime.mode)
            .filter((x) => x.startsWith('br'))
            .reduce((obj, key) => {
              obj[key] = lifetime.mode[key]
              return obj
            }, {})
          if (typeof filtered.br_all !== 'undefined') {
            filtered.br_all.properties.title = 'br_all'
            filtered.br_all.properties.gamerTag = data.username
            // flatten down, remove need for 'br_all' sub-object
            brDetails = filtered.br_all.properties
          }
        }
        resolve(brDetails)
      })
      .catch((e) => reject(e))
  })
}

const mapGamerTags = async () => {
  const bulk = await Promise.all(
    gamerTags.map(async (gamerTag) => {
      try {
        const wz = await CustomMWRequest(gamerTag)

        if (Object.keys(wz).length !== 0) {
          // will insert null rows
          if (wz.gamerTag.toLowerCase() !== gamerTag.toLowerCase()) {
            logger.error(`[COD API] Data was not for this user: ${gamerTag}`)
            return null
          }

          logger.info(`[COD API] Got data for: ${gamerTag}`)
          return wz
        }
      } catch (error) {
        logger.error(`[COD API/Database Error] for ${gamerTag}`, error)
      }
    }),
  )

  // bulk insert into database
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
