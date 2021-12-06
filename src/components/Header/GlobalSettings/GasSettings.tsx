import React from 'react'
import styled from 'styled-components'
import { Flex, Button, Text } from '@pancakeswap/uikit'
// import QuestionHelper from 'components/QuestionHelper'
import { useTranslation } from 'contexts/Localization'
import { GAS_PRICE_GWEI, GAS_PRICE } from 'state/user/hooks/helpers'
import { useGasPriceManager } from 'state/user/hooks'
import useTheme from 'hooks/useTheme'

const StyledText = styled(Text)`
  font-weight: 500;
  font-size: 14px;
  color: ${({ theme }) => theme.isDark ? '#FFFFFF' : '#000000'};
`
const StyledButton = styled(Button)`
  font-weight: 500;
  border-radius: 8px;
  box-shadow: none;
  :hover {
    opacity: 1 !important;
  }
`

const GasSettings = () => {
  const { t } = useTranslation()
  const { isDark } = useTheme()

  const [gasPrice, setGasPrice] = useGasPriceManager()

  return (
    <Flex flexDirection="column">
      <Flex mb="10px" alignItems="center">
        <StyledText>{t('Default Transaction Speed (GWEI)')}</StyledText>
        {/* <QuestionHelper
          text={t(
            'Adjusts the gas price (transaction fee) for your transaction. Higher GWEI = higher speed = higher fees',
          )}
          placement="top-start"
          ml="4px"
        /> */}
      </Flex>
      <Flex flexWrap="wrap">
        <StyledButton
          mt="4px"
          mr="4px"
          scale="sm"
          onClick={() => {
            setGasPrice(GAS_PRICE_GWEI.default)
          }}
          style={{
            background: gasPrice === GAS_PRICE_GWEI.default ? '#27618b' : (isDark ? '#173346' : '#f5f5f5'),
            color: gasPrice === GAS_PRICE_GWEI.default ? '#50F7F7' : (isDark ? '#50F7F7' : '#27618b')
          }}
        >
          {t('Standard (%gasPrice%)', { gasPrice: GAS_PRICE.default })}
        </StyledButton>
        <StyledButton
          mt="4px"
          mr="4px"
          scale="sm"
          onClick={() => {
            setGasPrice(GAS_PRICE_GWEI.fast)
          }}
          style={{
            background: gasPrice === GAS_PRICE_GWEI.fast ? '#27618b' : (isDark ? '#173346' : '#f5f5f5'),
            color: gasPrice === GAS_PRICE_GWEI.fast ? '#50F7F7' : (isDark ? '#50F7F7' : '#27618b')
          }}
        >
          {t('Fast (%gasPrice%)', { gasPrice: GAS_PRICE.fast })}
        </StyledButton>
        <StyledButton
          mr="4px"
          mt="4px"
          scale="sm"
          onClick={() => {
            setGasPrice(GAS_PRICE_GWEI.instant)
          }}
          style={{
            background: gasPrice === GAS_PRICE_GWEI.instant ? '#27618b' : (isDark ? '#173346' : '#f5f5f5'),
            color: gasPrice === GAS_PRICE_GWEI.instant ? '#50F7F7' : (isDark ? '#50F7F7' : '#27618b')
          }}
        >
          {t('Instant (%gasPrice%)', { gasPrice: GAS_PRICE.instant })}
        </StyledButton>
      </Flex>
    </Flex>
  )
}

export default GasSettings
