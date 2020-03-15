const cr = 0x0d;

/**
 * find charset string from the string data.
 * @param content string data
 * @param charsetMark charset begin mark like "\x0aCharset: ", "charset," or some.
 * @param options options
 */
export default function findCharset(
    content: ArrayBuffer | SharedArrayBuffer | Uint8Array | Buffer | number[],
    charsetMark: string | number[] | ArrayBuffer | SharedArrayBuffer | Uint8Array,
    options?: {
        /** case insensitive. charsetMark should be lowercase. */
        caseInsensitive?: boolean;
        /** "\x0aCharset: UTF-8\x0d"'s "\x0d". default = 0x0d */
        charsetEndMark?: string | number;
    },
) {
    const charsetMarkCodes = new Uint8Array(
        typeof charsetMark === "string" ? Array.from(charsetMark).map(c => c.charCodeAt(0)) : charsetMark,
    );
    const charsetMarkCodesLength = charsetMarkCodes.length;
    const charsetMarkCodesIsAlpha = new Array(charsetMarkCodesLength);
    const caseInsensitive = options && options.caseInsensitive;
    const charsetEndMark =
        // eslint-disable-next-line no-nested-ternary
        options && options.charsetEndMark
            ? typeof options.charsetEndMark === "string"
                ? options.charsetEndMark.charCodeAt(0)
                : options.charsetEndMark
            : cr;
    if (caseInsensitive) {
        for (let charIndex = 0; charIndex < charsetMarkCodesLength; ++charIndex) {
            const char = charsetMarkCodes[charIndex];
            // eslint-disable-next-line yoda
            charsetMarkCodesIsAlpha[charIndex] = 0x20 <= char && char <= 0x7e;
        }
    }
    const chars = new Uint8Array(content);
    let markDetectIndex = 0;
    let charsetValueStart = -1;
    for (let charIndex = 0; charIndex < chars.length; ++charIndex) {
        let char = chars[charIndex];
        // convert to lowercase
        // eslint-disable-next-line no-bitwise
        if (charsetMarkCodesIsAlpha[markDetectIndex]) char |= 0x20;
        if (char === charsetMarkCodes[markDetectIndex]) {
            ++markDetectIndex;
        } else {
            markDetectIndex = 0;
        }
        if (markDetectIndex === charsetMarkCodesLength) {
            charsetValueStart = charIndex + 1;
            break;
        }
    }
    if (charsetValueStart < 0) return undefined;
    const charsetValueCodes = [];
    for (let charIndex = charsetValueStart; charIndex < chars.length; ++charIndex) {
        const char = chars[charIndex];
        if (char === charsetEndMark) break;
        charsetValueCodes.push(char);
    }
    return String.fromCharCode(...charsetValueCodes);
}
