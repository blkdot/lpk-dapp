import React from 'react'
import styled from 'styled-components'
import { Flex, Button, Text } from '@pancakeswap/uikit'
// import QuestionHelper from 'components/QuestionHelper'
import { useTranslation } from 'contexts/Localization'
import { GAS_PRICE_GWEI, GAS_PRICE } from 'state/user/hooks/helpers'
import { useGasPriceManager } from 'state/user/hooks'

const StyledText = styled(Text)`
  font-weight: 500;
  font-size: 14px;
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
          variant={gasPrice === GAS_PRICE_GWEI.default ? 'primary' : 'tertiary'}
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
          variant={gasPrice === GAS_PRICE_GWEI.fast ? 'primary' : 'tertiary'}
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
          variant={gasPrice === GAS_PRICE_GWEI.instant ? 'primary' : 'tertiary'}
        >
          {t('Instant (%gasPrice%)', { gasPrice: GAS_PRICE.instant })}
        </StyledButton>
      </Flex>
    </Flex>
  )
}

export default GasSettings
