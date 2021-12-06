import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { NetworkContext } from 'contexts/NetworkContext'
import axios from "axios";

import { Currency, CurrencyAmount, JSBI, Token, Trade } from '@pancakeswap/sdk'
import { Text, ArrowDownIcon, Box, useModal, Flex } from '@pancakeswap/uikit'
import { useIsTransactionUnsupported } from 'hooks/Trades'
import UnsupportedCurrencyFooter from 'components/UnsupportedCurrencyFooter'
import { RouteComponentProps } from 'react-router-dom'
import { useTranslation } from 'contexts/Localization'
import { 
  MARKETS_ENDPOINT,
  LIQUIDITY_ENDPOINT,
  PANCAKESWAP_ENDPOINT
} from 'utils/apis'

// import Loader from "react-loader-spinner";
import ProgressBar from "@ramonak/react-progress-bar";
import useTheme from 'hooks/useTheme'
// import useDebounce from 'hooks/useDebounce'
// import { filterTokens } from 'components/SearchModal/filtering'
// import useTokenComparator from 'components/SearchModal/sorting'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { formatAmount } from 'views/Info/utils/formatInfoNumbers'
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
import {
  StyledPage,
  StyledWrapper,
  StyledFlex,
  Label,
  BodyWrapper,
  PairCardBox,
  PairSelectBody,
  PairEmpty,
  PairProgressLabel,
  ArrowDownButton,
  StyledSwapButton,
  ResponsiveGrid,
  StyledText,
  LinkWrapper,
  ArrowWrapper, 
  SwapCallbackError, 
  Wrapper, 
  ClickableColumnHeader, 
  TableWrapper, 
  Break, 
  DoubleLogoWrapper,
  DoubleLogo,
  DoubleLogoImg,
  DoubleLogoFlex,
  OutSideLink,
  OutSideLinkIcon
} from './components/styleds'
import TradePrice from './components/TradePrice'
import ImportTokenWarningModal from './components/ImportTokenWarningModal'
import ProgressSteps from './components/ProgressSteps'
import { AppBody } from '../../components/App'
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
import MarketList from '../../config/constants/tokenLists/market_list.json'
import PancakePair from '../../config/constants/tokenLists/pancake_pair.json'
import BiswapPair from '../../config/constants/tokenLists/biswap_pair.json'

