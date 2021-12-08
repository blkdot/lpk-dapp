import React from 'react'
import styled from 'styled-components'
import { Text, Flex, Modal } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import useTheme from 'hooks/useTheme'

const ScrollableContainer = styled(Flex)`
  flex-direction: column;
  max-height: 400px;
  ${({ theme }) => theme.mediaQueries.sm} {
    max-height: none;
  }
`
const StyledModal = styled(Modal)`
  // background: ${({ theme }) => theme.isDark ? '#152b39' : '#FFFFFF'};
  // border: 1px solid ${({ theme }) => theme.isDark ? '#152b39' : '#EDF4F9'};

  color: ${({ theme }) => theme.isDark ? '#ffffff' : '#000000'};
  border-radius: 8px;
  h2 {
    color: ${({ theme }) => theme.isDark ? '#50f7f7' : '#000000'};
  }
  font-size: 16px;
  font-weight: 600;
`
const StyledText = styled(Text)`
  color: ${({ theme }) => theme.isDark ? '#ffffff' : '#000000'};
  font-size: 16px;
  font-weight: 500;
`

interface InjectedModalProps {
  // inputTokenPools: number
  // outputTokenPools: number
  // totalLiquidity: number
  marcketCap: number
  dailyVolumn: number
  circulationSupply: number
  totalSupply: number
  onDismiss?: () => void
}


const TradingInfoModal: React.FC<InjectedModalProps> = ({ 
  // inputTokenPools,
  // outputTokenPools,
  // totalLiquidity,
  marcketCap,
  dailyVolumn,
  circulationSupply,
  totalSupply,
  onDismiss 
}) => {
  const { t } = useTranslation()
  const { theme, isDark, toggleTheme } = useTheme()

  return (
    <StyledModal
      title={t('Trading Information')}
      onDismiss={onDismiss}
      style={{ minWidth: '420px' }}
    >
      <ScrollableContainer>
        <Flex pb="10px" flexDirection="column">
          <Flex flexDirection="row" justifyContent="space-between">
            <Flex flexDirection="row">
              <StyledText>Total Supply:</StyledText>
            </Flex>
            <Flex flexDirection="row">
              <StyledText>${totalSupply.toFixed(4)}</StyledText>
            </Flex>
          </Flex>
        </Flex>
        <Flex pb="10px" flexDirection="column">
          <Flex flexDirection="row" justifyContent="space-between">
            <Flex flexDirection="row">
              <StyledText>Circulation Supply:</StyledText>
            </Flex>
            <Flex flexDirection="row">
              <StyledText>${circulationSupply.toFixed(4)}</StyledText>
            </Flex>
          </Flex>
        </Flex>
        
        <Flex pb="10px" flexDirection="column">
          <Flex flexDirection="row" justifyContent="space-between">
            <Flex flexDirection="row">
              <StyledText>Daily volume:</StyledText>
            </Flex>
            <Flex flexDirection="row">
              <StyledText>${dailyVolumn.toFixed(4)}</StyledText>
            </Flex>
          </Flex>
        </Flex>
        <Flex pb="10px" flexDirection="column">
          <Flex flexDirection="row" justifyContent="space-between">
            <Flex flexDirection="row">
              <StyledText>Market Cap:</StyledText>
            </Flex>
            <Flex flexDirection="row">
              <StyledText>${marcketCap.toFixed(4)}</StyledText>
            </Flex>
          </Flex>
        </Flex>
      </ScrollableContainer>
    </StyledModal>
  )
}

export default TradingInfoModal
