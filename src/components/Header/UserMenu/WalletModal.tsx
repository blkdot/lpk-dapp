import React, { useState } from 'react'
import {
  ButtonMenu,
  ButtonMenuItem,
  CloseIcon,
  Heading,
  IconButton,
  InjectedModalProps,
  ModalBody,
  ModalContainer,
  ModalTitle,
} from '@pancakeswap/uikit'


import useTheme from 'hooks/useTheme'
import { parseUnits } from 'ethers/lib/utils'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'
import { FetchStatus, useGetBnbBalance } from 'hooks/useTokenBalance'
import WalletInfo from './WalletInfo'
import WalletTransactions from './WalletTransactions'
import { 
  StyledModal,
  ModalHeader
} from '../styleds'

export enum WalletView {
  WALLET_INFO,
  TRANSACTIONS,
}

interface WalletModalProps extends InjectedModalProps {
  initialView?: WalletView
}

export const LOW_BNB_BALANCE = parseUnits('2', 'gwei')

const Tabs = styled.div`
  background-color: ${({ theme }) => theme.colors.dropdown};
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
  padding: 16px 24px;
`

const WalletModal: React.FC<WalletModalProps> = ({ initialView = WalletView.WALLET_INFO, onDismiss }) => {
  const [view, setView] = useState(initialView)
  const { t } = useTranslation()
  const { theme, isDark, toggleTheme } = useTheme()
  const { balance, fetchStatus } = useGetBnbBalance()
  const hasLowBnbBalance = fetchStatus === FetchStatus.SUCCESS && balance.lte(LOW_BNB_BALANCE)

  const handleClick = (newIndex: number) => {
    setView(newIndex)
  }

  return (
    <>
    <StyledModal 
      minWidth="420px"
      // headerBackground={isDark ? '#152b39' : '#EDF4F9'}
    >
      <ModalHeader>
        <ModalTitle>
          <Heading>{t('Your Wallet')}</Heading>
        </ModalTitle>
        <IconButton variant="text" onClick={onDismiss}>
          <CloseIcon width="24px" color="text" />
        </IconButton>
      </ModalHeader>
      <ModalBody p="24px" maxWidth="420px" width="100%">
        {view === WalletView.WALLET_INFO && <WalletInfo hasLowBnbBalance={hasLowBnbBalance} onDismiss={onDismiss} />}
        {view === WalletView.TRANSACTIONS && <WalletTransactions />}
      </ModalBody>
    </StyledModal>
    </>
  )
}

export default WalletModal
