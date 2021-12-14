import React, { useState } from 'react'
import { Box, CopyIcon, Flex, FlexProps, IconButton } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'

interface CopyAddressProps extends FlexProps {
  account: string
}

export const Wrapper = styled(Flex)`
  align-items: center;
  background-color: transparent;
  border-radius: 8px;
  position: relative;
`

export const Address = styled.div`
  flex: 1;
  position: relative;
  padding-left: 10px;

  & > input {
    background: transparent;
    border: 0;
    color: #4afefd;
    display: block;
    font-weight: 600;
    font-size: 14px;
    padding: 0;
    width: 100%;

    &:focus {
      outline: 0;
    }
  }

  &:after {
    content: '';
    height: 100%;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0;
    width: 24px;
  }
`
export const StyledIconButton = styled(IconButton)`
  width: 40px;
  height: 40px;
  svg {
    fill: #4afefd;
  }
`
export const Tooltip = styled.div<{ isTooltipDisplayed: boolean }>`
  display: ${({ isTooltipDisplayed }) => (isTooltipDisplayed ? 'flex' : 'none')};
  // position: absolute;
  padding: 8px;
  // top: -38px;
  // right: 0;
  // text-align: center;
  background-color: ${({ theme }) => theme.isDark ? '#ffffff' : '#e0e0e0'};
  color: ${({ theme }) => theme.isDark ? '#ffffff' : '#000000'};
  font-weight: 500;
  font-size: 14px;
  border-radius: 4px;
  opacity: 0.7;
  width: 100px;
`

const CopyAddress: React.FC<CopyAddressProps> = ({ account, ...props }) => {
  const [isTooltipDisplayed, setIsTooltipDisplayed] = useState(false)
  const { t } = useTranslation()

  const copyAddress = () => {
    if (navigator.clipboard && navigator.permissions) {
      navigator.clipboard.writeText(account).then(() => displayTooltip())
    } else if (document.queryCommandSupported('copy')) {
      const ele = document.createElement('textarea')
      ele.value = account
      document.body.appendChild(ele)
      ele.select()
      document.execCommand('copy')
      document.body.removeChild(ele)
      displayTooltip()
    }
  }

  function displayTooltip() {
    setIsTooltipDisplayed(true)
    setTimeout(() => {
      setIsTooltipDisplayed(false)
    }, 1000)
  }

  return (
    <Box position="relative" {...props}>
      <Wrapper>
        <Address title={account}>
          <input type="text" readOnly value={account} />
        </Address>
        <StyledIconButton variant="text" onClick={copyAddress}>
          <CopyIcon width="20px" />
        </StyledIconButton>
      </Wrapper>
      <Tooltip isTooltipDisplayed={isTooltipDisplayed}>{t('Copied')}</Tooltip>
    </Box>
  )
}

export default CopyAddress
