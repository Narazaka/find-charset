import * as assert from "power-assert";
import * as fs from "fs";
import findCharset from "../findCharset";

function toChars(str: string) {
    return Array.from(str).map(c => c.charCodeAt(0));
}

const sjisCrlf = fs.readFileSync(`${__dirname}/sjis_crlf.txt`);
const sjisLf = fs.readFileSync(`${__dirname}/sjis_lf.txt`);

describe("findCharset", () => {
    it("default setting", () => {
        const found = findCharset(sjisCrlf, "\x0aCharset: ");
        assert(found === "Shift_JIS");
    });

    it("mark is number[]", () => {
        const found = findCharset(sjisCrlf, toChars("\x0aCharset: "));
        assert(found === "Shift_JIS");
    });

    it("mark is Buffer", () => {
        const found = findCharset(sjisCrlf, Buffer.from("\x0aCharset: "));
        assert(found === "Shift_JIS");
    });

    it("mark is ArrayBuffer", () => {
        const found = findCharset(sjisCrlf, new Uint8Array(toChars("\x0aCharset: ")).buffer);
        assert(found === "Shift_JIS");
    });

    it("end is lf", () => {
        const found = findCharset(sjisLf, "\x0aCharset: ", {
            charsetEndMark: "\x0a",
        });
        assert(found === "Shift_JIS");
    });

    it("end is lf number", () => {
        const found = findCharset(sjisLf, "\x0aCharset: ", {
            charsetEndMark: 0x0a,
        });
        assert(found === "Shift_JIS");
    });

    it("case insensitive", () => {
        const found = findCharset(sjisCrlf, "\x0acharset: ", {
            caseInsensitive: true,
        });
        assert(found === "Shift_JIS");
    });

    it("not found", () => {
        const found = findCharset(sjisCrlf, "notfound", {
            caseInsensitive: true,
        });
        assert(found === undefined);
    });
});
