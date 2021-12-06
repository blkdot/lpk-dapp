import React from 'react'
import { InjectedModalProps, ConnectorNames, connectorLocalStorageKey  } from '@pancakeswap/uikit'
import { connectorsByName } from 'utils/web3React'

import { useTranslation } from 'contexts/Localization'
import Loader from "react-loader-spinner";
import useTheme from 'hooks/useTheme'
import useAuth from 'hooks/useAuth'

import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected
} from '@web3-react/injected-connector'
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from '@web3-react/walletconnect-connector'
import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from '@web3-react/frame-connector'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { Web3Provider } from '@ethersproject/providers'
import { formatEther } from '@ethersproject/units'
import MetamaskIcon from './components/MetamaskIcon'
import WalletConnectIcon from './components/WalletConnectIcon'

import { useEagerConnect, useInactiveListener } from './hooks'
import {
  injected,
  //   network,
  walletconnect,
  //   walletlink,
  //   ledger,
  //   trezor,
  //   lattice,
  //   frame,
  //   authereum,
  //   fortmatic,
  //   magic,
  //   portis,
  //   torus
} from './connectors'

import { 
  ScrollableContainer, 
  ConnectButtonWrapper, 
  StyledModal,
  StyledButton,
  LoaderWrapper
} from './styleds'

const ConnectWalletModal: React.FC<InjectedModalProps> = ({ onDismiss }) => {

  const { t } = useTranslation()
  const { theme, isDark, toggleTheme } = useTheme()
  const { login, logout } = useAuth()

  const { account } = useActiveWeb3React()
 
  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = React.useState<any>()
  React.useEffect(() => {
    if (account) {
      onDismiss()
    }
    // if (activatingConnector && activatingConnector === connector) {
    //   setActivatingConnector(undefined)
    // }
  }, [account, onDismiss])

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  // const triedEager = useEagerConnect()

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  // useInactiveListener(!triedEager || !!activatingConnector)

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
            // const currentConnector = connectorsByName[name]
            // const activating = currentConnector === activatingConnector
            // const connected = currentConnector === connector
            
            return (
              <>
              { name !== 'bsc' && 
                <StyledButton
                  key={name}
                  onClick={() => {
                    // setActivatingConnector(currentConnector)
                    login(name)
                  }}
                >
                  {name === "injected" && 
                    <MetamaskIcon />
                  }
                  {name === "walletconnect" && 
                    <WalletConnectIcon />
                  }
                  {/* {activating &&
                    <LoaderWrapper>
                      <Loader
                        type="ThreeDots"
                        color="#3389fb"
                        height={40}
                        width={40}
                      />
                    </LoaderWrapper>
                  } */}
                  {/* {connected && (
                    <span role="img" aria-label="check">
                      ✅
                    </span>
                  )} */}
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
