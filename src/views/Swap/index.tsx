import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'

import { NetworkContext } from 'contexts/NetworkContext'

import { Currency, CurrencyAmount, JSBI, Token, Trade } from '@pancakeswap/sdk'
import { Button, Text, ArrowDownIcon, Box, useModal, Flex } from '@pancakeswap/uikit'
import { useIsTransactionUnsupported } from 'hooks/Trades'
import UnsupportedCurrencyFooter from 'components/UnsupportedCurrencyFooter'
import { RouteComponentProps } from 'react-router-dom'
import { useTranslation } from 'contexts/Localization'
import { 
  sendRequest,
  makeQueryTokenPairs,
  makeQueryTokenPools,
 } from 'utils/bitquery'
import Loader from "react-loader-spinner";

import useTheme from 'hooks/useTheme'
import useDebounce from 'hooks/useDebounce'
import { filterTokens } from 'components/SearchModal/filtering'
import useTokenComparator from 'components/SearchModal/sorting'

import Hero from 'components/Hero'
import TradingView from 'components/TradingView'
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
import SwapWarningModal from './components/SwapWarningModal'
// import lpkToken from '../../config/constants/tokenLists/lpk-token.json'
import PancakePair from '../../config/constants/tokenLists/pancake_pair.json'
import BiswapPair from '../../config/constants/tokenLists/biswap_pair.json'

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-bottom: 0;
  min-height: calc(100vh - 64px);
  background: ${({ theme }) => (theme.isDark) ? '#12344c' : 'rgb(247, 248, 250)' }; 

  ${({ theme }) => theme.mediaQueries.xs} {
    background-size: auto;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-bottom: 0;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    min-height: calc(100vh - 64px);
  }
`
const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  background: ${({ theme }) => (theme.isDark) ? '#12344c' : 'rgb(247, 248, 250)' }; 

`
const StyledFlex = styled(Flex)`
  display: flex;
  align-items: start;
  width: 100%;
  padding: 16px;
  padding-bottom: 2rem;
  justify-content: space-between;
  max-width: 1440px;
  background: ${({ theme }) => (theme.isDark) ? '#12344c' : 'rgb(247, 248, 250)' }; 
  ${({ theme }) => theme.mediaQueries.xs} {
    flex-direction: column;
    align-items: start;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: column;
    align-items: start;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
  }
`
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
export const PairViewMoreButton = styled.a`
  position: relative;
  width: 100%;
  background: transparent;
  color: ${({ theme }) => (theme.isDark) ? '#ffffff' : '#000000'};
  cursor: pointer;
  margin-top: 16px;
  display: flex;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;   

  :focus,
  :hover {
    color: ${({ theme }) => (theme.isDark) ? '#27618b' : '#27618b'};
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
export const StyledTradingInformationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 420px;
  width: 100%;
  background: ${({ theme }) => (theme.isDark) ? '#152b39' : '#FFFFFF'};
  border: 1px solid ${({ theme }) => (theme.isDark) ? '#152b39' : '#EDF4F9'};
  color: ${({ theme }) => (theme.isDark) ? '#ffffff' : '#000000'};
  border-radius: 8px;
  text-align: center;  
  padding: 1rem;
  margin-top: 5px;
`
export const TradingInfoTitle = styled.span`
  font-size: 16px;
  font-weight: 500; 
  width: 100%;
  color: ${({ theme }) => (theme.isDark) ? '#ffffff' : '#000000'};
  border-bottom: 1px solid ${({ theme }) => (theme.isDark) ? '#152b39' : '#EDF4F9'};
  padding-bottom: 1rem;
`
export const TradingInfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  font-weight: 500; 
  width: 100%;
  color: ${({ theme }) => (theme.isDark) ? '#ffffff' : '#000000'};
  margin-top: 15px;
`
export const TradingInfoRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`
export const TradingMoreInfoButton = styled.a`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 15px;
  cursor: pointer;

  :hover {
    color: ${({ theme }) => (theme.isDark) ? '#27618b': '#13667C' };
  }
`

