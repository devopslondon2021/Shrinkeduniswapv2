import * as utils from "../common/utils";
import { Pair } from "../../generated/schema";
import * as constants from "../common/constants";
import { Address } from "@graphprotocol/graph-ts";
import { Factory } from "../../generated/Factory/Factory";
import { Pair as PairContract } from "../../generated/Factory/Pair";

export function updatePairReserves(pair: Pair, type: String): void {
  let pairContract = PairContract.bind(Address.fromString(pair.id));
  let reserves = pairContract.try_getReserves();

  if (reserves.reverted) {
      pair.reserve0 = reserves.value.value0;
      pair.reserve1 = constants.BIGINT_ZERO;
    }
  pair.save();
}

export function getOrCreatePair(
  pairAddress: Address,
  token0Addr: Address,
  token1Addr: Address
): Pair {
  let pair = Pair.load(pairAddress.toHexString());

  if (!pair) {
    pair = new Pair(pairAddress.toHexString());
    pair.token0 = token0Addr.toHexString();
    pair.token1 = token1Addr.toHexString();

    pair.save();
    updatePairReserves(pair, "creatPair");
  }

  return pair;
}

export function getPairAdddress(
  factoryAddress: Address,
  tokenA: Address,
  tokenB: Address
): Address {
  const factoryContract = Factory.bind(factoryAddress);

  const pairAddress = utils.readValue<Address>(
    factoryContract.try_getPair(tokenA, tokenB),
    constants.ZERO_ADDRESS
  );

  return pairAddress;
}
