const Joi = require('joi')
const toUri = require('multiaddr-to-uri')

module.exports = ({ ipfs, rootPath, siteAddr }) => ({
  method: 'PUT',
  path: '/avatar/{peer}',
  async handler (request, h) {
    const src = `/ipfs/${request.payload.avatar}`
    const dest = `${rootPath}/${request.params.peer}`
    const exists = await isExists(ipfs, dest)
    if (exists) await ipfs.files.rm(dest)
    await ipfs.files.cp([src, dest])
    h.response().code(exists ? 200 : 201)
    return { url: `${toUri(siteAddr)}/avatar/${request.params.peer}` }
  },
  options: {
    // TODO: validate bs58 CID
    validate: {
      params: {
        peer: Joi.string().required()
      },
      payload: {
        avatar: Joi.string().required()
      }
    }
  }
})

async function isExists (ipfs, path) {
  try {
    await ipfs.files.stat(path)
  } catch (err) {
    if (err.message.includes('not exist')) return false
    throw err
  }
  return true
}
