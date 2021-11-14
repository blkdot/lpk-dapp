import React from 'react'
import styled from 'styled-components'

import { useLocation } from 'react-router'
import { Flex, ThemeSwitcher } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import useTheme from 'hooks/useTheme'
import config from './config/config'
import UserMenu from './UserMenu'
import GlobalSettings from './GlobalSettings'
import { getActiveMenuItem, getActiveSubMenuItem } from './utils'


import Logo from '../../assets/images/lpk_logo.png'
import LogoNoText from '../../assets/images/logo_no_text.png'
import LogoLPesaApp from '../../assets/images/lpesa_app.png'
import IconEtherscan from '../../assets/svg/etherscan.png'
import IconTelegram from '../../assets/svg/telegram.png'
import IconTwitter from '../../assets/svg/twitter.png'
import IconLpesa from '../../assets/svg/lpesa.png'
import AnySwapLogo from '../../assets/images/anyswap_round.png'
import CoinGeckoLogo from '../../assets/images/coingecko_round.png'


const RowBetween =styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1440px;
  width: 100%;
  padding: 1rem;
`
const HeaderFrame = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  z-index: 2;
  background: #0C1F2C;
`
const SubHeaderFrame = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  z-index: 2;
  background: ${({ theme }) => (theme.isDark) ? '#12344c' : '#FFFFFF' };
`
const HeaderElement = styled.div`
  display: flex;
  align-items: center;

`

const HeaderElementBlock = styled.div`
  display: flex;
  align-items: center;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
`

const SubHeaderElement = styled.div`
  display: flex;
  align-items: center; 
  padding-right: 1rem;
`

const SubHeaderLastElement = styled.div`
  display: flex;
  align-items: center; 
  padding-right: 0;
`

const StyledLinkButton = styled.button`
  display: flex;
  align-items: center; 
  background: ${({ theme }) => (theme.isDark) ? 'rgb(39, 97, 139)' : '#12344c' };
  height: 40px;
  left: 20px;
  border-radius: 20px;
  padding: 1rem;
  padding-right: 0.25rem;
  color: #fff;
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  border: transparent;
  cursor: pointer;
`
const StyledTextSpan = styled.span`
  display: flex;
  align-items: center; 
  padding-left: 0.5rem;
  padding-right: 0.7rem;
`

const StyledTextTitleSpan = styled.span`
  display: flex;
  align-items: center; 
  padding-left: 0.5rem;
  color: #50F7F7;
  font-weight: 600;
`

const StyledIcon = styled.img`
  padding: 0.1rem;
`

const StyledFlexDiv = styled.div`
  display: flex;
`

const Title = styled.div`
  display: flex;
  align-items: center;
  pointer-events: auto;

  :hover {
    cursor: pointer;
  }
`
const StyledFlex = styled(Flex)`
  height: 40px !important;
  border-radius: 8px;
  
  div:first-child {
    height: 40px !important;
    border-radius: 8px;
    background-color: ${({ theme }) => (theme.isDark) ? '#12344c' : '#12344c' };

    input:hover {
      box-shadow: none !important;
    }

    div {
      :not(:disabled):not(:checked) {
        box-shadow: none !important;
        // border: 2px solid #27618b;
      }
      border-radius: 8px;

      height: 40px !important;
      top: 0;
      background-color: ${({ theme }) => (theme.isDark) ? 'rgb(39, 97, 139)' : '#1B435F' };

      svg {
        fill: rgb(74,254,253);
      }
    }
  }
`

// const AccountElement = styled.div<{ active: boolean }>`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   background-color: ${({ theme, active }) => (!active ? darken(0.08, theme.primary5) : darken(0.08, theme.primary5))};
//   color: ${({ theme, active }) => (!active ? theme.primaryText1 : theme.primaryText1)};
//   border-radius: 12px;
//   white-space: nowrap;

//   :focus {
//     border: 1px solid blue;
//   }
// `

// const NetworkCard = styled(YellowCard)`
//   width: fit-content;
//   margin-right: 10px;
//   border-radius: 12px;
//   padding: 10px 12px;
// `


