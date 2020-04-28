# Puck-utils

[![Build Status](https://github.com/iMuFeng/puck-utils/workflows/CI/badge.svg)](https://travis-ci.org/iMuFeng/puck-utils) [![npm package](https://img.shields.io/npm/v/@puckjs/utils.svg)](https://www.npmjs.org/package/@puckjs/utils) [![npm downloads](http://img.shields.io/npm/dm/@puckjs/utils.svg)](https://www.npmjs.org/package/@puckjs/utils) [![Coveralls](https://img.shields.io/coveralls/iMuFeng/puck-utils.svg)](https://coveralls.io/github/iMuFeng/puck-utils)

A library for nodejs basic develop

## Installation and Usage

Install the library with `npm install @puckjs/utils`

#### No ES6

```
const utils = require('@puckjs/utils')
utils.helper.isEmpty([])

const helper = require('@puckjs/utils/lib/helper')
helper.default.isEmpty([])
```

#### ES6

```
import { helper } from '@puckjs/utils'
helper.isEmpty([])

import helper from '@puckjs/utils/lib/helper'
helper.isEmpty([])
```

The files which start with `node.` can only be used on `nodejs` server side.

## Tests

Tests are using jest, to run the tests use:

```bash
$ npm run test
```

## MIT license

Copyright (c) 2020 mufeng <mufeng.me@gmail.com>.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
