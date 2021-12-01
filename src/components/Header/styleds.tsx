import React from 'react'
import { Flex } from '@pancakeswap/uikit'
import styled from 'styled-components'

export const RowBetween =styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1440px;
  width: 100%;
  padding: 1rem;
`
export const HeaderFrame = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  z-index: 2;
  background: #0C1F2C;
`
export const SubHeaderFrame = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  z-index: 2;
  background: ${({ theme }) => (theme.isDark) ? '#12344c' : '#FFFFFF' };
`
export const HeaderElement = styled.div`
  display: flex;
  align-items: center;

`
export const HeaderElementBlock = styled.div`
  display: flex;
  align-items: center;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
`
export const SubHeaderElement = styled.div`
  display: flex;
  align-items: center; 
  padding-right: 1rem;
`
export const SubHeaderLastElement = styled.div`
  display: flex;
  align-items: center; 
  padding-right: 0;
`
export const StyledLinkButton = styled.button`
  display: flex;
  align-items: center; 
  background: ${({ theme }) => (theme.isDark) ? 'rgb(39, 97, 139)' : '#12344c' };
  height: 40px;
  left: 20px;
  border-radius: 20px;
  padding: 0.25rem;
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
export const StyledTextSpan = styled.span`
  display: flex;
  align-items: center; 
  padding-left: 0.5rem;
  padding-right: 0.7rem;
`
export const StyledTextTitleSpan = styled.span`
  display: flex;
  align-items: center; 
  padding-left: 0.5rem;
  color: #50F7F7;
  font-weight: 600;
`
export const StyledIcon = styled.div`
  padding: 0.15rem;
  background: #ffffff;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 3px;
`
export const StyledFlexDiv = styled.div`
  display: flex;
`
export const Title = styled.div`
  display: flex;
  align-items: center;
  pointer-events: auto;

  :hover {
    cursor: pointer;
  }
`
export const StyledFlex = styled(Flex)`
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
export const StyledAnySwapLogoButton = styled.img`
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
export const StyledCoinGeckoLogoButton = styled.img`
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
export const ThemeSwitchButton = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  background-color: ${({ theme }) => (theme.isDark) ? '#1B435F' : '#1B435F' };

  padding: 0.15rem 0.525rem;
  border-radius: 0.5rem;

  :hover {
    cursor: pointer;
    outline: none;
    opacity: 1 !important;
    background-color: #27618b !important;
  }

  svg {
    margin-top: 2px;
    fill: rgb(74,254,253);
  }
`

// export const BalanceWrapper = styled.div`
//   #000upToExtraSmall`
//     display: none;
//   `};
// `