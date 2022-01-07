import { 
  Text, 
  Flex, 
  ModalContainer, 
  IconButton, 
  CopyIcon, 
  CheckmarkCircleFillIcon, 
  LinkExternal, 
  Message, 
  ModalHeader as UIKitModalHeader 
} from '@pancakeswap/uikit'
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
  padding-left: 0.1rem;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 0.25rem;
    padding-right: 0.25rem;
  }
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
export const StyledIcon = styled.a`
  padding: 0.15rem;
  background: #ffffff;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 3px;
  ${({ theme }) => theme.mediaQueries.xs} {
    width: 30px;
    height: 30px;
  }
`
export const StyledFlexDiv = styled.div`
  display: flex;
`
export const Title = styled.div`
  display: flex;
  align-items: center;
  pointer-events: auto;
  img {
    margin-right: 0.1rem;
    display: none;
    ${({ theme }) => theme.mediaQueries.xs} {
      height: 50px;
      display: block;
    }
    ${({ theme }) => theme.mediaQueries.sm} {
      height: 80px;
      display: block;
    }
  }
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

export const ModalHeader = styled(UIKitModalHeader)`
  background: ${({ theme }) => theme.isDark ? '#152b39' : '#EDF4F9'};
  border-bottom: 1px solid ${({ theme }) => theme.isDark ? '#1b435f' : '#EDF4F9'};
`

// export const BalanceWrapper = styled.div`
//   #000upToExtraSmall`
//     display: none;
//   `};
// `

export const ScrollableContainer = styled(Flex)`
  flex-direction: column;
  max-height: 400px;
  ${({ theme }) => theme.mediaQueries.sm} {
    max-height: none;
  }
`
export const StyledModal = styled(ModalContainer)`
  background: ${({ theme }) => theme.isDark ? '#152b39' : '#FFFFFF'};
  border: 1px solid ${({ theme }) => theme.isDark ? '#152b39' : '#EDF4F9'};
  border-radius: 8px;
  h2 {
    color: ${({ theme }) => theme.isDark ? '#50f7f7' : '#000000'};
  }
  margin-right: 16px;
  margin-left: 16px;
  width: unset;
  ${({ theme }) => theme.mediaQueries.sm} {
    min-width: 420px;
  }
`
export const LogOut = styled.button`
  position: relative;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.isDark ? '#1FC7D4' : '#1B435F'};
  border-radius: 8px;
  text-align: center;
  outline: none;
  justify-content: center;
  font-size: 16px;
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  align-items: center;
  cursor: pointer;
  user-select: none;
  padding: 0.594rem;
  opacity: 1;

  :hover {
    opacity: 0.6;
  }
`
export const StyledText = styled(Text)`
  color: ${({ theme }) => theme.isDark ? '#ffffff' : '#000000'};
`

export const Wrapper = styled(Flex)`
  align-items: center;
  background-color: ${({ theme }) => theme.isDark ? '#173346' : '#f5f5f5'};
  border-radius: 8px;
  position: relative;
`

export const Address = styled.div`
  flex: 1;
  position: relative;
  padding: 10px 8px;

  & > input {
    background: transparent;
    border: 0;
    color: ${({ theme }) => theme.isDark ? '#ffffff' : '#000000'};
    display: block;
    font-weight: 600;
    font-size: 14px;
    padding: 0;
    width: 100%;

    &:focus {
      outline: 0;
    }
  }
`

export const Tooltip = styled.div<{ isTooltipDisplayed: boolean }>`
  display: ${({ isTooltipDisplayed }) => (isTooltipDisplayed ? 'flex' : 'none')};
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 8px;
  background-color: ${({ theme }) => theme.isDark ? '#173346' : '#f5f5f5'};
  color: ${({ theme }) => theme.isDark ? '#50F7F7' : '#4c4c4c'};
  font-weight: 500;
  font-size: 14px;
  border-radius: 4px;
`
export const StyledIconButton = styled(IconButton)`
  color: ${({ theme }) => theme.isDark ? '#50F7F7' : '#265B80'};
  width: auto;
  height: 100%;
  font-weight: 600;
  font-size: 14px;
`
export const StyledCopyIcon = styled(CopyIcon)`
  margin-left: 5px;
  width: 18px;
  fill: ${({ theme }) => theme.isDark ? '#50F7F7' : '#265B80'};
`
export const StyledCheckmarkCircleFillIcon = styled(CheckmarkCircleFillIcon)`
  margin-right: 5px;
  width: 20px;
  fill: ${({ theme }) => theme.isDark ? '#50F7F7' : 'rgba(52, 211, 153, 1)'};
`

export const StyledLinkExternal = styled(LinkExternal)`
  color: ${({ theme }) => theme.isDark ? '#50F7F7' : '#265B80'};
  width: auto;
  height: 100%;
  font-weight: 600;
  font-size: 14px;
  
  svg {
    width: 18px;
    fill: ${({ theme }) => theme.isDark ? '#50F7F7' : '#265B80'};
  }

  :hover {
    opacity: 0.65;
    text-decoration: none;
  }
`

export const StyledMessage = styled(Message)`
  padding: 10px;
  border-radius: 8px;
`

export const StyledLogOutButton = styled.button`
  background-color: ${({ theme }) => (theme.isDark) ? '#1B435F' : '#1B435F' } ;
  border: 1px solid #1B435F;
  text-align: center;
  outline: none;
  -webkit-box-pack: center;
  justify-content: center;
  font-size: 16px;
  border-radius: 8px;
  min-width: min-content;
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  -webkit-box-align: center;
  align-items: center;
  cursor: pointer;
  user-select: none;
  color: rgb(74, 254, 253);
  font-weight: 500;
  padding: 0.8rem;

  :hover,
  :focus {
    background-color: #27618b;

    :focus {
      border: 1px solid #27618b;
    }
  }
`   
export const StyledTransactionWrapper = styled(Flex)`
  padding: 10px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.isDark ? '#173346' : '#f5f5f5'};
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
` 
