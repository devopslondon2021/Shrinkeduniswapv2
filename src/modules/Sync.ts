import { BigDecimal, BigInt, log } from "@graphprotocol/graph-ts";
import { Sync } from "../../generated/Factory/Pair";
import { Pair, Token } from "../../generated/schema";
import * as constants from "../common/constants"
import { convertTokenToDecimal } from "../common/utils";
import { findEthPerToken } from "./Price";


export function handleSync(event: Sync): void {
  let pair = Pair.load(event.address.toHex());
  if (!pair) {
    return 
  }

  let token0 = Token.load(pair.token0);
  let token1 = Token.load(pair.token1);  

  pair.reserve0 = convertTokenToDecimal(event.params.reserve0, BigInt.fromI32(token0!.decimals));
  pair.reserve1 = convertTokenToDecimal(event.params.reserve1, BigInt.fromI32(token1!.decimals));

  if (pair.reserve1.notEqual(constants.BIGDECIMAL_ZERO))
    pair.token0Price = pair.reserve0.div(pair.reserve1);
  else pair.token0Price = constants.ZERO_BD;
  if (pair.reserve0.notEqual(constants.BIGDECIMAL_ZERO))
    pair.token1Price = pair.reserve1.div(pair.reserve0);
  else pair.token1Price = constants.ZERO_BD;

  token0!.derivedETH = findEthPerToken(token0 as Token);
  token1!.derivedETH = findEthPerToken(token1 as Token);
  token0!.save();
  token1!.save();

  // use derived amounts within pair
  pair.reserveETH = pair.reserve0
    .times(token0!.derivedETH as BigDecimal)
    .plus(pair.reserve1.times(token1!.derivedETH as BigDecimal));

  // save entities
  pair.save();

  log.warning("[SyncPair] PairAddress: {}, token0: {}, token1: {}", [
    event.address.toHexString(),
    token0!.id,
    token1!.id,
  ]);
}
