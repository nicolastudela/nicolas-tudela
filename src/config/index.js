import devConf from './dev'
import prodConf from './prod'

const env = process.env.NODE_ENV || 'development'

const baseConfig = {
  env,
  isDev: env === 'development',
  isTest: env === 'testing',
}

let envConfig = {}

switch (env) {
  case 'dev':
  case 'development':
    envConfig = {
      ...baseConfig,
      ...devConf,
    }
    break
  case 'test':
  case 'testing':
    break
  case 'production':
  case 'prod':
    envConfig = {
      ...baseConfig,
      ...prodConf,
    }
    break
  default:
    break
}

export default envConfig
