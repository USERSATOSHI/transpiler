import { Guild } from "discord.js";
import { Scope } from "../scope";

export type CommandTypes = "basicCommand" | "slashCommand" ;

export interface FunctionData {
  name: string;
  brackets: boolean;
  optional: boolean;
  type: "scope" | "setter" | "getter" | "function" | "function_getter" | "scope_getter";
  fields: {
    name: string;
    type: string;
    required: boolean;
  }[];
  returns: any;
  default: string[];
  description: string;
  version: string;
  extra?: any;
  code: (data:funcData,scope:Scope[]) => {code:string,scope:Scope[],data?:funcData};
}
export interface PartialFunctionData extends FunctionData {
  total: string;
}
export interface funcData extends FunctionData {
  inside?: string;
  parent?: FunctionData,
  total: string;
  splits: string[];
  funcs: funcData[];
  parsed: string;
}
export interface CommandData {
  name: string;
  type: CommandTypes;
  code: string;
  __compiled__?: string;
  __uglify__: boolean;
  aliases?: string[];
  __path__?: string;
}

export interface TransformedGuild {
  rulesChannel: { id: string | null; name: string | undefined; };
  publicUpdatesChannel: { id: string | null; name: string | undefined; };
  bans: string;
  commands: number;
  partnered: boolean;
  verified: boolean;
  mfaLevel: any;
  explicitContentFilter: any;
  defaultMessageNotifications: any;
  systemChannelFlags: any;
  premiumTier: any;
  premiumSubscriptionCount: number | null;
  preferredLocale: any;
  systemChannel: { id: string | null; name: string | undefined; };
  splash: string | null;
  owner: { id: string; name: string; nick: string | null; };
  icon: string | null;
  afkChannel: { id: string | null; name: string | undefined; };
  membersId: string[];
  channelsId: string[];
  rolesId: string[];
  emojisId: string[];
  stickersId: string[];
}