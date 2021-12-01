import React from 'react'
import { Text, ErrorIcon, Flex, Button } from '@pancakeswap/uikit'
import styled, { css } from 'styled-components'
import { AutoColumn } from 'components/Layout/Column'

export const Wrapper = styled.div`
  position: relative;
  padding: 1rem;
`

export const ArrowWrapper = styled.div<{ clickable: boolean }>`
  padding: 2px;

  ${({ clickable }) =>
    clickable
      ? css`
          :hover {
            cursor: pointer;
            opacity: 0.8;
          }
        `
      : null}
`

export const ErrorText = styled(Text)<{ severity?: 0 | 1 | 2 | 3 | 4 }>`
  color: ${({ theme, severity }) =>
    severity === 3 || severity === 4
      ? "#eb1a6b"
      : severity === 2
      ? theme.colors.warning
      : severity === 1
      ? theme.colors.text
      : theme.colors.success};
`

export const StyledBalanceMaxMini = styled.button`
  height: 22px;
  width: 22px;
  background-color: ${({ theme }) => (theme.isDark) ? '#12344c' : '#EDF4F9'};
  border: none;
  border-radius: 50%;
  padding: 0.2rem;
  font-size: 0.875rem;
  font-weight: 400;
  margin-left: 0.4rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  justify-content: center;
  align-items: center;
  float: right;

  :hover {
    background-color: ${({ theme }) => (theme.isDark) ? '#1a4664' : theme.colors.dropdown};
  }
  :focus {
    background-color: ${({ theme }) => (theme.isDark) ? '#1a4664' : theme.colors.dropdown};
  }
    outline: none;
  }
  svg {
    fill: ${({ theme }) => (theme.isDark) ? '#27618b' : '#000000'};
  }
`

export const TruncatedText = styled(Text).attrs({ ellipsis: true })`
  width: 220px;
`

const SwapCallbackErrorInner = styled.div`
  background-color: ${({ theme }) => `${theme.colors.failure}33`};
  border-radius: 1rem;
  display: flex;
  align-items: center;
  font-size: 0.825rem;
  width: 100%;
  padding: 3rem 1.25rem 1rem 1rem;
  margin-top: -2rem;
  color: ${({ theme }) => theme.colors.failure};
  z-index: -1;
  p {
    padding: 0;
    margin: 0;
    font-weight: 500;
  }
`

const SwapCallbackErrorInnerAlertTriangle = styled.div`
  background-color: ${({ theme }) => `${theme.colors.failure}33`};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  border-radius: 12px;
  min-width: 48px;
  height: 48px;
`

export function SwapCallbackError({ error }: { error: string }) {
  return (
    <SwapCallbackErrorInner>
      <SwapCallbackErrorInnerAlertTriangle>
        <ErrorIcon width="24px" />
      </SwapCallbackErrorInnerAlertTriangle>
      <p>{error}</p>
    </SwapCallbackErrorInner>
  )
}

export const SwapShowAcceptChanges = styled(AutoColumn)`
  background-color: ${({ theme }) => `${theme.colors.warning}33`};
  padding: 0.5rem;
  border-radius: 12px;
  margin-top: 8px;
`

export const ClickableColumnHeader = styled.div`
  cursor: pointer;
`

export const TableWrapper = styled(Flex)`
  width: 100%;
  padding-top: 16px;
  flex-direction: column;
  gap: 16px;
  background-color: ${({ theme }) => (theme.isDark) ? '#12344c' : '#ffffff' };
  border-radius: 8px;
  border: none;
`

export const PageButtons = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.2em;
  margin-bottom: 1.2em;
`

export const Arrow = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  padding: 0 20px;
  :hover {
    cursor: pointer;
  }
`

export const Break = styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.isDark ? "#27618b" : "#e2e2e2"};
  width: 100%;
