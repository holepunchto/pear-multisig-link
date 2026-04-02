'use strict'
const plink = require('pear-link')
const HyperMultisig = require('hyper-multisig')

module.exports = function link(config) {
  const { publicKeys, namespace, quorum } = config
  const key = HyperMultisig.getCoreKey(publicKeys, namespace, { quorum })
  return plink.serialize({ drive: { key } })
}
