import React, { useCallback } from 'react'

import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { switchNetwork } from '../Utils'

declare let window: any

const useAuth = () => {
  const { activate, deactivate } = useWeb3React()

  const login = useCallback(
    (connector: any) => {
      if (connector && window.ethereum) {
        activate(connector, async (error) => {
          if (error instanceof UnsupportedChainIdError) {
            const hasSwitch = await switchNetwork()
            if (hasSwitch) {
              activate(connector)
            }
          } else {
            console.log(error)
          }
        })
      } else if (!window.ethereum) {
        window.open('https://metamask.io/download/', '_blank')
      } else {
        console.log('Unable to find connector. The connector config is wrong')
      }
    },
    [activate],
  )

  const logout = useCallback(() => {
    localStorage.removeItem('provider')
    localStorage.removeItem('walletAddress')
    localStorage.removeItem('accountId')
    deactivate()
  }, [deactivate])

  return { login, logout }
}

export default useAuth
