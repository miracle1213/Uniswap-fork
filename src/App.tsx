import React from 'react'
import './App.css'
import Home from './Page/Home'
import { Button } from 'antd'
import 'antd/dist/antd.css'
import { connectors } from '../src/Config/Constants'
import { useWeb3React } from '@web3-react/core'
import useAuth from '../src/Hook/useAuth'

function App() {
  const { account } = useWeb3React()
  const { login, logout } = useAuth()

  const handleConnectWallet = async () => {
    if (!account) {
      await login(connectors.metamask)
    } else {
      await logout()
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <Button
          type="primary"
          shape="round"
          size="large"
          style={{ width: 170 }}
          onClick={handleConnectWallet}
        >
          {account
            ? account?.slice(0, 4) + '...' + account?.slice(37, 41)
            : 'Connect Wallet'}
        </Button>
      </header>
      <Home />
    </div>
  )
}

export default App
