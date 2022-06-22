"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranspilerError = void 0;
class TranspilerError extends Error {
    constructor(msg) {
        super(msg);
        this.name = "TranspilerError";
        this.cause = this;
    }
}
exports.TranspilerError = TranspilerError;
//# sourceMappingURL=error.js.map