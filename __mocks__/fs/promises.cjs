// https://vitest.dev/guide/mocking/file-system

// we can also use `import`, but then every export should be explicitly defined
const { fs } = require('memfs')
module.exports = fs.promises
