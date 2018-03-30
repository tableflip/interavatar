const Joi = require('joi')
const toUri = require('multiaddr-to-uri')

module.exports = ({ ipfs, rootPath, gatewayAddr }) => ({
  method: 'GET',
  path: '/avatar/{peer}',
  async handler (request, h) {
    const path = `${rootPath}/${request.params.peer}`
    const { hash } = await ipfs.files.stat(path)
    return h.redirect(`${toUri(gatewayAddr)}/ipfs/${hash}`)
  },
  options: {
    // TODO: validate bs58 CID
    validate: {
      params: {
        peer: Joi.string().required()
      }
    }
  }
})
