# Puck-utils

[![Build Status](https://github.com/iMuFeng/puck-utils/workflows/CI/badge.svg)](https://travis-ci.org/iMuFeng/puck-utils) [![npm package](https://img.shields.io/npm/v/@puckjs/utils.svg)](https://www.npmjs.org/package/@puckjs/utils) [![npm downloads](http://img.shields.io/npm/dm/@puckjs/utils.svg)](https://www.npmjs.org/package/@puckjs/utils) [![Coveralls](https://img.shields.io/coveralls/iMuFeng/puck-utils.svg)](https://coveralls.io/github/iMuFeng/puck-utils)

A library for nodejs basic develop

## Installation

Install the library with `npm install @puckjs/utils` or `yarn add @puckjs/utils`

## Usage

#### Bytes

Transfer humanize size to bytes.

```
import { bytes } from '@puckjs/utils'
// or
import { bytes } from '@puckjs/utils/lib/bytes'

bytes('1kb') // => 1024
```

### Clone

Deep clone objects.

```
import { clone } from '@puckjs/utils'
// or
import { clone } from '@puckjs/utils/lib/clone'

clone<any>(obj)
```

### Date

Some functions for date conversions.

#### Unix timestamp

```
import { timestamp } from '@puckjs/utils'
// or
import { timestamp } from '@puckjs/utils/lib/date'

timestamp() // => 1600822237
```

#### Date string to `dayjs.Dayjs`

Dayjs API: [https://day.js.org/](https://day.js.org/)

```
import { date } from '@puckjs/utils'
// or
import { date } from '@puckjs/utils/lib/date'

date('2020-02-02') // => dayjs('2020-02-02')
date('2020-02-02 02:02:02', 'YYYY-MM-DD HH:mm:ss')
```

#### Unix timestamp to `dayjs.Dayjs`

```
import { unixDate } from '@puckjs/utils'
// or
import { unixDate } from '@puckjs/utils/lib/date'

unixDate(1600822237) // => dayjs.unix(1600822237)
```

#### Check if date expired

```
import { isDateExpired } from '@puckjs/utils'
// or
import { isDateExpired } from '@puckjs/utils/lib/date'

const startAt = date('2020-05-05').unix()
const endAt = date('2020-05-10').unix()

isDateExpired(startAt, endAt, '10d') // => false
```

#### Diff between two unix timestamps

```
import { unixDiff } from '@puckjs/utils'
// or
import { unixDiff } from '@puckjs/utils/lib/date'

const startAt = date('2020-10-01').unix()
const endAt = date('2020-10-10').unix()

unixDiff(startAt, endAt, 'day') // => 5
```

#### Date period

Get next expire timestamp from a certain timestamp.

```
import { datePeriod } from '@puckjs/utils'
// or
import { datePeriod } from '@puckjs/utils/lib/date'

const startAt = date('2020-05-10 12:00:00').unix()

datePeriod(startAt, 'month') // => date('2020-06-10 12:00:00').unix()
```

### Object deep diff

```
import { diff } from '@puckjs/utils'
// or
import { diff } from '@puckjs/utils/lib/diff'

diff(
  {
    x: 1
  },
  {
    x: 1,
    y: 2
  }
) // => { y: 2 }
```

### Helper

```
import { helper } from '@puckjs/utils'
// or
import helper from '@puckjs/utils/lib/helper'
```

| Function                      | Description                                                                                 |
| ----------------------------- | ------------------------------------------------------------------------------------------- |
| isUUID(arg: any)              | check if the argument is a UUID (version 3, 4 or 5).                                        |
| isBoolean(arg: any)           | check if the argument is Boolean                                                            |
| isString(arg: any)            | check if the argument is String                                                             |
| isNumber(arg: any)            | check if the argument is Number                                                             |
| isArray(arg: any)             | check if the argument is Array                                                              |
| isValidArray(arg: any)        | check if the argument is Array and array length greater then 0                              |
| isNan(arg: any)               | check if the argument is NaN                                                                |
| isSet(arg: any)               | check if the argument is Set                                                                |
| isMap(arg: any)               | check if the argument is Map                                                                |
| isSymbol(arg: any)            | check if the argument is Symbol                                                             |
| isObject(arg: any)            | check if the argument is Object                                                             |
| isDate(arg: any)              | check if the argument is Date or date string                                                |
| isRegExp(arg: any)            | check if the argument is RegExp, like `/\d+/`                                               |
| isError(arg: any)             | check if the argument is Error                                                              |
| isFunction(arg: any)          | check if the argument is Function                                                           |
| isNull(arg: any)              | check if the argument is Null                                                               |
| isUndefined(arg: any)          | check if the argument is Undefined                                                          |
| isNil(arg: any)               | check if the argument is Undefined or Null                                                  |
| isPlainObject(arg: any)       | check if the argument is Plain Object                                                       |
| isEmpty(arg: any)             | check if the argument is empty, like: empty string ` `, empty array `[]`, empty object `{}` |
| isValid(arg: any)             | which equals `!isEmpty(arg: any)`                                                           |
| isEqual(arg1: any, arg2: any) | check if StringA equals StringB                                                             |
| isTrue(arg: any)              | check if the argument is True, contains `"true"` and `1`                                    |
| isFalse(arg: any)             | check if the argument is False, contains `"false"` and `0`                                  |
| isBool(arg: any)              | which equals `isTrue(arg: any) or isFalse(arg: any)`                                        |
| uniqueArray(arg: any)         | get all unique values in a array                                                            |

### Humanize time

Transfer humanize time to number.

```
import { hs, ms } from '@puckjs/utils'
// or
import { hs, ms } from '@puckjs/utils/lib/hs'

hs('1m') // => 60
ms('1m') // => 60 * 1000
```

### Mime

Get mime from file name or extension.

```
import { mime } from '@puckjs/utils'
// or
import { mime } from '@puckjs/utils/lib/mime'

mime('.jpg') // => 'image/jpeg'
```

### Nanoid

A tiny, secure, URL-friendly, unique string ID generator, API: [https://github.com/ai/nanoid](https://github.com/ai/nanoid).

```
import { nanoid } from '@puckjs/utils'
// or
import { nanoid } from '@puckjs/utils/lib/nanoid'

nanoid(21) // => 'V1StGXR8Z5jdHi6BJKmyT'
```

### Object

```
import { pickObject, pickValidValues, removeObjectNil } from '@puckjs/utils'
// or
import { pickObject, pickValidValues, removeObjectNil } from '@puckjs/utils/lib/object'

const obj = {
  x: 1,
  y: undefined,
  z: 'value'
}

pickObject(obj, [
  'x',
  ['z', 'User']
]) // => { x: 1, User: 'value' }

pickValidValues(obj, ['x', 'y', 'x']) => // { x: 1, z: 'value }

removeObjectNil(obj) => // { x: 1, z: 'value }
```

### Parse

```
import { parseJson, parseBool, parseNumber, htmlToText } from '@puckjs/utils'
// or
import { parseJson, parseBool, parseNumber, htmlToText } from '@puckjs/utils/lib/parse'
```

### Query string

```
import { qs } from '@puckjs/utils'
// or
import qs from '@puckjs/utils/lib/qs'

qs.parse('a=1&b=2&c=3') => // { a: '1', b: '2', c: '3' }
qs.stringify({ a: '1', b: '2', c: '3' }) => // 'a=1&b=2&c=3'
```

### Random

```
import { random } from '@puckjs/utils'
// or
import { random } from '@puckjs/utils/lib/random'

random(6, RandomType.NUMERIC) // => '152389'
```

### Slugify

API: [https://github.com/simov/slugify](https://github.com/simov/slugify)

### Type

Get the type of argument. This function is the foundation of helper.

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
