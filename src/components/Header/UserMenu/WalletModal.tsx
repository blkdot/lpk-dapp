import React, {useEffect, useState} from 'react'
import {
  CloseIcon,
  Heading,
  IconButton,
  InjectedModalProps,
  ModalBody,
  ModalTitle,
} from '@pancakeswap/uikit'

import { parseUnits } from 'ethers/lib/utils'
import { useTranslation } from 'contexts/Localization'
import { FetchStatus, useGetBnbBalance } from 'hooks/useTokenBalance'
import WalletInfo from './WalletInfo'
// import WalletTransactions from './WalletTransactions'
import { 
  StyledModal,
  ModalHeader
} from '../styleds'

export enum WalletView {
  WALLET_INFO,
  TRANSACTIONS,
}

export const LOW_BNB_BALANCE = parseUnits('2', 'gwei')

// function getWindowDimensions() {
//   const { innerWidth: width, innerHeight: height } = window;
//   return {
//     width,
//     height
//   };
// }

// export function useWindowDimensions() {
//   const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

//   useEffect(() => {
//     function handleResize() {
//       setWindowDimensions(getWindowDimensions());
//     }

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   return windowDimensions;
// }

const WalletModal: React.FC<InjectedModalProps> = ({ onDismiss }) => {
  // const [view, setView] = useState(initialView)
  const { t } = useTranslation()
  const { balance, fetchStatus } = useGetBnbBalance()
  const hasLowBnbBalance = fetchStatus === FetchStatus.SUCCESS && balance.lte(LOW_BNB_BALANCE)
  // const { height, width } = useWindowDimensions();
  // console.log('okkk', width);
  return (
    <>
    <StyledModal 
      minWidth="unset"
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
        <WalletInfo hasLowBnbBalance={hasLowBnbBalance} onDismiss={onDismiss} />
        {/* {view === WalletView.WALLET_INFO && <WalletInfo hasLowBnbBalance={hasLowBnbBalance} onDismiss={onDismiss} />} */}
        {/* {view === WalletView.TRANSACTIONS && <WalletTransactions />} */}
      </ModalBody>
    </StyledModal>
    </>
  )
}

export default WalletModal
