import { createReducer } from '@reduxjs/toolkit'
// import { ChainId, Currency, CurrencyAmount, ETHER, JSBI, Token, TokenAmount, Trade } from '@pancakeswap/sdk'
import { ChainId } from '@pancakeswap/sdk'
import { ChainId as bChainId} from 'biswap-sdk'
import { setNetwork } from './actions'

export interface NetworkState {
  readonly networkId: number
  readonly chainId: any
}

const initialState: NetworkState = {
  networkId: 0,
  chainId: ChainId
}

export default createReducer<NetworkState>(initialState, (builder) =>
  builder
    .addCase(setNetwork, (state, { payload: { networkId } }) => {
        state.networkId = networkId

        if (networkId === 0){
          state.chainId = ChainId
        }else if (networkId === 4){
          state.chainId = bChainId
        }
    })
)
