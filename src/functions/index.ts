import { FunctionData } from "../typings/interface";
import { $authorId } from "./authorId";
import { $clientOwnerId } from "./clientOwnerId";
import { $channelId } from "./channelId";
import { $djsEval } from "./djsEval";
import { $get } from "./get";
import { $let } from "./let";
import { $log } from "./log";
import { $ping } from "./ping";
import { $onlyIf } from "./onlyIf";
import { $activity } from "./activity";
import { $addButton } from "./addButton";
import { $addActionRow } from "./addActionRow";
import { $and } from "./and";
import { $author } from "./author";
import { $while } from "./while";
import { $break } from "./break";
import { $sum } from "./sum";
import { $addField } from "./addField";
import { $increment } from "./increment";
import { $if } from "./if";
import { $elseIf } from "./elseIf";
import { $else } from "./else";
import { $eval } from "./eval";
import { $message } from "./message";
import { $channelName } from "./channelName";
import { $channelSendMessage } from "./channelSendMessage";
import { $checkCondition } from "./checkCondition";
import { $clientId } from "./clientId";
import { $clientToken } from "./clientToken";
import { $color } from "./color";
import { $commandId } from "./commandId";
import { $commandName } from "./commandName";
import { $comment } from "./comment";
import { $customId } from "./customId";
import { $description } from "./description";
import { $divide } from "./divide";
import { $editMessage } from "./editMessage";
import { $slashOption } from "./slashOption";
import { $endsWith } from "./endsWith";
import { $ephemeral } from "./ephemeral";
import { $footer } from "./footer";
import { $guildId } from "./guildId";
import { $has } from "./has";
import { $cpu } from "./cpu";
import { $ram } from "./ram";
import { $image } from "./image";
import { $includes } from "./includes";
import { $authorAvatar } from "./authorAvatar";
import { $isBot } from "./isBot";
import { $isNumber } from "./isNumber";
import { $isServerPremiumProgressBarEnabled } from "./isServerPremiumProgressBarEnabled";
import { $isServerAvailable } from "./isServerAvailable";
import { $isServerLarge } from "./isServerLarge";
import { $isServerPartnered } from "./isServerPartnered";
import { $isServerVerified } from "./isServerVerified";
import { $env } from "./env";
import { $try } from "./try";
import { $catch } from "./catch";
import { $finally } from "./finally";
export const datas: Record<string, FunctionData> = {
  $let,
  $get,
  $log,
  $ping,
  $authorId,
  $clientOwnerId,
  $channelId,
  $djsEval,
  $onlyIf,
  $activity,
  $addButton,
  $addActionRow,
  $and,
  $author,
  $while,
  $break,
  $sum,
  $addField,
  $increment,
  $if,
  $elseIf,
  $else,
  $endsWith,
  $ephemeral,
  $eval,
  $footer,
  $guildId,
  $has,
  $message,
  $channelName,
  $channelSendMessage,
  $checkCondition,
  $clientId,
  $clientToken,
  $color,
  $commandId,
  $commandName,
  $comment,
  $customId,
  $description,
  $divide,
  $editMessage,
  $slashOption,
  $cpu,
  $ram,
  $image,
  $includes,
  $authorAvatar,
  $isBot,
  $isNumber,
  $isServerPremiumProgressBarEnabled,
  $isServerAvailable,
  $isServerLarge,
  $isServerPartnered,
  $isServerVerified,
  $env,
  $try,
  $catch,
  $finally,
};
