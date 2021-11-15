import React, { useState } from 'react'
import styled from 'styled-components'
import { CryptoCurrencyMarket, TechnicalAnalysis } from "react-ts-tradingview-widgets";

import SwapList from 'config/constants/tokenLists/swap.json'

import HeroBg from '../../assets/images/hero-bg.jpg'
import LogoNoText from '../../assets/images/logo_no_text.png'

const SideContentWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.md} {
    margin-left: 1rem;
  };
  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 0;
  };
`
const StyledTradingViewWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  z-index: 1;
  border-radius: 8px;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 12px 0 0 0;
    width: calc(100%);
    position: relative;
  };
`
const LpkOtherLink = styled.div`
  display: flex;
  margin-left: 2rem;
  margin-right: 2rem;
  padding: 10px;
  width: 100%;
  background: ${({ theme }) => (theme.isDark) ? '#27618b' : '#1B435F'};
  border-radius: 8px;
  padding: 30px;
  margin-top: 20px;
  font-size: 32px;
  font-weight: 600;
  color: #4AFEFD;
  align-items: center; 
  justify-content: space-between;
  
  div {
    display: flex;
    align-items: center;
  }
  span {
    padding-left: 0.5rem;
  }
`

export default function TradingView() {
  
  // const [toDegree, setToDegree] = useState(0)
  // const [fromDegree, setFromDegree] = useState(0)
  // const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <>
      <SideContentWrapper>
        <StyledTradingViewWrapper className="trading-view">
          <CryptoCurrencyMarket colorTheme="dark" width="100%" height={400} />
          
          {/* <TechnicalAnalysis colorTheme="dark" /> */}
        </StyledTradingViewWrapper>

        <LpkOtherLink>
          <div>
            <img src={LogoNoText} alt="LogoNoText" />
            <span>LPK Stacking</span>
          </div>
          <div>
            <svg width="20" height="36" viewBox="0 0 20 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.69824 1.30176L18.095 17.6985L1.69824 34.0952" stroke="#4AFEFD" strokeOpacity="0.3" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </LpkOtherLink>
      </SideContentWrapper>
    </>
  )
}
