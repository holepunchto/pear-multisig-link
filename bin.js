#!/usr/bin/env node
'use strict'
const multisigLink = require('.')
const fs = require('fs')
const { ERR_INVALID_CONFIG, ERR_INVALID_INPUT } = require('pear-errors')
const { command, description, flag, arg, rest, bail } = require('paparam')

const cmd = command(
  'pear-multisig-link',
  description`
    Print project multisig link determined by inputs

    By default quorum, namespace and publicKeys values of the pear.json
    multisig field determine the multisig link

    Example - 2/3 must sign to approve
    pear.json: {
      "multisig": {
        "publicKeys": ["<pubkey1>", "<pubkey2>", "<pubkey3>"],
        "namespace": "my-org/my-app",
        "quorum": 2
      }
    }

    Either --config or positional arguments may be specified, but not both
  `,
  flag(
    '--config [path=./pear.json]',
    'Project pear.json config file - exclusive to arguments'
  ),
  arg('[quorum]', 'Number of required signers'),
  arg('[namespace]', 'Multisig namespace'),
  rest('[publicKeys...]', 'Public keys of signers'),
  (cmd) => {
    const hasArgs =
      cmd.args.quorum || cmd.args.namespace || (cmd.rest && cmd.rest.length > 0)
    if (cmd.flags.config && hasArgs) {
      throw ERR_INVALID_INPUT('--config or arguments but not both')
    }
    let multisig
    const config = hasArgs ? null : cmd.flags.config || 'pear.json'
    if (config) {
      multisig = JSON.parse(fs.readFileSync(config)).multisig
    } else {
      multisig = {
        quorum: Number(cmd.args.quorum),
        namespace: cmd.args.namespace,
        publicKeys: cmd.rest
      }
    }
    if (!multisig) throw ERR_INVALID_CONFIG('multisig field required')

    if (!multisig.namespace) {
      throw ERR_INVALID_CONFIG('namespace required')
    }
    if (!multisig.quorum) throw ERR_INVALID_CONFIG('quorum required')
    if (!multisig.publicKeys || multisig.publicKeys.length === 0) {
      throw ERR_INVALID_CONFIG('publicKeys required')
    }

    console.log(multisigLink(multisig))
  },
  bail((bail) => {
    if (bail.err && bail.err.code === 'ERR_INVALID_CONFIG') {
      console.error(bail.err.message)
    } else {
      console.error(bail.reason)
    }
  })
)
cmd.parse((global.process ?? global.Bare).argv.slice(2))
