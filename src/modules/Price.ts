/* eslint-disable prefer-const */
import { Pair, Token } from "../../generated/schema";
import { BigDecimal, Address } from "@graphprotocol/graph-ts/index";
import * as constants from "../common/constants";
import { Factory } from "../../generated/Factory/Factory";

const factoryContract = Factory.bind(
  Address.fromString(constants.FACTORY_ADDRESS)
);

export function findEthPerToken(token: Token): BigDecimal {
  if (token.id == constants.WETH_ADDRESS.toHexString()) {
    return constants.ONE_BD;
  }
  // loop through whitelist and check if paired with any
  for (let i = 0; i < constants.WHITELIST.length; i++) {
    let pairAddress = factoryContract.getPair(
      Address.fromString(token.id),
      Address.fromString(constants.WHITELIST[i])
    );
    if (pairAddress.toHexString() != constants.ZERO_ADDRESS.toHexString()) {
      let pair = Pair.load(pairAddress.toHexString());
      if (!pair) {
				return constants.ZERO_BD
			}
			if (
        pair.token0 == token.id &&
        pair.reserveETH.gt(constants.MINIMUM_LIQUIDITY_THRESHOLD_ETH.toBigDecimal())
      ) {
        let token1 = Token.load(pair.token1);
        return pair.token1Price.times(token1!.derivedETH as BigDecimal); // return token1 per our token * Eth per token 1
      }
      if (
        pair.token1 == token.id &&
        pair.reserveETH.gt(constants.MINIMUM_LIQUIDITY_THRESHOLD_ETH.toBigDecimal())
      ) {
        let token0 = Token.load(pair.token0);
        return pair.token0Price.times(token0!.derivedETH as BigDecimal); // return token0 per our token * ETH per token 0
      }
    }
  }
  return constants.ZERO_BD; // nothing was found return 0
}
