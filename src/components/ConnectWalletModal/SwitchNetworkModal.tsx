import React from 'react'
import { InjectedModalProps } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import Loader from "react-loader-spinner";
import useTheme from 'hooks/useTheme'

import { 
  ScrollableContainer, 
  ConnectButtonWrapper, 
  StyledModal,
  StyledButton,
  LoaderWrapper
} from './styleds'

const SwitchNetworkModal: React.FC<InjectedModalProps> = ({ onDismiss }) => {

  const { t } = useTranslation()
  const { theme, isDark, toggleTheme } = useTheme()

  return (
    <StyledModal
      title={t('Connect Wallet')}
      // headerBackground={isDark ? '#152b39' : '#EDF4F9'}
      onDismiss={onDismiss}
      style={{ maxWidth: '520px' }}
    >
      <ScrollableContainer>
       sdsdsdsd
      </ScrollableContainer>
    </StyledModal>
  )
}

export default SwitchNetworkModal
