"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const regex = /#MATH_FUNCTION_START#[#$._0-9a-z*+-/%^&|?()]*#MATH_FUNCTION_END#/gi;
function fixMath(code) {
    let res = code;
    const matches = code.match(regex);
    matches;
    if (!matches)
        return code;
    matches.forEach((match) => {
        res = res.replace(match, "${" + match.replaceAll("#MATH_FUNCTION_END#", "").replaceAll("#MATH_FUNCTION_START#", "") + "}");
    });
    return res;
}
exports.default = fixMath;
// console.log( fixMath( `#MATH_FUNCTION_START#(1+2*#MATH_FUNCTION_START#(1-3)#MATH_FUNCTION_END#)#MATH_FUNCTION_END# lol ok #MATH_FUNCTION_START#(2+#MATH_FUNCTION_START#(3/2)#MATH_FUNCTION_END#)#MATH_FUNCTION_END#` ) );
//# sourceMappingURL=mathlexer.js.map