import { CacheType, Interaction } from "discord.js";
import { ClientWrapper } from "../clientWrapper";
export declare function onInteraction(client: ClientWrapper): void;
export declare function interactionCreate(interaction: Interaction<CacheType>, client: ClientWrapper): Promise<void>;
//# sourceMappingURL=interactionCreate.d.ts.map