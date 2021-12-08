import React, { useMemo } from 'react'
import styled from 'styled-components'
import { Trade, TradeType } from '@pancakeswap/sdk'
import { Button, Text, ErrorIcon } from '@pancakeswap/uikit'
import { Field } from 'state/swap/actions'
import { useTranslation } from 'contexts/Localization'
import { computeSlippageAdjustedAmounts } from 'utils/prices'
import { AutoColumn } from 'components/Layout/Column'
// import { CurrencyLogo } from 'components/Logo'
import { RowBetween, RowFixed } from 'components/Layout/Row'
import truncateHash from 'utils/truncateHash'
import { SwapShowAcceptChanges } from './styleds'




export const StyledAutoColumn = styled(AutoColumn)`
  background: ${({ theme }) => (theme.isDark) ? 'transparent' : '#EDF4F9'};
  padding: 0.95rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
export const StyledRow = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 0;

  svg {
    fill: ${({ theme }) => (theme.isDark) ? '#50f7f7' : '#265B80'};
  }
`
export const StyledText = styled.span`
  display: flex;
  justify-content: flex-end;
  font-size: 24px;
  font-weight: 600;
  width: 100%;
  color: ${({ theme }) => (theme.isDark) ? '#50f7f7' : '#265B80'};
`
export const StyledTradeInfoText = styled.span`
  font-size: 14px;
  font-weight: 500;
  width: 100%;
  color: ${({ theme }) => (theme.isDark) ? '#27618b' : 'rgb(0 0 0 / 65%)'};

`

export default function SwapModalHeader({
  trade,
  allowedSlippage,
  recipient,
  showAcceptChanges,
  onAcceptChanges,
}: {
  trade: Trade
  allowedSlippage: number
  recipient: string | null
  showAcceptChanges: boolean
  onAcceptChanges: () => void
}) {
  const { t } = useTranslation()
  const slippageAdjustedAmounts = useMemo(
    () => computeSlippageAdjustedAmounts(trade, allowedSlippage),
    [trade, allowedSlippage],
  )
  // const { priceImpactWithoutFee } = useMemo(() => computeTradePriceBreakdown(trade), [trade])
  // const priceImpactSeverity = warningSeverity(priceImpactWithoutFee)

  const amount =
    trade.tradeType === TradeType.EXACT_INPUT
      ? slippageAdjustedAmounts[Field.OUTPUT]?.toSignificant(6)
      : slippageAdjustedAmounts[Field.INPUT]?.toSignificant(6)
  const symbol =
    trade.tradeType === TradeType.EXACT_INPUT ? trade.outputAmount.currency.symbol : trade.inputAmount.currency.symbol

  const tradeInfoText =
    trade.tradeType === TradeType.EXACT_INPUT
      ? t('Output is estimated. You will receive at least %amount% %symbol% or the transaction will revert.', {
          amount,
          symbol,
        })
      : t('Input is estimated. You will sell at most %amount% %symbol% or the transaction will revert.', {
          amount,
          symbol,
        })

  const [estimatedText, transactionRevertText] = tradeInfoText.split(`${amount} ${symbol}`)

  const truncatedRecipient = recipient ? truncateHash(recipient) : ''

  const recipientInfoText = t('Output will be sent to %recipient%', {
    recipient: truncatedRecipient,
  })

  const [recipientSentToText, postSentToText] = recipientInfoText.split(truncatedRecipient)

  return (
    <StyledAutoColumn>
      <StyledRow >
        <StyledText>
          {trade.inputAmount.toSignificant(6)}&nbsp;
          {trade.inputAmount.currency.symbol}
        </StyledText>
      </StyledRow>
      <StyledRow >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"/>
        </svg>
      </StyledRow>
      <StyledRow >
          <StyledText>
            {trade.outputAmount.toSignificant(6)} &nbsp;
            {trade.outputAmount.currency.symbol}
          </StyledText>
      </StyledRow>
     
      {showAcceptChanges ? (
        <SwapShowAcceptChanges justify="flex-start" gap="0px">
          <RowBetween>
            <RowFixed>
              <ErrorIcon mr="8px" />
              <Text bold> {t('Price Updated')}</Text>
            </RowFixed>
            <Button onClick={onAcceptChanges}>{t('Accept')}</Button>
          </RowBetween>
        </SwapShowAcceptChanges>
      ) : null}
      <AutoColumn justify="flex-start" gap="sm" style={{ padding: '20px 0 0 0px' }}>
        <StyledTradeInfoText>
          {estimatedText} <b>{amount} {symbol}</b> {transactionRevertText}
        </StyledTradeInfoText>
      </AutoColumn>
      {recipient !== null ? (
        <AutoColumn justify="flex-start" gap="sm" style={{ padding: '12px 0 0 0px' }}>
          <StyledTradeInfoText>
            {recipientSentToText}
            <b title={recipient}>{truncatedRecipient}</b>
            {postSentToText}
          </StyledTradeInfoText>
        </AutoColumn>
      ) : null}
    </StyledAutoColumn>
  )
}
