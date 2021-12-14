/* eslint-disable */
import React from 'react'
import { Currency, Pair } from '@pancakeswap/sdk'
import { Button, Text, Flex } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useCurrencyBalance } from '../../state/wallet/hooks'
import { DoubleCurrencyLogo } from '../Logo'
// import CurrencySearchModal from '../SearchModal/CurrencySearchModal'

import { RowBetween } from '../Layout/Row'
import { Input as NumericalInput } from './NumericalInput'

const InputWrapper = styled.div`
`
const StyledText = styled(Text)`
  color: ${({ theme }) => (theme.isDark) ? '#FFFFFF' : '#000'} !important;
  font-size: 14px;
  font-family: Ubuntu, sans-serif;
`

const StyledTokenSymbolText = styled(Text)`
  color: ${({ theme }) => (theme.isDark) ? '#FFFFFF' : '#000'} !important;
  font-size: 20px;
  font-weight: 700;
  line-height: 1;
  padding-bottom: 4px;
  
  span {
    font-size: 16px;
  }
`

const InputRow = styled.div<{ selected: boolean }>`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  padding: ${({ selected }) => (selected ? '0.375rem 0.525rem' : '0.375rem 0.525rem')};
`
const CurrencySelectButton = styled(Button).attrs({ variant: 'text', scale: 'sm' })`
  width: 50%;
  display: flex;
  justify-content: flex-start;
  padding: 24px 10px;
  cursor: default;
  border-radius: 8px;
  overflow: hidden;
  :hover {
    opacity: 1 !important;
  }
  :active {
    transform: none !important;
  }
`
const LabelRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  font-size: 0.75rem;
  line-height: 1rem;
`
const InputPanel = styled.div<{ hideInput?: boolean }>`
  display: flex;
  flex-flow: column nowrap;
  margin-top: 8px;
  position: relative;
  border-radius: ${({ hideInput }) => (hideInput ? '8px' : '20px')};
  background-color: ${({ theme }) => theme.colors.background};
  z-index: 1;
`

const NumericalInputWrapper = styled.div`
  display: flex;
  width: 50%;
  align-items: center;
  border-radius: 8px;
  border: 1px solid  ${({ theme }) => (theme.isDark) ? '#152b39' : '#13667C'}; 
`

const Container = styled.div<{ hideInput: boolean }>`
  border-radius: 8px;
  background-color: ${({ theme }) => (theme.isDark) ? '#27618b' : '#EDF4F9'};
`
const TokenLogo = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 8px;
`

interface CurrencyInputPanelProps {
  value: string
  onUserInput: (value: string) => void
  onMax?: () => void
  showMaxButton: boolean
  label?: string
  onCurrencySelect: (currency: Currency) => void
  currency?: Currency | null
  disableCurrencySelect?: boolean
  hideBalance?: boolean
  pair?: Pair | null
  hideInput?: boolean
  otherCurrency?: Currency | null
  id: string
  showCommonBases?: boolean
  currencyLogo: string
}
export default function CurrencyInputPanel({
  value,
  onUserInput,
  onMax,
  showMaxButton,
  label,
  onCurrencySelect,
  currency,
  disableCurrencySelect = false,
  hideBalance = false,
  pair = null, // used for double token logo
  hideInput = false,
  otherCurrency,
  id,
  showCommonBases,
  currencyLogo,
}: CurrencyInputPanelProps) {
  const { account } = useActiveWeb3React()
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined)
  const { t } = useTranslation()
  const translatedLabel = label || t('Input')

  return (
    <>
    <InputWrapper>
      <StyledText fontSize="14px">{translatedLabel}</StyledText>
      <InputPanel id={id}>
        <Container hideInput={hideInput}>
          
          <InputRow style={hideInput ? { padding: '0', borderRadius: '8px' } : {}} selected={disableCurrencySelect}>
            <CurrencySelectButton
              selected={!!currency}
              className="open-currency-select-button"
            >
              {pair ? (
                <DoubleCurrencyLogo currency0={pair.token0} currency1={pair.token1} size={16} margin />
              ) : currency ? (
                // <CurrencyLogo currency={currency} size="24px" style={{ marginRight: '8px' }} />

                <TokenLogo src={currencyLogo}/>
              ) : null}
              <Flex alignItems="flex-start" justifyContent="start" flexDirection="column">
                <Flex alignItems="center" justifyContent="space-between">
                  {pair ? (
                    <StyledTokenSymbolText id="pair">
                      {pair?.token0.symbol}:{pair?.token1.symbol}
                    </StyledTokenSymbolText>
                  ) : (
                    <StyledTokenSymbolText id="pair">
                      {(currency && currency.symbol && currency.symbol.length > 20
                        ? `${currency.symbol.slice(0, 4)}...${currency.symbol.slice(
                            currency.symbol.length - 5,
                            currency.symbol.length,
                          )}`
                        : currency?.symbol) || (<span>{t('Select a currency')}</span>)}
                    </StyledTokenSymbolText>
                  )}
                </Flex>

                {!hideInput && (
                  <LabelRow>
                    <RowBetween>
                      <StyledText>{t('Balance:')}&nbsp;</StyledText>
                      {account ? (
                        <StyledText onClick={onMax} fontSize="14px" style={{ display: 'inline', cursor: 'pointer' }}>
                          {!hideBalance && !!currency
                            ? t(' %balance%', { balance: selectedCurrencyBalance?.toSignificant(6) ?? t('Loading') })
                            : ' -'}
                        </StyledText>
                      ) : ' -'}
                    </RowBetween>
                  </LabelRow>
                )}
              </Flex>
            </CurrencySelectButton>
            {!hideInput && (
              <NumericalInputWrapper>
                <NumericalInput
                  className="token-amount-input"
                  value={value}
                  onUserInput={(val) => {
                    onUserInput(val)
                  }}
                />
                {account && currency && showMaxButton && label !== 'To' && (
                  <Button onClick={onMax} scale="sm" variant="text">
                    MAX
                  </Button>
                )}
              </NumericalInputWrapper>
            )}
            
          </InputRow>
        </Container>
      </InputPanel>
    </InputWrapper>
    </>
  )
}
