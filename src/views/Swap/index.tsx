import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'

import { Currency, CurrencyAmount, JSBI, Token, Trade } from '@pancakeswap/sdk'
import { Button, Text, ArrowDownIcon, Box, useModal } from '@pancakeswap/uikit'
import { useIsTransactionUnsupported } from 'hooks/Trades'
import UnsupportedCurrencyFooter from 'components/UnsupportedCurrencyFooter'
import { RouteComponentProps } from 'react-router-dom'
import { useTranslation } from 'contexts/Localization'
import useDebounce from 'hooks/useDebounce'
import { filterTokens, useSortedTokensByQuery } from 'components/SearchModal/filtering'
import useTokenComparator from 'components/SearchModal/sorting'

import SwapWarningTokens from 'config/constants/swapWarningTokens'
import AddressInputPanel from './components/AddressInputPanel'
import { GreyCard } from '../../components/Card'
import Column, { AutoColumn } from '../../components/Layout/Column'
import ConfirmSwapModal from './components/ConfirmSwapModal'
import CurrencyInputPanel from '../../components/CurrencyInputPanel'
import { AutoRow, RowBetween } from '../../components/Layout/Row'
import AdvancedSwapDetailsDropdown from './components/AdvancedSwapDetailsDropdown'
import confirmPriceImpactWithoutFee from './components/confirmPriceImpactWithoutFee'
import { ArrowWrapper, SwapCallbackError, Wrapper } from './components/styleds'
import TradePrice from './components/TradePrice'
import ImportTokenWarningModal from './components/ImportTokenWarningModal'
import ProgressSteps from './components/ProgressSteps'
import { AppHeader, AppBody } from '../../components/App'
import ConnectWalletButton from '../../components/ConnectWalletButton'

import { INITIAL_ALLOWED_SLIPPAGE } from '../../config/constants'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import { useCurrency, useAllTokens } from '../../hooks/Tokens'
import { ApprovalState, useApproveCallbackFromTrade } from '../../hooks/useApproveCallback'
import { useSwapCallback } from '../../hooks/useSwapCallback'
import useWrapCallback, { WrapType } from '../../hooks/useWrapCallback'
import { Field } from '../../state/swap/actions'
import {
  useDefaultsFromURLSearch,
  useDerivedSwapInfo,
  useSwapActionHandlers,
  useSwapState,
} from '../../state/swap/hooks'


import { useExpertModeManager, useUserSlippageTolerance, useUserSingleHopOnly } from '../../state/user/hooks'
import { maxAmountSpend } from '../../utils/maxAmountSpend'
import { computeTradePriceBreakdown, warningSeverity } from '../../utils/prices'
import CircleLoader from '../../components/Loader/CircleLoader'
import Page from '../Page'
import SwapWarningModal from './components/SwapWarningModal'
import lpkToken from '../../config/constants/tokenLists/lpk-token.json'

