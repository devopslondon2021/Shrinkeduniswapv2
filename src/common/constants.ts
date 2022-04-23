import { Address, BigDecimal, BigInt } from "@graphprotocol/graph-ts";

export namespace EventType {
  export const ADD_LIQUIDITY = "ADD_LIQUIDITY";
  export const REMOVE_LIQUIDITY = "REMOVE_LIQUIDITY";
  export const LOCK_LIQUIDITY = "LOCK_LIQUIDITY";
  export const PAIR_CREATED = "PAIR_CREATED";
  export const RENOUNCE_OWNERSHIP = "RENOUNCE_OWNERSHIP";
}

export namespace ProtocolName {
  export const UNISWAP_V2 = "UNISWAP_V2";
  export const UNISWAP_V3 = "UNISWAP_V3";
  export const SUSHISWAP = "SUSHISWAP";
}

export const SECONDS_PER_DAY = 60 * 60 * 24;
export const BIGINT_ZERO = BigInt.fromI32(0);
export const BIGDECIMAL_ZERO = new BigDecimal(BIGINT_ZERO);
export const DEFAULT_DECIMALS = BigInt.fromI32(18);
export let ONE_BD = BigDecimal.fromString('1')
export let ONE_BI = BigInt.fromI32(1)
export let ZERO_BD = BigDecimal.fromString('0')

export const WETH_ADDRESS = Address.fromString(
  '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
)

export const FACTORY_ADDRESS = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f'

// minimum liquidity for price to get tracked
export let MINIMUM_LIQUIDITY_THRESHOLD_ETH = BigInt.fromString('2')

export const ZERO_ADDRESS = Address.fromString(
  "0x0000000000000000000000000000000000000000"
);

export const ZERO_ADDRESS_STRING = "0x0000000000000000000000000000000000000000";
export const UNISWAP_V2_FACTORY_ADDRESS = Address.fromString(
  "0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f"
);
export const UNISWAP_V2_ROUTER_ADDRESS = Address.fromString(
  "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"
);

// token where amounts should contribute to tracked volume and liquidity
export let WHITELIST: string[] = [
  '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', // WETH
  '0x6b175474e89094c44da98b954eedeac495271d0f', // DAI
  '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', // USDC
  '0xdac17f958d2ee523a2206206994597c13d831ec7', // USDT
  '0x0000000000085d4780b73119b644ae5ecd22b376', // TUSD
  '0x5d3a536e4d6dbd6114cc1ead35777bab948e3643', // cDAI
  '0x39aa39c021dfbae8fac545936693ac917d5e7563', // cUSDC
  '0x86fadb80d8d2cff3c3680819e4da99c10232ba0f', // EBASE
  '0x57ab1ec28d129707052df4df418d58a2d46d5f51', // sUSD
  '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2', // MKR
  '0xc00e94cb662c3520282e6f5717214004a7f26888', // COMP
  '0x514910771af9ca656af840dff83e8264ecf986ca', //LINK
  '0x960b236a07cf122663c4303350609a66a7b288c0', //ANT
  '0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f', //SNX
  '0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e', //YFI
  '0xdf5e0e81dff6faf3a7e52ba697820c5e32d806a8' // yCurv
]
