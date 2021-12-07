import styled from 'styled-components'
import { Flex, Modal} from '@pancakeswap/uikit'

export const ScrollableContainer = styled(Flex)`
  flex-direction: column;
  max-height: 400px;
  ${({ theme }) => theme.mediaQueries.sm} {
    max-height: none;
  }
`
export const ConnectButtonWrapper = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: 1fr 1fr;
  max-width: 20rem;
  margin: auto;
`
export const LoaderWrapper = styled.div`
  display: flex;
  position: absolute;
  background: #FFFFFF;
  width: 100%;
  margin-top: 1px;
  height: 100%;
  border-radius: 8px;
  justify-content: center;
  opacity: 0.8;
  align-items: center;
`
export const StyledModal = styled(Modal)`
  background: ${({ theme }) => theme.isDark ? '#152b39' : '#FFFFFF'};
  border: 1px solid ${({ theme }) => theme.isDark ? '#152b39' : '#EDF4F9'};
  border-radius: 8px;
  h2 {
    color: ${({ theme }) => theme.isDark ? '#ffffff' : '#000000'};
  }
`
export const StyledButton = styled.button`
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
export const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
export const IconWrapper = styled.div`
    width: 100%; 
`
export const IconName = styled.span`
    color: ${({ theme }) => theme.isDark ? '#1FC7D4' : '#1B435F'};
    font-weight: 600;
`
