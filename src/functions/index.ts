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
  $eval,
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
};
