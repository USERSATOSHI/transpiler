export class TranspilerError extends Error {
    static cause: typeof TranspilerError;
    static message: string;
    constructor(msg:string) {
        super(msg);
        this.name = "TranspilerError";
        this.cause = this;
    }
}