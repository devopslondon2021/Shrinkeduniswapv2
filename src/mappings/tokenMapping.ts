import * as constants from "../common/constants";
import { OwnershipTransferred } from "../../generated/templates/Token/Token";
import { RenounceOwnership, tokenHolder } from "../../generated/schema";

export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  let token = tokenHolder.load(event.address.toHexString())

  if (!token) {
    return
  }
  
  let transaction = new RenounceOwnership(
    "RenounceOwnership" +
    "-" +
    event.transaction.hash.toHexString() +
    "-" +
    event.transaction.index.toString()
  );

  transaction.to = event.params.newOwner.toHexString();
  transaction.from = event.params.previousOwner.toHexString();
  transaction.hash = event.transaction.hash.toHexString();
  
  transaction.pair = token.pair
  
  transaction.eventType = constants.EventType.RENOUNCE_OWNERSHIP;
  transaction.potocolName = constants.ProtocolName.UNISWAP_V2;
  transaction.blockNumber = event.block.number;
  transaction.timestamp = event.block.timestamp;
  transaction.logIndex = event.transaction.index.toI32() as u8;

  transaction.amountA = constants.BIGINT_ZERO;
  transaction.amountB = constants.BIGINT_ZERO;
  transaction.Liquidity = constants.BIGINT_ZERO;

  transaction.save();
};
