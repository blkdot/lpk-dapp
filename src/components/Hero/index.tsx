import React from 'react'
import { useNetworkContext } from 'contexts/NetworkContext'
import SwapList from 'config/constants/tokenLists/swap.json'
import { useTranslation } from 'contexts/Localization'
import Loader from "react-loader-spinner";
import useTheme from 'hooks/useTheme'
import {
  SideContentWrapper,
  StyledHeroWrapper,
  SelectPoolWrapper,
  LpkAdsLink,
  LpkAdsButton,
  PoolBuuton,
  LogoImage,
  CircleContainer,
  StyledTradingInformationWrapper,
  TradingInfoTitle,
  TradingInfoColumn,
  TradingInfoRow,
} from './styleds'
import {
  useDerivedSwapInfo,
} from '../../state/swap/hooks'
import KriptonCrystal from '../../assets/images/KriptonCrystal.png'

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
  const { currencies } = useDerivedSwapInfo()

  const { networkId, setNetworkId } = useNetworkContext()
  
  const handleSwitchNetwork = (index: number) => {
    setNetworkId(index)
    console.log("index", index)
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
                <span>Daily volume:</span> 
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
                <span>Market Cap:</span> 
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
                <span>Circulation Supply:</span> 
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
                <span>Total Supply:</span> 
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
          </StyledTradingInformationWrapper>

          <SelectPoolWrapper>
            <LogoImage src={KriptonCrystal} />
            <CircleContainer
            >
              {SwapList.map((swap) => {     
                return (
                  <li key={swap.symbol}>
                    <PoolBuuton
                      className={(networkId === swap.id) ? 'swap-active' : ''}
                      onClick={() => {
                        handleSwitchNetwork(swap.id)
                      }}>
                      <img src={swap.icon} alt="11"/>
                    </PoolBuuton>
                  </li>
                ) 
              })}
            </CircleContainer>
          </SelectPoolWrapper>
        </StyledHeroWrapper>

        {/* <LpkOtherLink>
          <div>
            <img src={LogoNoText} alt="LogoNoText" />
            <span>LPK Stacking</span>
          </div>
          <div>
            <svg width="20" height="36" viewBox="0 0 20 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.69824 1.30176L18.095 17.6985L1.69824 34.0952" stroke="#4AFEFD" strokeOpacity="0.3" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </LpkOtherLink> */}

        <LpkAdsLink>
          <LpkAdsButton src="./assets/images/banner.png" alt="LogoNoText" />
        </LpkAdsLink>
      </SideContentWrapper>
    </>
  )
}
