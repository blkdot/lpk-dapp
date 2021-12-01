import React from 'react'
import styled from 'styled-components'
import { useWalletModal } from '@pancakeswap/uikit'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'


const StyledButton = styled.button`
  
  background-color: ${({ theme }) => (theme.isDark) ? '#1B435F' : '#1B435F' } ;
  border: 1px solid #1B435F;
  text-align: center;
  outline: none;
  -webkit-box-pack: center;
  justify-content: center;
  font-size: 16px;
  border-radius: 8px;
  min-width: min-content;
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  -webkit-box-align: center;
  align-items: center;
  cursor: pointer;
  user-select: none;
  // background-color: 
  color: rgb(74, 254, 253);
  font-weight: 500;
  padding: 0.594rem;

  :hover,
  :focus {
    background-color: #27618b;

    :focus {
      border: 1px solid #27618b;
    }
  }
`    

const ConnectWalletButton = (props) => {
  const { t } = useTranslation()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout, t)

  return (
    <StyledButton onClick={onPresentConnectModal} {...props}>
      {t('Connect Wallet')}
    </StyledButton>
  )
}

export default ConnectWalletButton