const Label = styled(Text)`
  font-size: 14px;
  font-family: Ubuntu, sans-serif;
  color: ${({ theme }) => (theme.isDark) ? '#2DC60E': '#000000'};
`
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
  background: ${({ theme }) => (theme.isDark) ? '#152b39' : '#EDF4F9'};
  border: 1px solid ${({ theme }) => (theme.isDark) ? '#152b39' : '#EDF4F9'};
  color: ${({ theme }) => (theme.isDark) ? '#ffffff' : '#000000'};
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
  background: ${({ theme }) => (theme.isDark) ? '#12344c' : '#FFFFFF'};
  border: 1px solid ${({ theme }) => (theme.isDark) ? '#12344c' : '#FFFFFF'};
  color: ${({ theme }) => (theme.isDark) ? '#ffffff' : '#000000'};

  border-radius: 8px;
  padding: 0.75rem;
  cursor: pointer;
  margin-top: 10px;
  display: flex;
  justify-content: center;

  :focus,
  :hover {
    background: ${({ theme }) => (theme.isDark) ? '#27618b' : '#27618b'};
    border: 1px solid ${({ theme }) => (theme.isDark) ? '#27618b' : '#27618b'};
    color: rgb(74, 254, 253);
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
export const ArrowDownButton = styled.div`
  color: ${({ theme }) => (theme.isDark) ? '#27618b': '#000000'};
  font-size: 24px;
  font-weight: 500;

  :hover {
    color: ${({ theme }) => (theme.isDark) ? '#27618b': '#13667C' };
  }
`

export const StyledSwapButton = styled(Button)`
  font-weight: 500;
  font-family: Ubuntu, sans-serif;
  border-radius: 8px;
  
`



export default function Swap({ history }: RouteComponentProps) {

  const loadedUrlParams = useDefaultsFromURLSearch()

  const { t } = useTranslation()

  // token warning stuff
  const [loadedInputCurrency, loadedOutputCurrency] = [
    useCurrency(loadedUrlParams?.inputCurrencyId),
    useCurrency(loadedUrlParams?.outputCurrencyId),
  ]
  const urlLoadedTokens: Token[] = useMemo(
    () => [loadedInputCurrency, loadedOutputCurrency]?.filter((c): c is Token => c instanceof Token) ?? [],
    [loadedInputCurrency, loadedOutputCurrency],
  )

  // dismiss warning if all imported tokens are in active lists
  const defaultTokens = useAllTokens()
  const importTokensNotInDefault =
    urlLoadedTokens &&
    urlLoadedTokens.filter((token: Token) => {
      return !(token.address in defaultTokens)
    })

  const { account } = useActiveWeb3React()

  // for expert mode
  const [isExpertMode] = useExpertModeManager()

  // get custom setting values for user
  const [allowedSlippage] = useUserSlippageTolerance()

  // swap state
  const { independentField, typedValue, recipient } = useSwapState()
  const { v2Trade, currencyBalances, parsedAmount, currencies, inputError: swapInputError } = useDerivedSwapInfo()
  const [inputToken, setInputToken] = useState<Currency>(currencies[Field.INPUT])
  const [outputToken, setOutputToken] = useState<Currency>(currencies[Field.OUTPUT])

  const {
    wrapType,
    execute: onWrap,
    inputError: wrapInputError,
  } = useWrapCallback(currencies[Field.INPUT], currencies[Field.OUTPUT], typedValue)
  const showWrap: boolean = wrapType !== WrapType.NOT_APPLICABLE
  const trade = showWrap ? undefined : v2Trade

  const parsedAmounts = showWrap
    ? {
        [Field.INPUT]: parsedAmount,
        [Field.OUTPUT]: parsedAmount,
      }
    : {
        [Field.INPUT]: independentField === Field.INPUT ? parsedAmount : trade?.inputAmount,
        [Field.OUTPUT]: independentField === Field.OUTPUT ? parsedAmount : trade?.outputAmount,
      }

  const { onSwitchTokens, onCurrencySelection, onUserInput, onChangeRecipient } = useSwapActionHandlers()
  const isValid = !swapInputError
  const dependentField: Field = independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT

  const handleTypeInput = useCallback(
    (value: string) => {
      onUserInput(Field.INPUT, value)
    },
    [onUserInput],
  )
  const handleTypeOutput = useCallback(
    (value: string) => {
      onUserInput(Field.OUTPUT, value)
    },
    [onUserInput],
  )

  // modal and loading
  const [{ tradeToConfirm, swapErrorMessage, attemptingTxn, txHash }, setSwapState] = useState<{
    tradeToConfirm: Trade | undefined
    attemptingTxn: boolean
    swapErrorMessage: string | undefined
    txHash: string | undefined
  }>({
    tradeToConfirm: undefined,
    attemptingTxn: false,
    swapErrorMessage: undefined,
    txHash: undefined,
  })

  const formattedAmounts = {
    [independentField]: typedValue,
    [dependentField]: showWrap
      ? parsedAmounts[independentField]?.toExact() ?? ''
      : parsedAmounts[dependentField]?.toSignificant(6) ?? '',
  }

  const route = trade?.route
  const userHasSpecifiedInputOutput = Boolean(
    currencies[Field.INPUT] && currencies[Field.OUTPUT] && parsedAmounts[independentField]?.greaterThan(JSBI.BigInt(0)),
  )
  const noRoute = !route

  // check whether the user has approved the router on the input token
  const [approval, approveCallback] = useApproveCallbackFromTrade(trade, allowedSlippage)

  // check if user has gone through approval process, used to show two step buttons, reset on token change
  const [approvalSubmitted, setApprovalSubmitted] = useState<boolean>(false)

  // mark when a user has submitted an approval, reset onTokenSelection for input field
  useEffect(() => {
    if (approval === ApprovalState.PENDING) {
      setApprovalSubmitted(true)
    }
  }, [approval, approvalSubmitted])

  const maxAmountInput: CurrencyAmount | undefined = maxAmountSpend(currencyBalances[Field.INPUT])
  const atMaxAmountInput = Boolean(maxAmountInput && parsedAmounts[Field.INPUT]?.equalTo(maxAmountInput))

  // the callback to execute the swap
  const { callback: swapCallback, error: swapCallbackError } = useSwapCallback(trade, allowedSlippage, recipient)

  const { priceImpactWithoutFee } = computeTradePriceBreakdown(trade)

  const [singleHopOnly] = useUserSingleHopOnly()

  const handleSwap = useCallback(() => {
    if (priceImpactWithoutFee && !confirmPriceImpactWithoutFee(priceImpactWithoutFee, t)) {
      return
    }
    if (!swapCallback) {
      return
    }
    setSwapState({ attemptingTxn: true, tradeToConfirm, swapErrorMessage: undefined, txHash: undefined })
    swapCallback()
      .then((hash) => {
        setSwapState({ attemptingTxn: false, tradeToConfirm, swapErrorMessage: undefined, txHash: hash })
      })
      .catch((error) => {
        setSwapState({
          attemptingTxn: false,
          tradeToConfirm,
          swapErrorMessage: error.message,
          txHash: undefined,
        })
      })
  }, [priceImpactWithoutFee, swapCallback, tradeToConfirm, t])

  // errors
  const [showInverted, setShowInverted] = useState<boolean>(false)

  // warnings on slippage
  const priceImpactSeverity = warningSeverity(priceImpactWithoutFee)

  // show approve flow when: no error on inputs, not approved or pending, or approved in current session
  // never show if price impact is above threshold in non expert mode
  const showApproveFlow =
    !swapInputError &&
    (approval === ApprovalState.NOT_APPROVED ||
      approval === ApprovalState.PENDING ||
      (approvalSubmitted && approval === ApprovalState.APPROVED)) &&
    !(priceImpactSeverity > 3 && !isExpertMode)

  const handleConfirmDismiss = useCallback(() => {
    setSwapState({ tradeToConfirm, attemptingTxn, swapErrorMessage, txHash })
    // if there was a tx hash, we want to clear the input
    if (txHash) {
      onUserInput(Field.INPUT, '')
    }
  }, [attemptingTxn, onUserInput, swapErrorMessage, tradeToConfirm, txHash])

  const handleAcceptChanges = useCallback(() => {
    setSwapState({ tradeToConfirm: trade, swapErrorMessage, txHash, attemptingTxn })
  }, [attemptingTxn, swapErrorMessage, trade, txHash])

  // swap warning state
  const [swapWarningCurrency, setSwapWarningCurrency] = useState(null)
  const [onPresentSwapWarningModal] = useModal(<SwapWarningModal swapCurrency={swapWarningCurrency} />)

  const shouldShowSwapWarning = (swapCurrency) => {
    const isWarningToken = Object.entries(SwapWarningTokens).find((warningTokenConfig) => {
      const warningTokenData = warningTokenConfig[1]
      return swapCurrency.address === warningTokenData.address
    })
    return Boolean(isWarningToken)
  }

  useEffect(() => {
    if (swapWarningCurrency) {
      onPresentSwapWarningModal()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [swapWarningCurrency])

  const handleInputSelect = useCallback(
    (inputCurrency) => {
      setApprovalSubmitted(false) // reset 2 step UI for approvals
      onCurrencySelection(Field.INPUT, inputCurrency)
      const showSwapWarning = shouldShowSwapWarning(inputCurrency)
      if (showSwapWarning) {
        setSwapWarningCurrency(inputCurrency)
      } else {
        setSwapWarningCurrency(null)
      }
    },
    [onCurrencySelection],
  )

  const handleMaxInput = useCallback(() => {
    if (maxAmountInput) {
      onUserInput(Field.INPUT, maxAmountInput.toExact())
    }
  }, [maxAmountInput, onUserInput])

  const handleOutputSelect = useCallback(
    (outputCurrency) => {
      onCurrencySelection(Field.OUTPUT, outputCurrency)
      const showSwapWarning = shouldShowSwapWarning(outputCurrency)
      if (showSwapWarning) {
        setSwapWarningCurrency(outputCurrency)
      } else {
        setSwapWarningCurrency(null)
      }
    },

    [onCurrencySelection],
  )

  const swapIsUnsupported = useIsTransactionUnsupported(currencies?.INPUT, currencies?.OUTPUT)

  const [onPresentImportTokenWarningModal] = useModal(
    <ImportTokenWarningModal tokens={importTokensNotInDefault} onCancel={() => history.push('/swap/')} />,
  )

  useEffect(() => {
    if (importTokensNotInDefault.length > 0) {
      onPresentImportTokenWarningModal()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [importTokensNotInDefault.length])

  const [onPresentConfirmModal] = useModal(
    <ConfirmSwapModal
      trade={trade}
      originalTrade={tradeToConfirm}
      onAcceptChanges={handleAcceptChanges}
      attemptingTxn={attemptingTxn}
      txHash={txHash}
      recipient={recipient}
      allowedSlippage={allowedSlippage}
      onConfirm={handleSwap}
      swapErrorMessage={swapErrorMessage}
      customOnDismiss={handleConfirmDismiss}
    />,
    true,
    true,
    'confirmSwapModal',
  )


  const [indexActive, setIndexActive] = useState(undefined)
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

  
  const selectTokens = (token: Token, index: number) => {
    setIndexActive(index)
    
    const LPK = new Token(lpkToken.tokens.chainId, lpkToken.tokens.address, lpkToken.tokens.decimals, lpkToken.tokens.symbol, lpkToken.tokens.name)
    currencies[Field.INPUT] = token;
    setInputToken(currencies[Field.INPUT])
    currencies[Field.OUTPUT] = LPK;
    setOutputToken(currencies[Field.OUTPUT])

    handleInputSelect(currencies[Field.INPUT])
    handleOutputSelect(currencies[Field.OUTPUT])
  }

  const setSwitchToken = () => {
    setInputToken(currencies[Field.OUTPUT])
    setOutputToken(currencies[Field.INPUT])
  }

  return (
    <Page>
      <BodyFlexRow>
        <BodyWrapper>
          <PairCardBox>
            <span>Pair</span>
            {filteredSortedTokens.map((token, i) => {     
              return (
                <PairSelectButton
                  onClick={() => {
                    selectTokens(token, i)
                  }}
                  className={indexActive === i ? 'active' : ''}
                  >
                  <span>{token.symbol}/{lpkToken.tokens.symbol}</span>
                </PairSelectButton>
              ) 
            })}
          </PairCardBox>
        </BodyWrapper>
      </BodyFlexRow>
      <AppBody>
        <AppHeader title={t('Swap')} subtitle='' />
        <Wrapper id="swap-page">
          <AutoColumn gap="md">
            <CurrencyInputPanel
              label={independentField === Field.OUTPUT && !showWrap && trade ? t('From (estimated)') : t('From')}
              value={formattedAmounts[Field.INPUT]}
              showMaxButton={!atMaxAmountInput}
              currency={inputToken}
              onUserInput={handleTypeInput}
              onMax={handleMaxInput}
              onCurrencySelect={handleInputSelect}
              otherCurrency={outputToken}
              id="swap-currency-input"
            />
            <AutoColumn justify="space-between">
              <AutoRow justify={isExpertMode ? 'space-between' : 'center'} style={{ padding: '0 1rem' }}>
                <ArrowWrapper clickable>
                  <ArrowDownButton
                    onClick={() => {
                      setApprovalSubmitted(false) // reset 2 step UI for approvals
                      onSwitchTokens()
                      setSwitchToken()
                    }}
                  >
                    <i className="bi bi-arrow-repeat" />
                  </ArrowDownButton>
                </ArrowWrapper>
                {recipient === null && !showWrap && isExpertMode ? (
                  <StyledSwapButton variant="text" id="add-recipient-button" onClick={() => onChangeRecipient('')}>
                    {t('+ Add a send (optional)')}
                  </StyledSwapButton>
                ) : null}
              </AutoRow>
            </AutoColumn>
            <CurrencyInputPanel
              value={formattedAmounts[Field.OUTPUT]}
              onUserInput={handleTypeOutput}
              label={independentField === Field.INPUT && !showWrap && trade ? t('To (estimated)') : t('To')}
              showMaxButton={false}
              currency={outputToken}
              onCurrencySelect={handleOutputSelect}
              otherCurrency={inputToken}
              id="swap-currency-output"
            />

            {isExpertMode && recipient !== null && !showWrap ? (
              <>
                <AutoRow justify="space-between" style={{ padding: '0 1rem' }}>
                  <ArrowWrapper clickable={false}>
                    <ArrowDownIcon width="16px" />
                  </ArrowWrapper>
                  <StyledSwapButton variant="text" id="remove-recipient-button" onClick={() => onChangeRecipient(null)}>
                    {t('- Remove send')}
                  </StyledSwapButton>
                </AutoRow>
                <AddressInputPanel id="recipient" value={recipient} onChange={onChangeRecipient} />
              </>
            ) : null}

            {showWrap ? null : (
              <AutoColumn gap="8px" style={{ padding: '0 16px' }}>
                {Boolean(trade) && (
                  <RowBetween align="center">
                    <Label>{t('Price')}</Label>
                    <TradePrice
                      price={trade?.executionPrice}
                      showInverted={showInverted}
                      setShowInverted={setShowInverted}
                    />
                  </RowBetween>
                )}
                {allowedSlippage !== INITIAL_ALLOWED_SLIPPAGE && (
                  <RowBetween align="center">
                    <Label>{t('Slippage Tolerance')}</Label>
                    <Text bold color="primary">
                      {allowedSlippage / 100}%
                    </Text>
                  </RowBetween>
                )}
              </AutoColumn>
            )}
          </AutoColumn>
          <Box mt="1rem">
            {swapIsUnsupported ? (
              <StyledSwapButton width="100%" disabled mb="4px">
                {t('Unsupported Asset')}
              </StyledSwapButton>
            ) : !account ? (
              <ConnectWalletButton width="100%" />
            ) : showWrap ? (
              <StyledSwapButton width="100%" disabled={Boolean(wrapInputError)} onClick={onWrap}>
                {wrapInputError ??
                  (wrapType === WrapType.WRAP ? t('Wrap') : wrapType === WrapType.UNWRAP ? t('Unwrap') : null)}
              </StyledSwapButton>
            ) : noRoute && userHasSpecifiedInputOutput ? (
              <GreyCard style={{ textAlign: 'center' }}>
                <Text color="textSubtle" mb="4px">
                  {t('Insufficient liquidity for this trade.')}
                </Text>
                {singleHopOnly && (
                  <Text color="textSubtle" mb="4px">
                    {t('Try enabling multi-hop trades.')}
                  </Text>
                )}
              </GreyCard>
            ) : showApproveFlow ? (
              <RowBetween>
                <StyledSwapButton
                  variant={approval === ApprovalState.APPROVED ? 'success' : 'primary'}
                  onClick={approveCallback}
                  disabled={approval !== ApprovalState.NOT_APPROVED || approvalSubmitted}
                  width="48%"
                >
                  {approval === ApprovalState.PENDING ? (
                    <AutoRow gap="6px" justify="center">
                      {t('Enabling')} <CircleLoader stroke="white" />
                    </AutoRow>
                  ) : approvalSubmitted && approval === ApprovalState.APPROVED ? (
                    t('Enabled')
                  ) : (
                    t('Enable %asset%', { asset: currencies[Field.INPUT]?.symbol ?? '' })
                  )}
                </StyledSwapButton>
                <StyledSwapButton
                  variant={isValid && priceImpactSeverity > 2 ? 'danger' : 'primary'}
                  onClick={() => {
                    if (isExpertMode) {
                      handleSwap()
                    } else {
                      setSwapState({
                        tradeToConfirm: trade,
                        attemptingTxn: false,
                        swapErrorMessage: undefined,
                        txHash: undefined,
                      })
                      onPresentConfirmModal()
                    }
                  }}
                  width="48%"
                  id="swap-button"
                  disabled={
                    !isValid || approval !== ApprovalState.APPROVED || (priceImpactSeverity > 3 && !isExpertMode)
                  }
                >
                  {priceImpactSeverity > 3 && !isExpertMode
                    ? t('Price Impact High')
                    : priceImpactSeverity > 2
                    ? t('Swap Anyway')
                    : t('Swap')}
                </StyledSwapButton>
              </RowBetween>
            ) : (
              <StyledSwapButton
                variant={isValid && priceImpactSeverity > 2 && !swapCallbackError ? 'danger' : 'primary'}
                onClick={() => {
                  if (isExpertMode) {
                    handleSwap()
                  } else {
                    setSwapState({
                      tradeToConfirm: trade,
                      attemptingTxn: false,
                      swapErrorMessage: undefined,
                      txHash: undefined,
                    })
                    onPresentConfirmModal()
                  }
                }}
                id="swap-button"
                width="100%"
                disabled={!isValid || (priceImpactSeverity > 3 && !isExpertMode) || !!swapCallbackError}
              >
                {swapInputError ||
                  (priceImpactSeverity > 3 && !isExpertMode
                    ? t('Price Impact Too High')
                    : priceImpactSeverity > 2
                    ? t('Swap Anyway')
                    : t('Swap'))}
              </StyledSwapButton>
            )}
            {showApproveFlow && (
              <Column style={{ marginTop: '1rem' }}>
                <ProgressSteps steps={[approval === ApprovalState.APPROVED]} />
              </Column>
            )}
            {isExpertMode && swapErrorMessage ? <SwapCallbackError error={swapErrorMessage} /> : null}
          </Box>
        </Wrapper>
      </AppBody>
      {!swapIsUnsupported ? (
        <AdvancedSwapDetailsDropdown trade={trade} />
      ) : (
        <UnsupportedCurrencyFooter currencies={[currencies.INPUT, currencies.OUTPUT]} />
      )}
    </Page>
  )
}