export interface PairData {
  pairInputSymbol: string,
  pairInputAddress: string,
  pairOutputSymbol: string,
  pairOutputAddress: string,
  exchange: string,
  address: string,
  inputPools: number,
  outputPools: number,
  totalLiquidity: number
}

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
  const [inputTokenLogo, setInputTokenLogo] = useState(undefined)
  const [outputTokenLogo, setOutputTokenLogo] = useState(undefined)
  
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
  
  const [networkId, setNetworkId] = useState(0)

  const selectPairTokens = (token, index: number) => {

    // console.log('token', token)
    setIndexActive(index)
    const inputPairToken = new Token(token.pairInputChainId, token.pairInputAddress, token.pairInputDecimals, token.pairInputSymbol, token.pairInputName)
    const outputPairToken = new Token(token.pairOutputChainId, token.pairOutputAddress, token.pairOutputDecimals, token.pairOutputSymbol, token.pairOutputName)
    console.log('inputPairToken', inputPairToken)
    console.log('outputPairToken', outputPairToken)

    currencies[Field.INPUT] = inputPairToken;
    setInputToken(currencies[Field.INPUT])
    currencies[Field.OUTPUT] = outputPairToken;
    setOutputToken(currencies[Field.OUTPUT])

    setInputTokenLogo(token.pairInputLogoUrl)
    setOutputTokenLogo(token.pairOutputLogoUrl)

    handleInputSelect(inputPairToken)
    handleOutputSelect(outputPairToken)
  }

  // Switch Network and set token ID
  const [tokenListId, setTokenListId] = useState(1)

  useEffect(() => {
    switch (networkId) {
      case 0:
        setTokenListId(1)
        break;
      case 1:
        setTokenListId(null)
        break;
      case 2:
        setTokenListId(null)
        break;
      case 3:
        setTokenListId(null)
        break;
      case 4:
        setTokenListId(5)
        break;
      case 5:
        setTokenListId(null)
        break;
      case 6:
        setTokenListId(null)
        break;
      case 7:
        setTokenListId(null)
        break;
          
      default:
        setTokenListId(1)
        break;
    }      
  }, [networkId]);

  const [tokenInfo, setTokenInfo] = useState(undefined)
  const [progress, setProgress] = useState(0)
  
  const fetchLiquidityPools = async (tokenId, tokenPrice) => {
    setProgress(80)
    await axios.post(LIQUIDITY_ENDPOINT, {
      method: "POST",
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      data:{
        id: tokenId,
        price: tokenPrice
      }
    }).then((response) => {
      console.log('address', response.data.data)
      if(response.status === 200){
        setProgress(100)
      }
      setTokenInfo(response.data.data)
    })

  }

  const setSwitchToken = () => {
    setInputToken(currencies[Field.OUTPUT])
    setOutputToken(currencies[Field.INPUT])
  }

  const [marcketCap, setMarcketCap] = useState(undefined)
  const [dailyVolumn, setDailyVolumn] = useState(undefined)
  const [circulationSupply, setCirculationSupply] = useState(undefined)
  const [totalSupply, setTotalSupply] = useState(undefined)

  
  // const getMarketsData = async () => {
  //   setProgress(Math.floor(Math.random() * 40))

  //   await axios.get(MARKETS_ENDPOINT).then((response) => {
  //     const json = response.data.data
  //     setMarcketCap(json.data.market_cap)
  //     setDailyVolumn(json.data.total_volume)
  //     setCirculationSupply(json.data.circulating_supply)
  //     setTotalSupply(json.data.total_supply)
  //     setProgress(50)

  //     fetchLiquidityPools(json.data.current_price)
  //   })
  //   .catch(error => {
  //     console.error(error)
  //   });
  // }
  
  // getMarketsData()
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    let isMounted = false;
    fetchLiquidityPools(tokenListId, 10).then(() => {
      if (isMounted) return
      setIsVisible(false)
    })
    return () => {
      isMounted = true
    }
  }, [tokenListId]);

  return (
    <StyledWrapper>
      <NetworkContext.Provider value={{networkId, setNetworkId}}>
        <StyledFlex>
          <Hero 
            marcketCap={marcketCap}
            dailyVolumn={dailyVolumn}
            circulationSupply={circulationSupply}
            totalSupply={totalSupply}
          />
          <StyledPage>
            {/* <span>{t('Pair')}</span> */}
            <Tabs id="tab_1">
              <TabList>
                { MarketList.map((item) => {
                  return (<Tab key={item.symbol}>{item.symbol}</Tab>)
                }) }
              </TabList>
              { MarketList.map((item) => {
                return (
                  <TabPanel key={item.id}>
                    <PairCardBox>
                      <PairSelectBody>
                        {tokenInfo ? (
                          // <PairTable pairDatas={tokenInfo} currentTab={item.symbol}/>
                          <TableWrapper>
                            <ResponsiveGrid>
                              <ClickableColumnHeader>
                                {t('Pair')}
                              </ClickableColumnHeader>
                              <ClickableColumnHeader>
                                {t('Pools')}
                              </ClickableColumnHeader>
                              <ClickableColumnHeader>
                                {t('Liquidity')}
                              </ClickableColumnHeader>
                            </ResponsiveGrid>
                            <Break />
                            {tokenInfo.length > 0 ? (
                              <>
                                {tokenInfo.map((pairData, i) => {
                                  if (pairData.pairInputSymbol === item.symbol || 
                                    (pairData.pairInputSymbol === "WBNB" && pairData.pairOutputSymbol === item.symbol) ||
                                    (pairData.pairInputSymbol === "Cake" && pairData.pairOutputSymbol === item.symbol)
                                  ) {
                                    return (
                                      <React.Fragment key={pairData.id}>
                                        <LinkWrapper 
                                          onClick={() => {
                                            selectPairTokens(pairData, i)
                                          }}
                                        >
                                          <ResponsiveGrid>
                                            <DoubleLogoFlex>
                                              <DoubleLogoWrapper>
                                                <DoubleLogo>
                                                  <DoubleLogoImg  src={pairData.pairInputLogoUrl}/>
                                                </DoubleLogo>
                                                <DoubleLogo>
                                                  <DoubleLogoImg  src={pairData.pairOutputLogoUrl}/>
                                                </DoubleLogo>
                                              </DoubleLogoWrapper>
                                              <StyledText className={indexActive === i ? 'active' : ''} ml="8px">{pairData.pairInputSymbol}/{pairData.pairOutputSymbol}</StyledText>
                                            </DoubleLogoFlex>
                                            <StyledText className={indexActive === i ? 'active' : ''}>${formatAmount(pairData.inputPools)}/${formatAmount(pairData.outputPools)}</StyledText>
                                            <StyledText className={indexActive === i ? 'active' : ''}>${formatAmount(pairData.totalLiquidity)}</StyledText>
                                          </ResponsiveGrid>
                                        </LinkWrapper>
                                        <Break />
                                      </React.Fragment>
                                    )
                                  }
                                  return null
                                })}
                              </>
                            ) : null}
                          </TableWrapper>
                        ) : (
                          <PairEmpty>
                            <PairProgressLabel>Pair Data Fetching...</PairProgressLabel>
                            <ProgressBar 
                              height="4px" 
                              bgColor={theme.isDark ? '#4afefd' : '#265B80'} 
                              completed={progress} 
                              transitionDuration="1s"
                              animateOnRender
                              isLabelVisible={false}
                            />
                          </PairEmpty>
                        )}
                      </PairSelectBody>
                    </PairCardBox>
                  </TabPanel>
                )
              }) }
            </Tabs>
            <Tabs id="tab_2">
              <TabList>
                <Tab>Swap</Tab>
                <Tab>Liquidity</Tab>
              </TabList>
              <TabPanel>
                <AppBody>
                  <Wrapper id="swap-page">
                    <AutoColumn gap="md">
                      <AutoColumn gap="8px">
                        <OutSideLink href={PANCAKESWAP_ENDPOINT} target="_blank">
                          Try the Pancakeswap, click on here
                          <OutSideLinkIcon>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
                              <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                              <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                            </svg>
                          </OutSideLinkIcon>
                        </OutSideLink>
                      </AutoColumn>
                      <CurrencyInputPanel
                        label={independentField === Field.OUTPUT && !showWrap && trade ? t('From (estimated)') : t('From')}
                        value={formattedAmounts[Field.INPUT]}
                        showMaxButton={!atMaxAmountInput}
                        currency={inputToken}
                        currencyLogo={inputTokenLogo}
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
                        currencyLogo={outputTokenLogo}
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
                <Flex flexGrow={1} />
              </TabPanel>
              <TabPanel>
                <AppBody>
                  <Wrapper id="swap-page">
                    <AutoColumn gap="md">
                      Coming Soon
                    </AutoColumn>
                  </Wrapper>
                </AppBody>
              </TabPanel>
            </Tabs>
          </StyledPage>
          <TradingView />
        </StyledFlex>
      </NetworkContext.Provider>
    </StyledWrapper>
  )
}
