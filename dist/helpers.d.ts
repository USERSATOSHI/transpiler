import { Client, Snowflake } from "discord.js";
import { TransformedGuild } from "./typings/interface";
export declare function getUser(userId: Snowflake, client: Client): Promise<import("discord.js").User | null>;
export declare function transformGuild(guildId: Snowflake, client: Client): Promise<TransformedGuild | null>;
//# sourceMappingURL=helpers.d.ts.map