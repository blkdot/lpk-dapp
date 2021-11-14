import React, { useMemo, useState, useCallback } from 'react'
import styled from 'styled-components'

import { ChainId, Currency, ETHER, JSBI, Pair, Route, Token, TokenAmount, Trade, TradeType } from '@pancakeswap/sdk'
import { useAudioModeManager } from 'state/user/hooks'
import useDebounce from 'hooks/useDebounce'
import { filterTokens, useSortedTokensByQuery } from 'components/SearchModal/filtering'
import useTokenComparator from 'components/SearchModal/sorting'
import { useAllTokens, useToken, useIsUserAddedToken, useFoundOnInactiveList } from '../../../hooks/Tokens'
import {
  useCombinedActiveList,
} from '../../../state/lists/hooks'
import { Field } from '../../../state/swap/actions'

import { useDerivedSwapInfo } from '../../../state/swap/hooks'
import lpkToken from '../../../config/constants/tokenLists/lpk-token.json'

export const BodyWrapper = styled.div`
  position: relative;
  max-width: 420px;
  width: 100%;
  margin-bottom: 0.75rem;
`
export const PairCardBox = styled.div`
  position: relative;
  max-width: 420px;
  width: 100%;
  background: ${({ theme }) => (theme.isDark) ? '#212429' : '#EDF4F9'};
  border: 1px solid ${({ theme }) => (theme.isDark) ? '#212429' : '#EDF4F9'};
  border-radius: 8px;
  padding: 1rem;

  span {
    font-size: 20px;
    font-weight: 500; 
  }
`

const BodyFlexRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 10;
  justify-content: space-between;
  max-width: 1440px;
  justify-content: center;
  margin: auto;

`
export const PairSelectButton = styled.button`
  position: relative;
  width: 100%;
  background: ${({ theme }) => (theme.isDark) ? '#212429' : '#FFFFFF'};
  border: 1px solid ${({ theme }) => (theme.isDark) ? '#212429' : '#FFFFFF'};
  border-radius: 8px;
  padding: 0.75rem;
  cursor: pointer;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;

  :focus,
  :hover {
    background: ${({ theme }) => (theme.isDark) ? '#212429' : '#FFFFFF'};
    border: 1px solid ${({ theme }) => (theme.isDark) ? '#1B435F' : '#F7F8FA'};
  }
  span {
    font-size: 16px;
    font-weight: 500;    
  }
`
export const Price = styled.span`
  color: ${({ theme }) => (theme.isDark) ? '#2DC60E': '#2DC60E' };
  font-size: 16px;
  font-weight: 500;    
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function PairSelectBody() {
  
  const [trade, setTrade] = useState(undefined)

  // Get the token list
  const [searchQuery, setSearchQuery] = useState<string>('')
  
  const debouncedQuery = useDebounce(searchQuery, 200)

  const [invertSearchOrder] = useState<boolean>(false)

  const allTokens = useAllTokens()

  const tokenComparator = useTokenComparator(invertSearchOrder)

  const filteredTokens: Token[] = useMemo(() => {
    return filterTokens(Object.values(allTokens), debouncedQuery)
  }, [allTokens, debouncedQuery])

  const sortedTokens: Token[] = useMemo(() => {
    return filteredTokens.sort(tokenComparator)
  }, [filteredTokens, tokenComparator])

  const filteredSortedTokens = useSortedTokensByQuery(sortedTokens, debouncedQuery)


  // Select Token
  // const handleCurrencySelect = useCallback(
  //   (currency: Currency) => {
  //     onCurrencySelect(currency)
  //   },
  //   [onCurrencySelect],
  // )
  const { v2Trade, currencyBalances, parsedAmount, currencies, inputError: swapInputError } = useDerivedSwapInfo()

  const trade1 = v2Trade

  const selectTokens = (token: Token) => {
    currencies[Field.INPUT] = lpkToken.tokens;
    currencies[Field.OUTPUT] = token;
    console.log('INPUT', currencies[Field.INPUT])
    console.log('OUTPUT', currencies[Field.OUTPUT])

    const LPK = new Token(ChainId.MAINNET, lpkToken.tokens.address, lpkToken.tokens.decimals, lpkToken.tokens.symbol, lpkToken.tokens.name)
    const token1 = new Token(ChainId.MAINNET, token.address, token.decimals, token.symbol, token.name)

    console.log('LPK', LPK)
    console.log('token1', token1)
    console.log('pair', pairToken(LPK, token1))

    const pair = new Pair(new TokenAmount(LPK, '1000'), new TokenAmount(token1, '1000'))

    const createTrade = new Trade(
      new Route([pair], token1, LPK),
      new TokenAmount(token1, JSBI.BigInt(1000)),
      TradeType.EXACT_INPUT
    )
    
    setTrade(createTrade)
    handleCurrencySelect(LPK)
    console.log('trade', createTrade)
    console.log('executionPrice', createTrade.executionPrice.toSignificant(6))
  }

  const handleCurrencySelect = useCallback(
    (currency: Currency) => {

      console.log('onCurrencySelect(currency)', currency)
    },
    [],
  )

  const pairToken = (LPK, token1) => {
    return new Pair(new TokenAmount(LPK, '100'), new TokenAmount(token1, '100'))
  }

  return (
    <BodyFlexRow>
      <BodyWrapper>
        <PairCardBox>
          <span>Pair</span>
          <div>
            {trade1?.executionPrice.invert().toSignificant(6)}
          </div>
          {filteredSortedTokens.map((token, index) => {     
            return (
              <PairSelectButton
                onClick={() => {
                  selectTokens(token)
                  
                }}
              >
                <span>{token.symbol}/{lpkToken.tokens.symbol}</span>
                <Price>
                  { (trade?.inputAmount.currency.symbol === token.symbol) && trade ?  trade?.executionPrice.toSignificant(6) :
                    '-'
                  }
                </Price>
              </PairSelectButton>
            ) 
          })}
        </PairCardBox>
      </BodyWrapper>
    </BodyFlexRow>
  )
}