const StyledAnySwapLogoButton = styled.img`
  position: relative;
  width: 100%;
  border: none;
  margin: 0;
  padding: 0;
  height: 40px;

  border-radius: 0.5rem;

  :hover,
  :focus {
    cursor: pointer;
    outline: none;
  }
`
const StyledCoinGeckoLogoButton = styled.img`
  position: relative;
  width: 100%;
  border: none;
  margin: 0;
  margin-left: 10px;
  padding: 0;
  height: 40px;

  border-radius: 0.5rem;

  :hover,
  :focus {
    cursor: pointer;
    outline: none;
  }
`
// const BalanceWrapper = styled.div`
//   #000upToExtraSmall`
//     display: none;
//   `};
// `



const Header = () => {
  const { isDark, toggleTheme } = useTheme()
  const { t } = useTranslation()
  const { pathname } = useLocation()

  return (
    <>
    <HeaderFrame>
      <RowBetween>
        <HeaderElement>
          <Title>
              <img style={{ height: '80px' }} src={isDark ? Logo : Logo} alt="logo" />
          </Title>
        </HeaderElement>
        <HeaderElement>
          <HeaderElementBlock>
            <UserMenu />
            <GlobalSettings />
            <StyledFlex justifyContent="space-between">
              <ThemeSwitcher isDark={isDark} toggleTheme={toggleTheme} />
            </StyledFlex>
          </HeaderElementBlock>
          <HeaderElementBlock>
            <StyledAnySwapLogoButton src={AnySwapLogo} alt="" width="30" height="30" />
            <StyledCoinGeckoLogoButton src={CoinGeckoLogo} alt="" width="30" height="30" />
          </HeaderElementBlock>
        </HeaderElement>
      </RowBetween>
    </HeaderFrame>
    <SubHeaderFrame>
      <RowBetween>
        <StyledFlexDiv>
          <SubHeaderElement>
            <StyledLinkButton>
              <img src={LogoNoText} alt="" width="28" height="24"/>
              <StyledTextSpan>Kripton news/Twitter</StyledTextSpan>
            </StyledLinkButton>
          </SubHeaderElement>
          <SubHeaderElement>
            <StyledLinkButton>
              <img src={LogoNoText} alt="" width="28" height="24"/>
              <StyledTextSpan>Kripton CMC</StyledTextSpan>
            </StyledLinkButton>
          </SubHeaderElement>
          <SubHeaderElement>
            <StyledLinkButton>
              <img src={LogoLPesaApp} alt="" width="28" height="24"/>
              <StyledTextSpan>Download L-Pesa App</StyledTextSpan>
            </StyledLinkButton>
          </SubHeaderElement>
        </StyledFlexDiv>
        <SubHeaderLastElement>
          <StyledLinkButton>
            <StyledTextTitleSpan>Token contract on Etherscan:</StyledTextTitleSpan>
            <StyledTextSpan>0x2cc71c048a804da930e28e93f3211dc03c702995 </StyledTextSpan>
            <StyledIcon src={IconEtherscan}/>
            <StyledIcon src={IconTelegram}/>
            <StyledIcon src={IconTwitter}/>
            <StyledIcon src={IconLpesa}/>
          </StyledLinkButton>
        </SubHeaderLastElement>
      </RowBetween>
    </SubHeaderFrame>
    {/* <UikitMenu
      userMenu={<UserMenu />}
      globalMenu={<GlobalSettings />}
      isDark={isDark}
      toggleTheme={toggleTheme}
      currentLang={currentLanguage.code}
      langs={languageList}
      setLang={setLanguage}
      links={config(t)}
      footerLinks={footerLinks(t)}
      // cakePriceUsd={cakePriceUsd}
      // subLinks={activeMenuItem?.hideSubNav ? [] : activeMenuItem?.items}
      // activeItem={activeMenuItem?.href}
      // activeSubItem={activeSubMenuItem?.href}
      // buyCakeLabel={t('Buy CAKE')}
      {...props}
    /> */}
    </>
  )
}

export default Header
