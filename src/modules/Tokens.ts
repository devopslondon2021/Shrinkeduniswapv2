import { Token } from "../../generated/schema";
import * as constants from "../common/constants";
import { ERC20 } from "../../generated/Factory/ERC20";
import { Address } from "@graphprotocol/graph-ts";

export function getOrCreateToken(tokenAddr: Address): Token {
  let token = Token.load(tokenAddr.toHexString());

  if (!token) {
    token = new Token(tokenAddr.toHexString());
    let erc20Contract = ERC20.bind(tokenAddr);

    let decimals = erc20Contract.try_decimals();

    token.decimals = decimals.reverted
      ? (constants.DEFAULT_DECIMALS.toI32() as u8)
      : decimals.value;
    }
  return token;
}
