import React, {useState} from 'react'
import { useNetworkContext } from 'contexts/NetworkContext'
import SwapList from 'config/constants/tokenLists/swap.json'
import { useTranslation } from 'contexts/Localization'
import Loader from "react-loader-spinner";

import useTheme from 'hooks/useTheme'
import {
  useNetworkActionHandlers,
} from 'state/network/hooks'
// import CopyAddress from './CopyAddress'
import {
  SideContentWrapper,
  StyledHeroWrapper,
  SelectPoolWrapper,
  LpkAdsLink,
  LpkAdsButton,
  PoolButton,
  LogoImage,
  CircleContainer,
  StyledTradingInformationWrapper,
  TradingInfoTitle,
  TradingInfoColumn,
  TradingInfoRow,
  ExchangeNotification,
  // CopyAddressColumn,
  // CopyAddressTitle
} from './styleds'
import PancakeLogo from '../../assets/images/Pancake.png'

export default function Hero({
  marcketCap,
  dailyVolumn,
  circulationSupply,
  totalSupply,
}: {
  marcketCap: number
  dailyVolumn: number
  circulationSupply: number
  totalSupply: number
}) {

  const { t } = useTranslation()
  const { theme } = useTheme()

  const { networkId, setNetworkId } = useNetworkContext()
  const { onChangeNetwork } = useNetworkActionHandlers()
  const [logopath, setLogoPath] = useState('./assets/images/swap/pancake.png')
  
  const handleSwitchNetwork = (path: string) => {
    console.log(path);
    setLogoPath(path);
    // setNetworkId(swap.id)
    // onChangeNetwork(swap.id)
  }
  return (
    <>
      <SideContentWrapper>
        <StyledHeroWrapper className="hero">
          <StyledTradingInformationWrapper>
            <TradingInfoColumn>
              <TradingInfoTitle>
                <span>{t('Pair Information')}</span> 
              </TradingInfoTitle>
              <TradingInfoRow>
                <span>{t('Daily volume:')}</span> 
                {(dailyVolumn !== undefined) ? (
                  <span>${dailyVolumn}</span> ) 
                  : ( 
                  <span>
                    <Loader
                      type="ThreeDots"
                      color={theme.isDark ? '#4afefd' : '#4afefd'}
                      height={20}
                      width={20}
                    />
                  </span>
                )}
              </TradingInfoRow>
              <TradingInfoRow>
                <span>{t('Market Cap:')}</span> 
                {(marcketCap !== undefined) ? (
                  <span>${marcketCap}</span> ) 
                  : ( 
                  <span>
                    <Loader
                      type="ThreeDots"
                      color={theme.isDark ? '#4afefd' : '#4afefd'}
                      height={20}
                      width={20}
                    />
                  </span>
                )}
              </TradingInfoRow>
              <TradingInfoRow>
                <span>{t('Circulation Supply:')}</span> 
                {(circulationSupply !== undefined) ? (
                  <span>${circulationSupply}</span> ) 
                  : ( 
                  <span>
                    <Loader
                      type="ThreeDots"
                      color={theme.isDark ? '#4afefd' : '#4afefd'}
                      height={20}
                      width={20}
                    />
                  </span>
                )}
              </TradingInfoRow>
              <TradingInfoRow>
                <span>{t('Total Supply:')}</span> 
                {(totalSupply !== undefined) ? (
                  <span>${totalSupply}</span> ) 
                  : ( 
                  <span>
                    <Loader
                      type="ThreeDots"
                      color={theme.isDark ? '#4afefd' : '#4afefd'}
                      height={20}
                      width={20}
                    />
                  </span>
                )}
              </TradingInfoRow>
            </TradingInfoColumn>
            {/* <CopyAddressTitle>
              <span>{t('LPK Token Address')}</span> 
            </CopyAddressTitle>
            <CopyAddressColumn>
              <CopyAddress account="0x9b71b5511998e0798625b8fa74e86d8192de78c1" />
            </CopyAddressColumn> */}

          </StyledTradingInformationWrapper>
          <ExchangeNotification>
              {t('Choose your preferred exchange')}
          </ExchangeNotification>
          <SelectPoolWrapper>
            <LogoImage src={logopath} />
           
            <CircleContainer
            >
              {SwapList.map((swap) => {     
                return (
                  <li key={swap.symbol}>
                    <PoolButton
                      className={(networkId === swap.id) ? 'swap-active' : ''}
                      // disabled={(swap.id !== 4 && swap.id !== 0)}
                      onClick={() => {
                        handleSwitchNetwork(swap.icon)
                      }}>
                      <img src={swap.icon} alt="11"/>
                    </PoolButton>
                  </li>
                ) 
              })}
            </CircleContainer>
          </SelectPoolWrapper>
        </StyledHeroWrapper>
        <LpkAdsLink href="https://www.l-pesa.com/" target="_blank">
          <LpkAdsButton src="./assets/images/banner.png" alt="LogoNoText" />
        </LpkAdsLink>
      </SideContentWrapper>
    </>
  )
}
