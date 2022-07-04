const util = require("../dist/util.js");
describe("Util Function Tests", () => {
    let code;
    beforeEach(() => {
        code = "$let[hi;1]\n$get[hi]";
    });
    it("are Brackets Balanced", () => {
        expect(util.areBracketsBalanced(code)).toBe(true);
    });

    it("convert to bool", () => {
        expect(util.convertToBool("yes")).toBe(true);
        expect(util.convertToBool("no")).toBe(false);
    });

    it("count brackets", () => {
        expect(util.countBrackets(code)).toEqual({
            leftbracketCount: 2,
            rightbracketCount: 2,
        });
    } );
});