export default function Swap({ history }: RouteComponentProps) {

  const loadedUrlParams = useDefaultsFromURLSearch()

  const { t } = useTranslation()
  const { theme } = useTheme()

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
  const [searchQuery] = useState<string>('')

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

  // const filteredSortedTokens = useSortedTokensByQuery(sortedTokens, debouncedQuery)
  const [networkId, setNetworkId] = useState(0)

  // Load more 
  const INIT_LIMIT = 3
  const [limit, setLimit] = useState(INIT_LIMIT)
  
  const showMorePairs = () => {
    setLimit(limit + 3);
  };

  const [ inputTokenPools, setInputTokenPools ] = useState(undefined)
  const [ outputTokenPools, setOutputTokenPools ] = useState(undefined)
  const [ totalLiquidity, setTotalLiquidity ] = useState(undefined)
  const [ currentPrice, setCurrentPrice ] = useState(undefined)
  
  const selectPairTokens = (token, index: number) => {

    setIndexActive(index)
    const inputPairToken = new Token(token.input.chainId, token.input.address, token.input.decimals, token.input.symbol, token.input.name)
    const outputPairToken = new Token(token.output.chainId, token.output.address, token.output.decimals, token.output.symbol, token.output.name)

    currencies[Field.INPUT] = inputPairToken;
    setInputToken(currencies[Field.INPUT])
    currencies[Field.OUTPUT] = outputPairToken;
    setOutputToken(currencies[Field.OUTPUT])

    handleInputSelect(currencies[Field.INPUT])
    handleOutputSelect(currencies[Field.OUTPUT])

    fetchLiquidityPools(token)
  }

  const fetchLiquidityPools = async (token) => {
    if (token.input.symbol === 'LPK' && token.output.symbol === "LPKX"){
      // LPK/LPKX
      // Fetch graphql.bitquery.io
      const paireData = sendRequest(makeQueryTokenPairs(token.input.address))
      const address = (await paireData).ethereum.dexTrades[5].poolToken.address.address
      const poolsData = sendRequest(makeQueryTokenPools(address, token.input.address, token.output.address))
      const inputPools = (await poolsData).ethereum.address[0].balances[0].value
      const outputPools = (await poolsData).ethereum.address[0].balances[1].value
      
      setInputTokenPools(inputPools)
      setOutputTokenPools(outputPools)
      setTotalLiquidity(inputPools * currentPrice * 2)

    }else if (token.input.symbol === 'BNB' && token.output.symbol === "LPK"){
      // BNB/LPK
      // Fetch graphql.bitquery.io
      const paireData = sendRequest(makeQueryTokenPairs(token.output.address))
      const address = (await paireData).ethereum.dexTrades[1].poolToken.address.address
      const poolsData = sendRequest(makeQueryTokenPools(address, token.input.address, token.output.address))
      const inputPools = (await poolsData).ethereum.address[0].balances[0].value
      const outputPools = (await poolsData).ethereum.address[0].balances[1].value
      
      setInputTokenPools(inputPools)
      setOutputTokenPools(outputPools)
      setTotalLiquidity(outputPools * currentPrice * 2)

      // setTotalLiquidity(inputPools * price * 2)
    }else if (token.input.symbol === 'CAKE' && token.output.symbol === "LPK"){
      // CAKE/LPK
      const paireData = sendRequest(makeQueryTokenPairs(token.output.address))
      const address = (await paireData).ethereum.dexTrades[0].poolToken.address.address
      const poolsData = sendRequest(makeQueryTokenPools(address, token.input.address, token.output.address))
      const inputPools = (await poolsData).ethereum.address[0].balances[0].value
      const outputPools = (await poolsData).ethereum.address[0].balances[1].value
      
      setInputTokenPools(inputPools)
      setOutputTokenPools(outputPools)
      setTotalLiquidity(outputPools * currentPrice * 2)
    }
  }

  const setSwitchToken = () => {
    setInputToken(currencies[Field.OUTPUT])
    setOutputToken(currencies[Field.INPUT])
  }

  const [marcketCap, setMarcketCap] = useState(undefined)
  const [dailyVolumn, setDailyVolumn] = useState(undefined)
  const [circulationSupply, setCirculationSupply] = useState(undefined)
  const [totalSupply, setTotalSupply] = useState(undefined)
  // const [marcketCap, setMarcketCap] = useState(undefined)

  useEffect(() => {

    const getMarketsData = () => {
      fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=l-pesa&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h')
        .then(response => response.json())
        .then(response => {
          console.log('markets', response);
          setMarcketCap(response[0].market_cap)
          setDailyVolumn(response[0].total_volume)
          setCirculationSupply(response[0].circulating_supply)
          setTotalSupply(response[0].total_supply)
          setCurrentPrice(response[0].current_price)
        })
        .catch(error => console.log('error', error));
    }
    getMarketsData()
  }, []);

  // Switch Network and set tokens
  useEffect(() => {
    switch (networkId) {
      case 4:
        handleTokenList(BiswapPair)
        break;
    
      default:
        handleTokenList(PancakePair)
        break;
    }      
  }, [networkId]);

  const [tokenList, setTokenList] = useState(PancakePair)
  const handleTokenList = (tokens) => {
    setTokenList(tokens)
  }
  

  return (
    // <Page>
    <StyledWrapper>
      <NetworkContext.Provider value={{networkId, setNetworkId}}>
        <StyledFlex>
          <Hero />
          <StyledPage>
            <BodyFlexRow>
              <BodyWrapper>
                <PairCardBox>
                  <span>{t('Pair')}</span>

                  {tokenList.pairs.slice(0, limit).map((token, i) => {     
                    return (
                      <PairSelectButton
                        onClick={() => {
                          selectPairTokens(token, i)
                        }}
                        className={indexActive === i ? 'active' : ''}
                      >
                        <span>{token.input.symbol}/{token.output.symbol}</span>
                      </PairSelectButton>
                    ) 
                  })}

                  <PairViewMoreButton
                    onClick={() => {
                      showMorePairs()
                    }}
                  >
                    View More
                  </PairViewMoreButton>
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
            
            <StyledTradingInformationWrapper>
              <TradingInfoTitle>
                Trading Information
              </TradingInfoTitle>

              <TradingInfoColumn>
                {(currencies?.INPUT && currencies?.OUTPUT) 
                ? (
                  <TradingInfoRow>
                    <span>Total liquidity:</span> 
                    {(totalLiquidity !== undefined) ? (
                      <span>${totalLiquidity.toFixed(4)}</span> ) 
                      : ( 
                      <span>
                        <Loader
                          type="ThreeDots"
                          color={theme.isDark ? '#00BFFF' : '#6e6e6e'}
                          height={20}
                          width={20}
                        />
                      </span>
                    )}
                  </TradingInfoRow>
                  ) : null
                }
                {(currencies?.INPUT && currencies?.OUTPUT) 
                ? (
                  <TradingInfoRow>
                    <span>Pooled {currencies?.INPUT.symbol}:</span> 
                    {(inputTokenPools !== undefined) ? (
                      <span>${inputTokenPools.toFixed(4)}</span> ) 
                      : ( 
                      <span>
                        <Loader
                          type="ThreeDots"
                          color={theme.isDark ? '#00BFFF' : '#6e6e6e'}
                          height={20}
                          width={20}
                        />
                      </span>
                    )}
                  </TradingInfoRow>
                  ) : null
                }
                {(currencies?.INPUT && currencies?.OUTPUT) 
                ? (
                  <TradingInfoRow>
                    <span>Pooled {currencies?.OUTPUT.symbol}:</span> 
                    {(outputTokenPools !== undefined) ? (
                      <span>${outputTokenPools.toFixed(4)}</span> ) 
                      : ( 
                        <span>
                          <Loader
                            type="ThreeDots"
                            color={theme.isDark ? '#00BFFF' : '#6e6e6e'}
                            height={20}
                            width={20}
                          />
                        </span>
                    )}
                  </TradingInfoRow>
                  ) : null
                }
                <TradingInfoRow>
                  <span>Daily volume:</span> 
                  {(dailyVolumn !== undefined) ? (
                    <span>${dailyVolumn}</span> ) 
                    : ( 
                    <span>
                      <Loader
                        type="ThreeDots"
                        color={theme.isDark ? '#00BFFF' : '#6e6e6e'}
                        height={20}
                        width={20}
                      />
                    </span>
                  )}
                </TradingInfoRow>
                <TradingInfoRow>
                  <span>Market Cap:</span> 
                  {(marcketCap !== undefined) ? (
                    <span>${marcketCap}</span> ) 
                    : ( 
                    <span>
                      <Loader
                        type="ThreeDots"
                        color={theme.isDark ? '#00BFFF' : '#6e6e6e'}
                        height={20}
                        width={20}
                      />
                    </span>
                  )}
                </TradingInfoRow>
                <TradingMoreInfoButton>
                  <span>More Information</span> 
                </TradingMoreInfoButton>
              </TradingInfoColumn>

            </StyledTradingInformationWrapper>
            <Flex flexGrow={1} />
          </StyledPage>
          <TradingView />
        </StyledFlex>
      </NetworkContext.Provider>
    </StyledWrapper>
    // </Page>
  )
}
