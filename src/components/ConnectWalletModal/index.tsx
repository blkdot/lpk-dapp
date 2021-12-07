import React from 'react'
import { InjectedModalProps } from '@pancakeswap/uikit'
import { connectorsByName } from 'utils/web3React'

import { useTranslation } from 'contexts/Localization'
import Loader from "react-loader-spinner";
import useTheme from 'hooks/useTheme'
import useAuth from 'hooks/useAuth'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import MetamaskIcon from './components/MetamaskIcon'
import WalletConnectIcon from './components/WalletConnectIcon'
import { 
  ScrollableContainer, 
  ConnectButtonWrapper, 
  StyledModal,
  StyledButton,
  LoaderWrapper
} from './styleds'

const ConnectWalletModal: React.FC<InjectedModalProps> = ({ onDismiss }) => {

  const { t } = useTranslation()
  const { isDark } = useTheme()
  const { login } = useAuth()

  const { account } = useActiveWeb3React()
 
  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = React.useState<any>()
  React.useEffect(() => {
    if (account) {
      onDismiss()
    }
    if (activatingConnector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, account, onDismiss])

  return (
    <StyledModal
      title={t('Connect Wallet')}
      headerBackground={isDark ? '#152b39' : '#EDF4F9'}
      onDismiss={onDismiss}
      style={{ maxWidth: '520px' }}
    >
      <ScrollableContainer>
        <ConnectButtonWrapper>
          {Object.keys(connectorsByName).map((name) => {
            const currentConnector = connectorsByName[name]
            const activating = currentConnector === activatingConnector
            
            return (
              <>
              { name !== 'bsc' && 
                <StyledButton
                  key={name}
                  onClick={() => {
                    login(name)
                  }}
                >
                  {name === "injected" && 
                    <MetamaskIcon />
                  }
                  {name === "walletconnect" && 
                    <WalletConnectIcon />
                  }
                  {activating &&
                    <LoaderWrapper>
                      <Loader
                        type="ThreeDots"
                        color="#3389fb"
                        height={40}
                        width={40}
                      />
                    </LoaderWrapper>
                  }
                </StyledButton>
              }
              </>
            )
          })}
        </ConnectButtonWrapper>
      </ScrollableContainer>
    </StyledModal>
  )
}

export default ConnectWalletModal
