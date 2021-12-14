import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { ChainId as pChainId, Currency, CurrencyAmount, ETHER, JSBI, Token, TokenAmount, Trade } from '@pancakeswap/sdk'

import { AppDispatch, AppState } from '../index'
import { setNetwork } from './actions'
// import { NetworkState } from './reducer'

export function useNetworkState(): AppState['network'] {
  return useSelector<AppState, AppState['network']>((state) => state.network)
}

export function useNetworkActionHandlers(): {
  onChangeNetwork: (networkId: number | 0) => void
} {
  const dispatch = useDispatch<AppDispatch>()

  const onChangeNetwork = useCallback(
    (networkId: number | 0) => {
      dispatch(setNetwork({ networkId }))
    },
    [dispatch],
  )

  return {
    onChangeNetwork,
  }
}

export function useNetworkInfo(): {
  networkID?: number
  ChainId: any
} {
  const {
    networkId,
    chainId
  } = useNetworkState()

  const networkID = networkId
  const ChainId = chainId

  return {
    networkID,
    ChainId
  }
}