`

export const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-bottom: 0;
  min-height: calc(100vh - 64px);
  background: ${({ theme }) => (theme.isDark) ? '#12344c' : '#ffffff' }; 

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
export const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  background: ${({ theme }) => (theme.isDark) ? '#12344c' : '#ffffff' }; 

`
export const StyledFlex = styled(Flex)`
  display: flex;
  align-items: start;
  width: 100%;
  padding: 16px;
  padding-bottom: 2rem;
  justify-content: space-between;
  max-width: 1440px;
  background: ${({ theme }) => (theme.isDark) ? '#12344c' : '#ffffff' }; 
  ${({ theme }) => theme.mediaQueries.xs} {
    flex-direction: column;
    align-items: start;
    padding: 16px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: column;
    align-items: start;
    padding: 0 160px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
    padding: 16px;
  }
`
export const Label = styled(Text)`
  font-size: 14px;
  font-weight: 500;
  font-family: 'Montserrat',sans-serif;
  color: ${({ theme }) => (theme.isDark) ? '#2DC60E': '#000000'};
`
export const BodyWrapper = styled.div`
  position: relative;
  max-width: 520px;
  width: 100%;
  margin-bottom: 0.75rem;
`
export const PairCardBox = styled.div`
  position: relative;
  max-width: 520px;
  width: 100%;
  background: ${({ theme }) => (theme.isDark) ? '#152b39' : '#FFFFFF'};
  border: 1px solid ${({ theme }) => (theme.isDark) ? '#152b39' : '#EDF4F9'};
  color: ${({ theme }) => (theme.isDark) ? '#ffffff' : '#000000'};
  padding: 10px;
  border-radius: 0 0 8px 8px;
  border-top: none;

  span {
    font-size: 20px;
    font-weight: 500; 
  }
`
export const PairSelectBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 218px;
  overflow-y: auto;
  overflow-x: hidden;
  background: #ffffff;
  background: ${({ theme }) => (theme.isDark) ? '#152b39' : '#ffffff'};
  border-radius: 0 0 8px 8px;
  justify-content: start;
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
export const PairEmpty = styled.div`
  position: relative;
  width: 100%;
  background: ${({ theme }) => (theme.isDark) ? '#12344c' : '#FFFFFF'};
  border: 1px solid ${({ theme }) => (theme.isDark) ? '#12344c' : '#FFFFFF'};
  color: ${({ theme }) => (theme.isDark) ? '#ffffff' : '#000000'};
  border-radius: 8px;
  padding: 0.75rem;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;    
  height: 100%;
`
export const PairProgressLabel = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => (theme.isDark) ? '#4afefd' : '#12344c'};
  padding-bottom: 10px;
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
  max-width: 520px;
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
export const ResponsiveGrid = styled.div`
  display: grid;
  align-items: center;
  font-size: 13px;
  font-weight: 600;
  padding: 0 24px;

  ${({ theme }) => theme.mediaQueries.xs} {
    grid-gap: 1rem;
    grid-template-columns: 130px repeat(auto-fill,100px) 230px;
    padding: 0 10px;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    grid-gap: 3rem;
    grid-template-columns: 150px repeat(auto-fill,150px) 300px;
    padding: 0 10px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    grid-gap: 3rem;
    grid-template-columns: 150px repeat(auto-fill, 150px) 300px;
  }
`
export const StyledText = styled(Text)`
  color: ${({ theme }) => (theme.isDark) ? '#FFFFFF': '#000000' };
  font-weight: 600;

  ${({ theme }) => theme.mediaQueries.xs} {
    font-size: 12px;
    line-height: 1;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 12px;
    line-height: 1;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 14px;
  }
`
export const LinkWrapper = styled.div`
  text-decoration: none;
  :hover {
    cursor: pointer;
    opacity: 0.7;
  }
`
export const DoubleLogoWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const DoubleLogoFlex = styled(Flex)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`
export const DoubleLogo = styled.div`
  background: #edf4f9;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid #ffffff;
  margin-left: -5px;
  transition: 0.7s all ease-in-out;
  transform: scale(1);
  padding: 3px;
`
export const DoubleLogoImg = styled.img`
`


