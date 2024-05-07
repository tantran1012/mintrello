import 'dotenv/config'

export default function getEnv(key) {
  return process.env[key]
}
