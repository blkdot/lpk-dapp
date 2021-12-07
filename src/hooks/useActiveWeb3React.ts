import { useEffect, useState, useRef } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { simpleRpcProvider } from 'utils/providers'
// eslint-disable-next-line import/no-unresolved
import { Web3ReactContextInterface } from '@web3-react/core/dist/types'

/**
 * Provides a web3 provider with or without user's signer
 * Recreate web3 instance only if the provider change
 */
const useActiveWeb3React = (): Web3ReactContextInterface<Web3Provider> => {
  const { library, chainId, account, ...web3React } = useWeb3React()

  const refEth = useRef(library)
  const [provider, setProvider] = useState(library || simpleRpcProvider)

  // const refAccount = useRef(account)
  const [providerAccount, setProviderAccount] = useState(account)


  useEffect(() => {
    if (library !== refEth.current) {
      setProvider(library || simpleRpcProvider)
      refEth.current = library
    }
    setProviderAccount(account)

  }, [library, account])

  return { 
    library: provider, 
    chainId: chainId ?? parseInt(process.env.REACT_APP_CHAIN_ID, 10), 
    account: providerAccount,
    ...web3React }
}

export default useActiveWeb3React
