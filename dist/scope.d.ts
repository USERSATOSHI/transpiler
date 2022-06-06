import { ActionRow, ButtonComponent, EmbedData, MessageAttachment, SelectMenuComponent, Snowflake, StickerResolvable, TextInputComponent } from "discord.js";
export declare class Scope {
    name: string;
    parent: string | undefined;
    children: Scope[];
    sendData: {
        content: string;
    };
    embeds: EmbedData[];
    components: ActionRow<ButtonComponent | SelectMenuComponent | TextInputComponent>[];
    files: MessageAttachment[];
    stickers: StickerResolvable[];
    variables: string[];
    setters: string;
    rest: string;
    hasSendData: boolean;
    sendFunction: string;
    functions: string;
    addReturn: boolean;
    useChannel?: Snowflake;
    packages: string;
    constructor(name: string, parent?: string, code?: string, addReturn?: boolean);
    addVariables(scopeVars: string[]): void;
    replaceLast(str: string, replacer: string, replacedTo: string): string;
    replace(str: string, replacer: string, replacedTo: string): string;
    addChild(child: string): void;
    getChild(name: string): Scope | undefined;
    removeChild(name: string): void;
    toExecuteString(sendMessage?: boolean): string;
    getExecutable(sendMessage?: boolean): string;
    toString(sendMessage?: boolean): string;
    addEmbeds(embeds: EmbedData[]): void;
    toParts(sendMessage?: boolean): {
        packages: string;
        setters: string;
        functions: string;
        rest: string;
        hasSendData: boolean;
        sendData: string;
    };
    toEditString(channel: string, message: string): string;
}
//# sourceMappingURL=scope.d.ts.map