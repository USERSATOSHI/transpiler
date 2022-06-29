"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$authorAvatar = void 0;
const stringparser_1 = require("../stringparser");
const util_1 = require("../util");
exports.$authorAvatar = {
    name: "$authorAvatar",
    brackets: true,
    optional: true,
    type: "getter",
    fields: [
        {
            name: "size",
            type: "number",
            required: false,
        },
        {
            name: "dynamic",
            type: "boolean",
            required: false,
        },
        {
            name: "format",
            type: "string",
            required: false,
        },
    ],
    version: "1.0.0",
    default: ["4096", "yes", "webp"],
    returns: "string",
    description: "Returns the avatar of the author",
    code: (data, scope) => {
        const [size = `4096`, dynamic = "yes", format = "webp"] = data.splits;
        const typedSize = (0, util_1.parseData)(size);
        const parsedSize = typeof typedSize === "number" ? typedSize : (0, stringparser_1.parseString)(size);
        const parsedDynamic = (0, util_1.convertToBool)(dynamic);
        const parsedFormat = (0, stringparser_1.parseString)(format);
        let res = (0, util_1.escapeResult)(`__$DISCORD_DATA$__.author?.avatarURL({
      size: ${parsedSize},
      forceStatic: ${!parsedDynamic},
      extension: ${parsedFormat},
    })`);
        const currentScope = scope[scope.length - 1];
        currentScope.rest = currentScope.rest.replace(data.total, res);
        return {
            code: res,
            scope: scope,
        };
    },
};
//# sourceMappingURL=authorAvatar.js.map