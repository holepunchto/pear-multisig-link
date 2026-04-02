'use strict'
const test = require('brittle')
const { run } = require('./helper')
const link = require('..')

const VALID_CONFIG = require('./fixtures/valid/pear.json').multisig

test('outputs pear:// link for valid config', async function ({ ok }) {
  const { out } = await run('valid')
  ok(out.startsWith('pear://'))
})

test('cli output matches module output', async function ({ is }) {
  const { out } = await run('valid')
  is(out, link(VALID_CONFIG))
})

test('errors on missing pear.multisig', async function ({ ok }) {
  const { err } = await run('no-multisig')
  ok(err.includes('multisig field required'))
})

test('errors on missing namespace', async function ({ ok }) {
  const { err } = await run('no-namespace')
  ok(err.includes('namespace required'))
})

test('errors on missing quorum', async function ({ ok }) {
  const { err } = await run('no-quorum')
  ok(err.includes('quorum required'))
})

test('errors on missing signers', async function ({ ok }) {
  const { err } = await run('no-signers')
  ok(err.includes('publicKeys required'))
})

test('errors on empty signers array', async function ({ ok }) {
  const { err } = await run('empty-signers')
  ok(err.includes('publicKeys required'))
})
