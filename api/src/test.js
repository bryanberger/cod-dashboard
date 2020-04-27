const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

const API = require('call-of-duty-api')({
  platform: 'battle',
  ratelimit: { maxRequests: 1, perMilliseconds: 2500, maxRPS: 2 },
})
const gamerTags = require('./gamerTags.json')

const init = async () => {
  try {
    await API.login(process.env.COD_API_EMAIL, process.env.COD_API_PASSWORD)
    const wz = await API.MWstats(gamerTags[1])
    console.log(wz.lifetime.accoladeData)
  } catch (error) {
    console.error('[COD API] Error:', error)
  }
}

init()
