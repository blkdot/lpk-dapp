import React from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import {
  useModal,
} from '@pancakeswap/uikit'
import ConnectWalletButton from 'components/ConnectWalletButton'

import { Jazzicon } from '@ukstv/jazzicon-react';
import WalletModal from './WalletModal'
// import WalletUserMenuItem from './WalletUserMenuItem'

const StyledAccountContainer = styled.ul`
  padding:0;
  list-style: none;
  position: relative;
`
const StyledAccountWrapper = styled.li`
  display: flex;
  flex-direction: row;
  height: 40px;
  border: none;
  background-color: #1B435F;
  padding: 0.15rem 0.725rem;
  border-radius: 0.5rem;
  color: rgb(74,254,253);
  align-items: center;
  font-weight: 600;

  :hover,
  :focus {
    cursor: pointer;
    outline: none;
    opacity: 1 !important;
    background-color: #27618b !important;
  }

  .menu-active {
    position: absolute;
    top:42px;
    right:0px;
    display: flex;
    background: #fff;
    padding-top: 0px;
    z-index: 20;
    border-radius:5px;
    box-shadow: 0px 0px 20px rgba(0,0,0,0.2);
    height: 100%;
    width: 100%;
    opacity: 1;
  }

  // ${({ theme }) => theme.mediaQueries.sm} {
  //   max-height: none;
  // }
`
const StyledJazzicon = styled(Jazzicon)`
  width: 20px;
  height: 20px;
`
const StyledAccountLogoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 40px;
  border: none;
  background-color: rgb(27 67 95 / 50%);
  padding: 0.15rem 0.9rem 0.15rem 0.3rem;
  border-radius: 0.5rem;
  color: rgb(74,254,253);
  align-items: center;
  font-weight: 600;
  margin-right: -10px
  // :hover,
  // :focus {
  //   cursor: pointer;
  //   outline: none;
  //   opacity: 1 !important;
  //   background-color: #27618b !important;
  // }

  // ${({ theme }) => theme.mediaQueries.sm} {
  //   max-height: none;
  // }
`

const UserMenu = () => {
  const { account } = useWeb3React()
  const [onPresentWalletModal] = useModal(<WalletModal />)
  // const [onPresentTransactionModal] = useModal(<WalletModal initialView={WalletView.TRANSACTIONS} />)

  if (!account) {
    return <ConnectWalletButton scale="sm" />
  }

  return (
    <>
      <StyledAccountLogoWrapper>
        {account &&
          <StyledJazzicon address={account} />
        }
      </StyledAccountLogoWrapper>

      <StyledAccountContainer onClick={onPresentWalletModal}>
        <StyledAccountWrapper>
          {account.charAt(0).toUpperCase() + account.slice(1, 4).concat('...') + account.slice(-4)}
        </StyledAccountWrapper>
      </StyledAccountContainer>
    </>
  )
}

export default UserMenu
