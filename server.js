const Hapi = require('hapi')
const Inert = require('inert')
const Pino = require('hapi-pino')
const IpfsApi = require('ipfs-api')
const toUri = require('multiaddr-to-uri')
const URL = require('url').URL
const routes = require('./routes')

exports.init = async ({
  ipfs = new IpfsApi(),
  rootPath = '/interavatar',
  serverAddr = '/dnsaddr/localhost/tcp/3000/http',
  // siteAddr = '/dnsaddr/interavatar.io/https'
  siteAddr = '/dnsaddr/localhost/tcp/3000/http',
  gatewayAddr = '/dnsaddr/ipfs.io/https'
} = {}) => {
  // Ensure rootPath exists
  await ipfs.files.mkdir(rootPath, { parents: true })

  const serverUrl = new URL(toUri(serverAddr))
  const server = Hapi.server({ port: serverUrl.port, host: serverUrl.hostname })

  await server.register([
    {
      plugin: Pino,
      options: { prettyPrint: process.env.NODE_ENV !== 'production' }
    },
    Inert
  ])

  server.route([
    routes.get({ ipfs, rootPath, gatewayAddr }),
    routes.put({ ipfs, rootPath }),
    routes.public()
  ])

  await server.start()
  console.log(`Server running at: ${serverAddr}`)
  return server
}

if (!module.parent) {
  exports.init()
}
