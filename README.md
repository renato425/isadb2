# 🤩 IsaDB2 - The New IsaDB!!

## IsaDB2 - The new method of saving

[![npm](https://img.shields.io/badge/npm_version-v2.0.0-blue)](https://npmjs.com/package/isadb2) [![square](https://img.shields.io/badge/supported_by-Square_Cloud-green)](https://squarecloud.app) [![documentation](https://img.shields.io/badge/docs-8A2BE)](https://isadb.js.org)

### About

> The IsaDB2 is the new method of saving, creating a `.isadb2` file, you can make a new database local.

**See** [**the docs!**](https://isadb.js.org) **for ptBR language**

#### Compatibility: Works with **CommonJS** an **EcmaScript**

### Instalation

**Tested in Node v18.7.0**

```
npm install isadb2
```

### Example Usage

**Install isadb2:**

```
npm install isadb2
```

**Creating a instance and saving things**

```js
//using Ecma
import { create, get, set } from 'isadb2'

async function main() {
    await create() //create instance
    
    await set('foo', 'bar') //save inside db.isadb2
    console.log(await get('foo')) //returns -> bar
}

//using CommonJS
const isadb2 = require('isadb2')

async function main() {
    await isadb2.create() //create instance
    
    await isadb2.set('foo', 'bar') //save inside db.isadb2
    console.log(await isadb2.get('foo')) //returns -> bar
}
```

### Contributing

Before creating an issue, please ensure that it hasn't already been reported/suggested, and double-check the [documentation](https://isadb.js.org) Check the repository if you'd like to submit a PR.

### Help

If you don't understand something in the documentation, you are experiencing problems, or you just need a gentle nudge in the right direction, please don't hesitate to make a issue in [GitHub](https://github.com/renato425/isadb2)
