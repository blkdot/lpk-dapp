import React, { useState } from 'react'
import { Box, Flex, InjectedModalProps} from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import useAuth from 'hooks/useAuth'

import { useTranslation } from 'contexts/Localization'
import { getBscScanLink } from 'utils'
import WalletTransactions from './WalletTransactions'
import { 
  StyledText,
  Wrapper,
  Address,
  Tooltip,
  StyledIconButton,
  StyledCopyIcon,
  StyledCheckmarkCircleFillIcon,
  StyledLinkExternal,
  StyledMessage,
  StyledLogOutButton,
  StyledTransactionWrapper
} from '../styleds'

interface WalletInfoProps {
  hasLowBnbBalance: boolean
  onDismiss: InjectedModalProps['onDismiss']
}

const WalletInfo: React.FC<WalletInfoProps> = ({ hasLowBnbBalance, onDismiss }) => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const { logout } = useAuth()

  const [isTooltipDisplayed, setIsTooltipDisplayed] = useState(false)

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

  const handleLogout = () => {
    onDismiss()
    logout()
  }

  return (
    <>
      <StyledText fontSize="12px" textTransform="uppercase" fontWeight="bold" mb="8px">
        {t('Your Address')}
      </StyledText>

      <Box position="relative" mb="10px">
        <Wrapper>
          <Address title={account}>
            <input type="text" readOnly value={account} />
          </Address>
        </Wrapper>
      </Box>
      
      <Flex alignItems="start" justifyContent="space-between"  mb="24px">
        <Flex alignItems="center" justifyContent="center" flexDirection="column">
          <StyledIconButton variant="text" onClick={copyAddress}>
            {t('Copy Address')}
            <StyledCopyIcon width="24px" />
          </StyledIconButton>
          <Flex alignItems="center" justifyContent="start" mt="2px">
            <Tooltip isTooltipDisplayed={isTooltipDisplayed}>
              <StyledCheckmarkCircleFillIcon />
              {t('Copied')}
            </Tooltip>
          </Flex>
        </Flex>
        <StyledLinkExternal href={getBscScanLink(account, 'address')}>{t('View on BscScan')}</StyledLinkExternal>
      </Flex>
      

      {hasLowBnbBalance && (
        <StyledMessage variant="warning" mb="24px">
          <Box>
            <StyledText fontSize="14px" fontWeight="600">{t('BNB Balance Low')}</StyledText>
            <StyledText fontSize="12px" as="p">{t('You need BNB for transaction fees.')}</StyledText>
          </Box>
        </StyledMessage>
      )}

      <StyledTransactionWrapper>
        <WalletTransactions />
      </StyledTransactionWrapper>
      
      <StyledLogOutButton onClick={handleLogout}>
        {t('Log Out')}
      </StyledLogOutButton>
    </>
  )
}

export default WalletInfo
