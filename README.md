# Disposable Email

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

Check if an email is from a disposable domain, pretty self-explanatory.

> Explicit memory usage, no global constants!

This library to not uses global constants, memory is allocated only when you invoke the function.

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
- [Install](#install)
- [Usage](#usage)
  - [Bulk Validation](#bulk-validation)

## Install
```sh
pnpm i @fixers/disposable-email
```

```sh
npm install @fixers/disposable-email
```

## Usage

> Note: each time you invoke this function, a new `Set` containing all the disposable domains is created.

To check if an email is from a disposable domain:

```ts
import { isDisposable } from '@fixers/disposable-email'

// check an email
if (isDisposable('bad@disposable-domain.com')) {
  //
}

// check a domain
if (isDisposable('disposable-domain.com')) {
  //
}
```

### Bulk Validation

If you need to check a large volume of emails, you might want to allocate memory only once, create a factory function:

```ts
import { createDisposableFactory } from '@fixers/disposable-email'

// hold a reference to a Set
const isDisposable = createDisposableFactory()

// no memory allocation
isDisposable('bad@disposable-domain.com')

// no memory allocation
isDisposable('other@disposable-domain.com')
```


<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@fixers/disposable-email/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/@fixers/disposable-email

[npm-downloads-src]: https://img.shields.io/npm/dm/@fixers/disposable-email.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/@fixers/disposable-email

[license-src]: https://img.shields.io/npm/l/@fixers/disposable-email.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/@fixers/disposable-email
