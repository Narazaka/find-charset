# find-charset

[![npm](https://img.shields.io/npm/v/find-charset.svg)](https://www.npmjs.com/package/find-charset)
[![npm license](https://img.shields.io/npm/l/find-charset.svg)](https://www.npmjs.com/package/find-charset)
[![npm download total](https://img.shields.io/npm/dt/find-charset.svg)](https://www.npmjs.com/package/find-charset)
[![npm download by month](https://img.shields.io/npm/dm/find-charset.svg)](https://www.npmjs.com/package/find-charset)

[![Dependency Status](https://david-dm.org/Narazaka/find-charset/status.svg)](https://david-dm.org/Narazaka/find-charset)
[![devDependency Status](https://david-dm.org/Narazaka/find-charset/dev-status.svg)](https://david-dm.org/Narazaka/find-charset?type=dev)
[![codecov.io](https://codecov.io/github/Narazaka/find-charset/coverage.svg?branch=master)](https://codecov.io/github/Narazaka/find-charset?branch=master)

find charset from string data by the charset mark like "\x0aCharset: "

## Install

```
npm install find-charset
```

## Usage

```typescript
import findCharset from "find-charset";
// or
// const findCharset = require("find-charset").default;

const found = findCharset(fs.readFileSync(`${__dirname}/sjis_lf.txt`), "\x0acharset: ", {
    charsetEndMark: "\x0a",
    caseInsensitive: true,
});

assert(found === "Shift_JIS");
```

## License

[Zlib License](LICENSE)
