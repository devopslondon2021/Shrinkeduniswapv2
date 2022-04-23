import { ethereum, BigInt, BigDecimal } from "@graphprotocol/graph-ts";
import * as constants from "./constants"

export function readValue<T>(
  callResult: ethereum.CallResult<T>,
  defaultValue: T
): T {
  return callResult.reverted ? defaultValue : callResult.value;
}

export function convertTokenToDecimal(tokenAmount: BigInt, exchangeDecimals: BigInt): BigDecimal {
  if (exchangeDecimals == constants.BIGINT_ZERO) {
    return tokenAmount.toBigDecimal()
  }
  return tokenAmount.toBigDecimal().div(exponentToBigDecimal(exchangeDecimals))
}

export function exponentToBigDecimal(decimals: BigInt): BigDecimal {
  let bd = BigDecimal.fromString('1')
  for (let i = constants.BIGINT_ZERO; i.lt(decimals as BigInt); i = i.plus(constants.ONE_BI)) {
    bd = bd.times(BigDecimal.fromString('10'))
  }
  return bd
}