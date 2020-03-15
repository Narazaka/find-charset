import * as assert from "power-assert";
import * as fs from "fs";
import findCharset from "../findCharset";

describe("findCharset", () => {
    it("default setting", () => {
        const found = findCharset(fs.readFileSync(`${__dirname}/sjis_crlf.txt`), "\x0aCharset: ");
        assert(found === "Shift_JIS");
    });

    it("end is lf", () => {
        const found = findCharset(fs.readFileSync(`${__dirname}/sjis_lf.txt`), "\x0aCharset: ", {
            charsetEndMark: "\x0a",
        });
        assert(found === "Shift_JIS");
    });

    it("case insensitive", () => {
        const found = findCharset(fs.readFileSync(`${__dirname}/sjis_crlf.txt`), "\x0acharset: ", {
            caseInsensitive: true,
        });
        assert(found === "Shift_JIS");
    });
});
