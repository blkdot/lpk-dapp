import React from 'react'
import styled from 'styled-components'
import { Price } from '@pancakeswap/sdk'
import { Text, AutoRenewIcon } from '@pancakeswap/uikit'
import { StyledBalanceMaxMini } from './styleds'



export const StyledPriceText = styled.div`
  color: ${({ theme }) => (theme.isDark) ? '#FFFFFF' : '#000000'};
  font-size: 14px;
  font-family: Ubuntu, sans-serif;
`

interface TradePriceProps {
  price?: Price
  showInverted: boolean
  setShowInverted: (showInverted: boolean) => void
}

export default function TradePrice({ price, showInverted, setShowInverted }: TradePriceProps) {
  const formattedPrice = showInverted ? price?.toSignificant(6) : price?.invert()?.toSignificant(6)

  const show = Boolean(price?.baseCurrency && price?.quoteCurrency)
  const label = showInverted
    ? `${price?.quoteCurrency?.symbol}/${price?.baseCurrency?.symbol}`
    : `${price?.baseCurrency?.symbol}/${price?.quoteCurrency?.symbol}`

  return (
    <Text style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
      {show ? (
        <>
          <StyledPriceText>{formattedPrice ?? '-'} {label}</StyledPriceText> 
          <StyledBalanceMaxMini onClick={() => setShowInverted(!showInverted)}>
            <AutoRenewIcon width="14px" />
          </StyledBalanceMaxMini>
        </>
      ) : (
        '-'
      )}
    </Text>
  )
}
