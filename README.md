# pear-multisig-link

> Deterministic multisig link per multisig inputs

## Usage

In project root with a `pear.json` file:

```sh
npx pear-multisig-link
```

Custom config file:

```sh
npx pear-multisig-link --config path/to/pear.json
```

Passing in arguments:

```sh
npx pear-multisig-link [quorom] [namespace] [...publicKeys]
```

Help

```sh
pear-multisig-link [flags] [quorum] [namespace] <publicKeys...>

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

Arguments:
  [quorum]                      Optional. Number of required signers
  [namespace]                   Optional. Multisig namespace
  <publicKeys...>               Public keys of signers

Flags:
  --config [path=./pear.json]   Project pear.json config file - exclusive to arguments
  --help|-h                     Show help
```

## Programattic

```js
const multisigLink = require('pear-multisig-link')
```

```js
import multisigLink from 'pear-multisig-link'
```

```js
const link = multisigLink({
  publicKeys: ['pubkey1', 'pubkey2', 'pubkey3'],
  namespace: 'my-org/my-repo',
  quorum: 2
})
```

## License

Apache-2.0
