import React from 'react'
import styled from 'styled-components'
import LogoNoText from '../../assets/images/logo_no_text.png'
import {TVChartContainer} from './components/TVChartContainer/index';

const SideContentWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 0;
  };
  ${({ theme }) => theme.mediaQueries.md} {
    margin-left: 1rem;
  };
  width: 100%;

`
const StyledTradingViewWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  z-index: 1;
  border-radius: 8px;
  width: 100%;
  height: 700px;
  border: 1px solid ${({ theme }) => (theme.isDark) ? '#265B80' : '#265B80'};
  background: ${({ theme }) => (theme.isDark) ? '#265B80' : '#265B80'};
  border-radius: 8px;

  ${({ theme }) => theme.mediaQueries.sm} {
    // padding: 12px 0 0 0;
    width: calc(100%);
    position: relative;
  };
`
const StyledTradingViewTitle = styled.span`
  display: flex;
  align-items: center;
  justify-content: start;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => (theme.isDark) ? '#50f7f7' : '#50f7f7'};
  color: ${({ theme }) => (theme.isDark) ? '#50F7F7' : '#50F7F7'};
  padding: 16px;
  font-size: 20px;
  font-weight: 500;
`
const StyledTradingViewContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 16px;
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
  
  // const { theme } = useTheme()
  // const { networkId } = useNetworkContext()
  
  // const transferHanlderSymbol = () => {
	// 	let url = document.URL;
	// 	console.log('component.url..', url);
	// 	let urlArr = url.split('/');
	// 	let symbol = urlArr[urlArr.length - 1];
	// 	return (
	// 		<TVChartContainer symbol={symbol} />
	// 	)
	// }

  return (
    <>
      <SideContentWrapper>
        <StyledTradingViewWrapper className="trading-view">
          <StyledTradingViewTitle>
            MARKET INFORMATION 
          </StyledTradingViewTitle>

          <StyledTradingViewContent>
            {/* <TradingViewWidget
              symbol="NASDAQ:AAPL"
              theme={Themes.DARK}
              locale="en"
              width={400}
            /> */}

          <TVChartContainer 
            	symbol='0x9b71b5511998e0798625b8fa74e86d8192de78c1'
              containerId='tv_chart_container'
              libraryPath='/charting_library/'
          />
          </StyledTradingViewContent>

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
