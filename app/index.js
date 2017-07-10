import express from 'express'
import bodyParser from 'body-parser'

export default () => {
  const app = express()

  /**
   * Middlewares
   */
  app.use(bodyParser.json())

  /**
   * Routes
   */
  return app
}
