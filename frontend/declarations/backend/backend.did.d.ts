import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Gemstone {
  'id' : bigint,
  'gemType' : string,
  'ratingCount' : bigint,
  'name' : string,
  'color' : string,
  'rarity' : bigint,
  'rating' : number,
}
export type Result = { 'ok' : null } |
  { 'err' : string };
export type Result_1 = { 'ok' : bigint } |
  { 'err' : string };
export interface _SERVICE {
  'addGemstone' : ActorMethod<[string, string, string, bigint], Result_1>,
  'getAllGemstones' : ActorMethod<[], Array<Gemstone>>,
  'getGemstone' : ActorMethod<[bigint], [] | [Gemstone]>,
  'rateGemstone' : ActorMethod<[bigint, number], Result>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
