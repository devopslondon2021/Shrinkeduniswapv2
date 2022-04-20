/* eslint-disable prefer-const */
import { log } from '@graphprotocol/graph-ts'
import { PairCreated } from '../types/Factory/Factory'
import { Pair, Token } from '../types/schema'
import { Pair as PairTemplate } from '../types/templates'
import {
  FACTORY_ADDRESS,
  fetchTokenDecimals,
  ZERO_BD,
  ZERO_BI,
} from './helpers'

export function handleNewPair(event: PairCreated): void {
  // create the tokens
  let token0 = Token.load(event.params.token0.toHexString())
  let token1 = Token.load(event.params.token1.toHexString())

  // fetch info if null
  if (token0 === null) {
    token0 = new Token(event.params.token0.toHexString())
    let decimals = fetchTokenDecimals(event.params.token0)

    // bail if we couldn't figure out the decimals
    if (decimals === null) {
      log.debug('mybug the decimal on token 0 was null', [])
      return
    }

    token0.decimals = decimals
    token0.derivedETH = ZERO_BD
  }

  // fetch info if null
  if (token1 === null) {
    token1 = new Token(event.params.token1.toHexString())
    let decimals = fetchTokenDecimals(event.params.token1)

    // bail if we couldn't figure out the decimals
    if (decimals === null) {
      return
    }
    token1.decimals = decimals
    token1.derivedETH = ZERO_BD
  }

  let pair = new Pair(event.params.pair.toHexString()) as Pair
  pair.token0 = token0.id
  pair.token1 = token1.id
  pair.createdAtBlockNumber = event.block.number
  pair.reserve0 = ZERO_BD
  pair.reserve1 = ZERO_BD
  pair.reserveETH = ZERO_BD
  pair.token0Price = ZERO_BD
  pair.token1Price = ZERO_BD

  // create the tracked contract based on the template
  PairTemplate.create(event.params.pair)

  // save updated values
  token0.save()
  token1.save()
  pair.save()
}
