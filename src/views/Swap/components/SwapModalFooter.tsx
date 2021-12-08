import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import { Trade, TradeType } from '@pancakeswap/sdk'
import { Button, Text, AutoRenewIcon } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { Field } from 'state/swap/actions'
import {
  computeSlippageAdjustedAmounts,
  computeTradePriceBreakdown,
  formatExecutionPrice,
  warningSeverity,
} from 'utils/prices'
import { AutoColumn } from 'components/Layout/Column'
import QuestionHelper from 'components/QuestionHelper'
import { AutoRow, RowBetween, RowFixed } from 'components/Layout/Row'
import FormattedPriceImpact from './FormattedPriceImpact'
import { StyledBalanceMaxMini, SwapCallbackError } from './styleds'

const SwapModalFooterContainer = styled(AutoColumn)`
  padding: 16px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => (theme.isDark) ? '#173346' : '#f5f5f5'};
  background-color: ${({ theme }) => (theme.isDark) ? '#173346' : '#f5f5f5'};
  margin-top: 10px;
`

export const StyledText = styled(Text)`
  font-size: 14px;
  font-weight: 500;
  font-family: 'Montserrat',sans-serif;
  color: ${({ theme }) => (theme.isDark) ? '#EDF4F9' : '#000000'};
`
export const StyledButton = styled.button`
  margin-top: 12px;
  text-align: center;
  outline: none;
  -webkit-box-pack: center;
  justify-content: center;
  font-size: 16px;
  border-radius: 8px;
  min-width: min-content;
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  -webkit-box-align: center;
  align-items: center;
  cursor: pointer;
  user-select: none;
  font-weight: 500;
  padding: 0.8rem;

  :hover,
  :focus {
    background: #27618b !important;

    :focus {
      border: 1px solid #27618b !important;
    }
  }
`

export default function SwapModalFooter({
  trade,
  onConfirm,
  allowedSlippage,
  swapErrorMessage,
  disabledConfirm,
}: {
  trade: Trade
  allowedSlippage: number
  onConfirm: () => void
  swapErrorMessage: string | undefined
  disabledConfirm: boolean
}) {
  const { t } = useTranslation()
  const [showInverted, setShowInverted] = useState<boolean>(false)
  const slippageAdjustedAmounts = useMemo(
    () => computeSlippageAdjustedAmounts(trade, allowedSlippage),
    [allowedSlippage, trade],
  )
  const { priceImpactWithoutFee, realizedLPFee } = useMemo(() => computeTradePriceBreakdown(trade), [trade])
  const severity = warningSeverity(priceImpactWithoutFee)

  return (
    <>
      <SwapModalFooterContainer>
        <RowBetween align="center">
          <StyledText fontSize="14px">{t('Price')}</StyledText>
          <StyledText
            fontSize="14px"
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              textAlign: 'right',
              paddingLeft: '10px',
            }}
          >
            {formatExecutionPrice(trade, showInverted)}
            <StyledBalanceMaxMini onClick={() => setShowInverted(!showInverted)}>
              <AutoRenewIcon width="14px" />
            </StyledBalanceMaxMini>
          </StyledText>
        </RowBetween>

        <RowBetween>
          <RowFixed>
            <StyledText fontSize="14px">
              {trade.tradeType === TradeType.EXACT_INPUT ? t('Minimum received') : t('Maximum sold')}
            </StyledText>
            <QuestionHelper
              text={t(
                'Your transaction will revert if there is a large, unfavorable price movement before it is confirmed.',
              )}
              ml="4px"
            />
          </RowFixed>
          <RowFixed>
            <StyledText fontSize="14px">
              {trade.tradeType === TradeType.EXACT_INPUT
                ? slippageAdjustedAmounts[Field.OUTPUT]?.toSignificant(4) ?? '-'
                : slippageAdjustedAmounts[Field.INPUT]?.toSignificant(4) ?? '-'}
            </StyledText>
            <StyledText fontSize="14px" marginLeft="4px">
              {trade.tradeType === TradeType.EXACT_INPUT
                ? trade.outputAmount.currency.symbol
                : trade.inputAmount.currency.symbol}
            </StyledText>
          </RowFixed>
        </RowBetween>
        <RowBetween>
          <RowFixed>
            <StyledText fontSize="14px">{t('Price Impact')}</StyledText>
            <QuestionHelper
              text={t('The difference between the market price and your price due to trade size.')}
              ml="4px"
            />
          </RowFixed>
          <FormattedPriceImpact priceImpact={priceImpactWithoutFee} />
        </RowBetween>
        <RowBetween>
          <RowFixed>
            <StyledText fontSize="14px">{t('Liquidity Provider Fee')}</StyledText>
            <QuestionHelper
              text={
                <>
                  <StyledText mb="12px">{t('For each trade a %amount% fee is paid', { amount: '0.25%' })}</StyledText>
                  <StyledText>- {t('%amount% to LP token holders', { amount: '0.17%' })}</StyledText>
                  <StyledText>- {t('%amount% to the Treasury', { amount: '0.03%' })}</StyledText>
                  <StyledText>- {t('%amount% towards CAKE buyback and burn', { amount: '0.05%' })}</StyledText>
                </>
              }
              ml="4px"
            />
          </RowFixed>
          <StyledText fontSize="14px">
            {realizedLPFee ? `${realizedLPFee?.toSignificant(6)} ${trade.inputAmount.currency.symbol}` : '-'}
          </StyledText>
        </RowBetween>
      </SwapModalFooterContainer>

      <AutoRow>
        <StyledButton
          style={{
            background: severity > 2 ? '#EF4444' : '#1B435F',
            border: severity > 2 ? '1px solid #EF4444' : '1px solid #1B435F',
            color: severity > 2 ? '#FFFFFF' : 'rgb(74, 254, 253)'
          }}
          onClick={onConfirm}
          disabled={disabledConfirm}
          id="confirm-swap-or-send"
        >
          {severity > 2 ? t('Swap Anyway') : t('Confirm Swap')}
        </StyledButton>

        {swapErrorMessage ? <SwapCallbackError error={swapErrorMessage} /> : null}
      </AutoRow>
    </>
  )
}
