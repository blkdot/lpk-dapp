import { createContext, useContext } from "react"

export type NetworkContent = {
    networkId: number
    setNetworkId:(c: number) => void
}
export const NetworkContext = createContext<NetworkContent>({
    networkId: 0,
    setNetworkId: () => {/* do nothing */},
})

export const useNetworkContext = () => useContext(NetworkContext)