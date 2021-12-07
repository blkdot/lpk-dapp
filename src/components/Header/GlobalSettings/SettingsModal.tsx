import React from 'react'

import {
  Flex,
  CloseIcon,
  Heading,
  IconButton,
  InjectedModalProps,
  ModalBody,
  ModalTitle,
} from '@pancakeswap/uikit'

// import {
//   useExpertModeManager,
//   useUserExpertModeAcknowledgementShow,
// } from 'state/user/hooks'
import { useTranslation } from 'contexts/Localization'
// import { useSwapActionHandlers } from 'state/swap/hooks'
// import useTheme from 'hooks/useTheme'
// import QuestionHelper from '../../QuestionHelper'
import TransactionSettings from './TransactionSettings'
// import ExpertModal from './ExpertModal'
import GasSettings from './GasSettings'

import { 
  StyledModal,
  ModalHeader
} from '../styleds'

const SettingsModal: React.FC<InjectedModalProps> = ({ onDismiss }) => {
  // const [showConfirmExpertModal, setShowConfirmExpertModal] = useState(false)
  // const [showExpertModeAcknowledgement, setShowExpertModeAcknowledgement] = useUserExpertModeAcknowledgementShow()
  // const [expertMode, toggleExpertMode] = useExpertModeManager()
  // const { onChangeRecipient } = useSwapActionHandlers()

  const { t } = useTranslation()

  // if (showConfirmExpertModal) {
  //   return (
  //     <ExpertModal
  //       setShowConfirmExpertModal={setShowConfirmExpertModal}
  //       onDismiss={onDismiss}
  //       setShowExpertModeAcknowledgement={setShowExpertModeAcknowledgement}
  //     />
  //   )
  // }

  // const handleExpertModeToggle = () => {
  //   if (expertMode) {
  //     onChangeRecipient(null)
  //     toggleExpertMode()
  //   } else if (!showExpertModeAcknowledgement) {
  //     onChangeRecipient(null)
  //     toggleExpertMode()
  //   } else {
  //     setShowConfirmExpertModal(true)
  //   }
  // }

  return (

    <StyledModal 
      minWidth="420px"
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
      <Flex pb="10px" flexDirection="column">
        <GasSettings />
      </Flex>
      <Flex pt="10px" flexDirection="column">
        <TransactionSettings />
      </Flex>
    </ModalBody>
    </StyledModal>
  )
}

export default SettingsModal
