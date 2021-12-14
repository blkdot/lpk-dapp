interface INetwork {
    id: number
  }
  
  type NetworkState = {
    networks: INetwork[]
  }
  
  type NetworkAction = {
    type: string
    network: INetwork
  }
  
  type DispatchType = (args: NetworkAction) => NetworkAction