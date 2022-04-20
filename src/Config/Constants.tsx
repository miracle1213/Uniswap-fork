import { InjectedConnector } from '@web3-react/injected-connector'

export interface ConnectorsProps {
  metamask: InjectedConnector
}

export const RinkebyNetInfo = {
  chainId: 4,
  chainName: 'Linkeby Test Network',
  blockExplorer: 'https://rinkeby.etherscan.io',
  rpcUrl: 'https://rinkeby.infura.io/v3/',
}

const metamask = new InjectedConnector({
  supportedChainIds: [RinkebyNetInfo.chainId],
})

export const connectors = {
  metamask: metamask,
}
