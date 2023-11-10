/* eslint-disable no-undef */
/* vite相关 */
import dotenv from 'dotenv'

export function isDev(mode) {
  return mode === 'development'
}

export function isProd(mode) {
  return mode === 'production'
}

// Read all environment variable configuration files to process.env
export function loadEnv(mode) {
  const ret = {}
  const envList = [`.env.${mode}.local`, `.env.${mode}`, '.env.local', '.env']
  envList.forEach((e) => {
    dotenv.config({ path: e })
  })
  for (const envName of Object.keys(process.env)) {
    let realName = process.env[envName].replace(/\\n/g, '\n')
    realName = realName === 'true' ? true : realName === 'false' ? false : realName
    if (envName === 'VITE_PORT') realName = Number(realName)
    if (envName === 'VITE_OPEN') realName = Boolean(realName)
    if (envName === 'VITE_PROXY') {
      try {
        realName = JSON.parse(realName)
      } catch (error) {
        realName = ''
      }
    }
    ret[envName] = realName
    if (typeof realName === 'string') {
      process.env[envName] = realName
    } else if (typeof realName === 'object') {
      process.env[envName] = JSON.stringify(realName)
    }
  }
  return ret
}
