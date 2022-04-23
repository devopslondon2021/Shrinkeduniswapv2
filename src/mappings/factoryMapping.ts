import { log } from "@graphprotocol/graph-ts";
import { getOrCreatePair } from "../modules/Pairs";
import { getOrCreateToken } from "../modules/Tokens";
import { PairCreated } from "../../generated/Factory/Factory";
import { findEthPerToken } from "../modules/Price";
import { Token } from "../../generated/schema";

export function handleNewPair(event: PairCreated): void {
  const pairAddress = event.params.pair;
  const token0Address = event.params.token0;
  const token1Address = event.params.token1;

  let token0 = getOrCreateToken(token0Address);
  let token1 = getOrCreateToken(token1Address);
  getOrCreatePair(pairAddress, token0Address, token1Address);

  token0.derivedETH = findEthPerToken(token0 as Token)
  token1.derivedETH = findEthPerToken(token1 as Token)
  token0.save();
  token1.save();

  log.warning("[NewPair] PairAddress: {}, token0: {}, token1: {}", [
    pairAddress.toHexString(),
    token0Address.toHexString(),
    token1Address.toHexString(),
  ]);
}

