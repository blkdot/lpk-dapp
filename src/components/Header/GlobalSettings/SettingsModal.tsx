import React, { useState } from 'react'
import styled from 'styled-components'
import { Text, Toggle, Flex, Modal, InjectedModalProps } from '@pancakeswap/uikit'
import {
  useExpertModeManager,
  useUserExpertModeAcknowledgementShow,
} from 'state/user/hooks'
import { useTranslation } from 'contexts/Localization'
import { useSwapActionHandlers } from 'state/swap/hooks'
import useTheme from 'hooks/useTheme'
import QuestionHelper from '../../QuestionHelper'
import TransactionSettings from './TransactionSettings'
import ExpertModal from './ExpertModal'
import GasSettings from './GasSettings'

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
  border-radius: 8px;
  h2 {
    color: ${({ theme }) => theme.isDark ? '#ffffff' : '#000000'};
  }
`

const SettingsModal: React.FC<InjectedModalProps> = ({ onDismiss }) => {
  const [showConfirmExpertModal, setShowConfirmExpertModal] = useState(false)
  const [showExpertModeAcknowledgement, setShowExpertModeAcknowledgement] = useUserExpertModeAcknowledgementShow()
  const [expertMode, toggleExpertMode] = useExpertModeManager()
  const { onChangeRecipient } = useSwapActionHandlers()

  const { t } = useTranslation()
  const { theme, isDark, toggleTheme } = useTheme()

  if (showConfirmExpertModal) {
    return (
      <ExpertModal
        setShowConfirmExpertModal={setShowConfirmExpertModal}
        onDismiss={onDismiss}
        setShowExpertModeAcknowledgement={setShowExpertModeAcknowledgement}
      />
    )
  }

  const handleExpertModeToggle = () => {
    if (expertMode) {
      onChangeRecipient(null)
      toggleExpertMode()
    } else if (!showExpertModeAcknowledgement) {
      onChangeRecipient(null)
      toggleExpertMode()
    } else {
      setShowConfirmExpertModal(true)
    }
  }

  return (
    <StyledModal
      title={t('Settings')}
      // headerBackground={isDark ? '#152b39' : '#EDF4F9'}
      onDismiss={onDismiss}
      style={{ maxWidth: '420px' }}
    >
      <ScrollableContainer>
        <Flex pb="10px" flexDirection="column">
          <GasSettings />
        </Flex>
        <Flex pt="10px" flexDirection="column">
          <TransactionSettings />
        </Flex>
        {/* <Flex justifyContent="space-between" alignItems="center" mb="16px">
          <Flex alignItems="center">
            <StyledText>{t('Expert Mode')}</StyledText>
            <QuestionHelper
              text={t('Bypasses confirmation modals and allows high slippage trades. Use at your own risk.')}
              placement="top-start"
              ml="4px"
            />
          </Flex>
          <Toggle id="toggle-expert-mode-button" scale="md" checked={expertMode} onChange={handleExpertModeToggle} />
        </Flex> */}
      </ScrollableContainer>
    </StyledModal>
  )
}

export default SettingsModal
