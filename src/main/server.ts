import app from './app'
import env from './config/env'

app.listen(env.APP_PORT, () =>
  console.log(`API is running in port: ${env.APP_PORT}`)
)
