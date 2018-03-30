module.exports = () => ({
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: 'public',
      index: ['index.html']
    }
  }
})
