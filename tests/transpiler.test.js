const { Transpiler } = require("../dist/transpiler.js");
describe("Transpilation Test", () => {
    it("transpile code", () => {
        const code = `$let[hi;1]
$let[res;.]
$onlyif[$authorId===$clientOwnerId;no]
$if[$get[hi]===1;
    $let[res;hi]
]
$elseIf[$get[hi]===2;
    $let[res;ok]
]
$else[
    $let[res;bye]
]
$get[res]`;

        const res = Transpiler(code, true, {}, true);
        expect( res ).toBeDefined();
    });
});
