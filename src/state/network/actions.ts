import { createAction } from '@reduxjs/toolkit'

export const setNetwork = createAction<{ networkId: number | 0 }>('swap/setNetwork')
