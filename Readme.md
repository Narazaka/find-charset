# find-charset

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
