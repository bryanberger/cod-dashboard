const db = require('./models')
const API = require('call-of-duty-api')({
  platform: 'battle',
  ratelimit: { maxRequests: 1, perMilliseconds: 2500, maxRPS: 2 },
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
  gamerTags.map(async (gamerTag) => {
    console.log(`[COD API] Fetching data for: ${gamerTag}`)
    try {
      const wz = await API.MWwz(gamerTag)
      if (wz.hasOwnProperty('br_all')) {
        await db.br_all.create({
          gamerTag: gamerTag,
          ...wz.br_all,
        })
        console.log(`[COD API] Inserted data for: ${gamerTag}`)
      } else {
        throw new Error('api response error')
      }
    } catch (error) {
      console.error('[COD API/Database Error:]', error)
    }
  })
}

const loop = setInterval(async () => {
  try {
    await mapGamerTags()
  } catch (error) {
    console.log('[LOOP] Error:', error)
  }
}, LOOP_TIMEOUT)

init()
