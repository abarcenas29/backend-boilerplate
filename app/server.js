require('babel-register')
const os = require('os')
const cluster = require('cluster')
const app = require('./index').default()

if (cluster.isMaster) {
  const numWorker = os.cpus().length

  for (let i = 0; i < numWorker; i++) {
    cluster.fork()
  }

  cluster.on('online', worker => {
    console.log(`Worker ${worker.process.pid} is online`)
  })

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died with ${code} and signal : ${signal}`)
    console.log('Starting a new worker')
    cluster.fork()
  })
} else {
  app.set('port', (process.env.PORT || 4444))
  app.listen(app.get('port'), () => {
    console.log(`http://localhost:${app.set('port')}`)
  })
}
