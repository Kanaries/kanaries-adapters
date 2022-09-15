# @kanaries/adapters
 
`@kanaries/adapters` is a lib for features required to be running on both node and browser, but relay on a different implementation in different environment.

For example, storage in browser is implemented based on indexedDB while storage in node is implemented based on file system.

## Usage
```bash
npm install --save @kanaries/adapter

# or

yarn add @kanaries/adapter
```

## API

VIStorage

```ts
import { VIStorage } from '@kanaries/adapter';

const sto = new VIStorage('test');

sto.init();

sto.setItem('age', 100)
```