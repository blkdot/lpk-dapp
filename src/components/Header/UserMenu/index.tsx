import React, { useState } from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import {
  Flex,
  LogoutIcon,
  useModal,
  UserMenu as UIKitUserMenu,
  UserMenuDivider,
  UserMenuItem,
  Dropdown,
  Button
} from '@pancakeswap/uikit'
import useAuth from 'hooks/useAuth'
import { useProfile } from 'state/profile/hooks'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { FetchStatus, useGetBnbBalance } from 'hooks/useTokenBalance'
import { useTranslation } from 'contexts/Localization'

import { Jazzicon } from '@ukstv/jazzicon-react';
import WalletModal, { WalletView, LOW_BNB_BALANCE } from './WalletModal'
import WalletUserMenuItem from './WalletUserMenuItem'



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
const StyledAccountMenu = styled.ul`
  display: none;
  opacity:0;
  transition: opacity 3s linear;
`
const StyledAccountMenuItem = styled(UserMenuItem)`
  height: 100%;
  border-radius: 5px;
  font-weight: 500;
  color: #000;

  :hover:not(:disabled){
    background-color: #bce3ff;
  }

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
  padding: 0.15rem 1.05rem 0.15rem 0.5rem;
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
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const { logout } = useAuth()
  const { balance, fetchStatus } = useGetBnbBalance()
  const { profile } = useProfile()
  const [onPresentWalletModal] = useModal(<WalletModal initialView={WalletView.WALLET_INFO} />)
  const [onPresentTransactionModal] = useModal(<WalletModal initialView={WalletView.TRANSACTIONS} />)
  const avatarSrc = profile?.nft?.image?.thumbnail
  const hasLowBnbBalance = fetchStatus === FetchStatus.SUCCESS && balance.lte(LOW_BNB_BALANCE)

  const [ activeDropdown, setActiveDropdown ] = useState(false) 
  const activeMenu = () => {
    setActiveDropdown(!activeDropdown)
  }

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

      <StyledAccountContainer onClick={activeMenu}>
        <StyledAccountWrapper>
          {account.charAt(0).toUpperCase() + account.slice(1, 4).concat('...') + account.slice(-4)}

          <StyledAccountMenu className={activeDropdown ? 'menu-active' : ''}>
            <StyledAccountMenuItem as="button" onClick={logout}>
              <Flex alignItems="center" justifyContent="space-between" width="100%">
                {t('Log Out')}
              </Flex>
            </StyledAccountMenuItem>
          </StyledAccountMenu>
        </StyledAccountWrapper>
      </StyledAccountContainer>

      {/* <StyledDropdown target={
        <StyledAccountWrapper>{account.charAt(0).toUpperCase() + account.slice(1, 4).concat('...') + account.slice(-4)}</StyledAccountWrapper>
      }>
        <StyledAccountMenu as="button" onClick={logout}>
          <Flex alignItems="center" justifyContent="space-between" width="100%">
            {t('Log Out')}
          </Flex>
        </StyledAccountMenu>
      </StyledDropdown> */}
    </>

    // <UIKitUserMenu account={account} avatarSrc={avatarSrc}>
    //   <WalletUserMenuItem hasLowBnbBalance={hasLowBnbBalance} onPresentWalletModal={onPresentWalletModal} />
    //   <UserMenuItem as="button" onClick={onPresentTransactionModal}>
    //     {t('Transactions')}
    //   </UserMenuItem>
    //   <UserMenuDivider />
    //   <UserMenuItem as="button" onClick={logout}>
    //     <Flex alignItems="center" justifyContent="space-between" width="100%">
    //       {t('Disconnect')}
    //       <LogoutIcon />
    //     </Flex>
    //   </UserMenuItem>
    // </UIKitUserMenu>
  )
}

export default UserMenu
