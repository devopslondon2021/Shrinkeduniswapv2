## Links
- Protocol website: https://uniswap.org/
- Protocol documentation: https://docs.uniswap.org/protocol/V2/introduction
- Smart contracts: https://github.com/Uniswap/v2-core
- Other existing subgraphs: https://github.com/SimpleFi-finance/subgraphs/tree/master/stake-dao
- gmidata subgraph URL: https://thegraph.com/hosted-service/subgraph/devopslondon2021/gmidatauniswapv2

## Sample queries 
- Finding addLiquidity on basis of Protocol name
```
{
  addLiquidities(first:1, orderBy: timestamp, orderDirection: desc, where:{potocolName:UNISWAP_V2}) {
    id
    hash
    logIndex
    to
    from
    blockNumber
    timestamp
    pair {
      id
      token0 {
        id
        name
        symbol
        decimals
        totalSupply
      }
      token1 {
        id
        name
        symbol
        decimals
        totalSupply
      }
        reserve0
      reserve1
    }
    potocolName
    eventType
    amountA
    amountB
    Liquidity
    
  }
}
```

- First 10 events ordered by Timestamp in asending order
```
{
  events(first: 10, orderBy: timestamp, orderDirection: asc) {
    id
    hash
    logIndex
    to
    from
    pair {
      id
    }
    amountA
    amountB
    Liquidity
    blockNumber
    timestamp
    __typename
  } 
}
```