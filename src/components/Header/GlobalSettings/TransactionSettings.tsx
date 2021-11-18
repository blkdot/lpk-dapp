import React, { useState } from 'react'
import styled from 'styled-components'
import { escapeRegExp } from 'utils'
import { Text, Button, Input, Flex, Box } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { useUserSlippageTolerance, useUserTransactionTTL } from 'state/user/hooks'
import QuestionHelper from '../../QuestionHelper'

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
const StyledInput = styled(Input)`
  font-weight: 500;
  border-radius: 8px;
  box-shadow: none;
  border: 1px solid ${({ theme }) => theme.isDark ? '#353547' : '#e2e2e2'};
  background-color: ${({ theme }) => theme.isDark ? '#353547' : '#FFFFFF'};
  color: ${({ theme }) => theme.isDark ? '#FFFFFF' : '#000000'};
  padding: 0 10px;
  :hover {
    opacity: 1 !important;
  }
  :focus:not(:disabled) {
    box-shadow: none;
  }
`

enum SlippageError {
  InvalidInput = 'InvalidInput',
  RiskyLow = 'RiskyLow',
  RiskyHigh = 'RiskyHigh',
}

enum DeadlineError {
  InvalidInput = 'InvalidInput',
}

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`) // match escaped "." characters via in a non-capturing group

const SlippageTabs = () => {
  const [userSlippageTolerance, setUserSlippageTolerance] = useUserSlippageTolerance()
  const [ttl, setTtl] = useUserTransactionTTL()
  const [slippageInput, setSlippageInput] = useState('')
  const [deadlineInput, setDeadlineInput] = useState('')

  const { t } = useTranslation()

  const slippageInputIsValid =
    slippageInput === '' || (userSlippageTolerance / 100).toFixed(2) === Number.parseFloat(slippageInput).toFixed(2)
  const deadlineInputIsValid = deadlineInput === '' || (ttl / 60).toString() === deadlineInput

  let slippageError: SlippageError | undefined
  if (slippageInput !== '' && !slippageInputIsValid) {
    slippageError = SlippageError.InvalidInput
  } else if (slippageInputIsValid && userSlippageTolerance < 50) {
    slippageError = SlippageError.RiskyLow
  } else if (slippageInputIsValid && userSlippageTolerance > 500) {
    slippageError = SlippageError.RiskyHigh
  } else {
    slippageError = undefined
  }

  let deadlineError: DeadlineError | undefined
  if (deadlineInput !== '' && !deadlineInputIsValid) {
    deadlineError = DeadlineError.InvalidInput
  } else {
    deadlineError = undefined
  }

  const parseCustomSlippage = (value: string) => {
    if (value === '' || inputRegex.test(escapeRegExp(value))) {
      setSlippageInput(value)

      try {
        const valueAsIntFromRoundedFloat = Number.parseInt((Number.parseFloat(value) * 100).toString())
        if (!Number.isNaN(valueAsIntFromRoundedFloat) && valueAsIntFromRoundedFloat < 5000) {
          setUserSlippageTolerance(valueAsIntFromRoundedFloat)
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  const parseCustomDeadline = (value: string) => {
    setDeadlineInput(value)

    try {
      const valueAsInt: number = Number.parseInt(value) * 60
      if (!Number.isNaN(valueAsInt) && valueAsInt > 0) {
        setTtl(valueAsInt)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Flex flexDirection="column">
      <Flex flexDirection="column" mb="10px">
        <Flex mb="10px">
          <StyledText>{t('Slippage Tolerance')}</StyledText>
          {/* <QuestionHelper
            text={t(
              'Setting a high slippage tolerance can help transactions succeed, but you may not get such a good price. Use with caution.',
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
              setSlippageInput('')
              setUserSlippageTolerance(10)
            }}
            variant={userSlippageTolerance === 10 ? 'primary' : 'tertiary'}
          >
            0.1%
          </StyledButton>
          <StyledButton 
            mt="4px"
            mr="4px"
            scale="sm"
            onClick={() => {
              setSlippageInput('')
              setUserSlippageTolerance(50)
            }}
            variant={userSlippageTolerance === 50 ? 'primary' : 'tertiary'}
          >
            0.5%
          </StyledButton>
          <StyledButton 
            mr="4px"
            mt="4px"
            scale="sm"
            onClick={() => {
              setSlippageInput('')
              setUserSlippageTolerance(100)
            }}
            variant={userSlippageTolerance === 100 ? 'primary' : 'tertiary'}
          >
            1.0%
          </StyledButton>
          <Flex alignItems="center">
            <Box width="76px" mt="4px">
              <StyledInput
                scale="sm"
                inputMode="decimal"
                pattern="^[0-9]*[.,]?[0-9]{0,2}$"
                placeholder={(userSlippageTolerance / 100).toFixed(2)}
                value={slippageInput}
                onBlur={() => {
                  parseCustomSlippage((userSlippageTolerance / 100).toFixed(2))
                }}
                onChange={(event) => {
                  if (event.currentTarget.validity.valid) {
                    parseCustomSlippage(event.target.value.replace(/,/g, '.'))
                  }
                }}
                isWarning={!slippageInputIsValid}
                isSuccess={![10, 50, 100].includes(userSlippageTolerance)}
              />
            </Box>
            <StyledText color="primary" bold ml="2px">
              %
            </StyledText>
          </Flex>
        </Flex>
        {!!slippageError && (
          <StyledText fontSize="14px" color={slippageError === SlippageError.InvalidInput ? 'red' : '#F3841E'} mt="8px">
            {slippageError === SlippageError.InvalidInput
              ? t('Enter a valid slippage percentage')
              : slippageError === SlippageError.RiskyLow
              ? t('Your transaction may fail')
              : t('Your transaction may be frontrun')}
          </StyledText>
        )}
      </Flex>
      <Flex justifyContent="space-between" alignItems="center" mb="10px">
        <Flex alignItems="center">
          <StyledText>{t('Tx deadline (mins)')}</StyledText>
          {/* <QuestionHelper
            text={t('Your transaction will revert if it is left confirming for longer than this time.')}
            placement="top-start"
            ml="4px"
          /> */}
        </Flex>
        <Flex>
          <Box width="52px" mt="4px">
            <StyledInput
              scale="sm"
              inputMode="numeric"
              pattern="^[0-9]+$"
              color={deadlineError ? 'red' : undefined}
              onBlur={() => {
                parseCustomDeadline((ttl / 60).toString())
              }}
              placeholder={(ttl / 60).toString()}
              value={deadlineInput}
              onChange={(event) => {
                if (event.currentTarget.validity.valid) {
                  parseCustomDeadline(event.target.value)
                }
              }}
            />
          </Box>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default SlippageTabs
