import React from 'react'
import styled from 'styled-components'
import { Flex, IconButton, CogIcon, useModal } from '@pancakeswap/uikit'
import SettingsModal from './SettingsModal'

const StyledIconButton = styled(IconButton)`
  width: 40px;
  height: 40px;
  border: none;
  margin-right: 0.5rem;
  margin-left: 0.5rem;
  background-color: ${({ theme }) => (theme.isDark) ? 'rgb(39, 97, 139)' : '#1B435F' };

  padding: 0.15rem 0.725rem;
  border-radius: 0.5rem;

  :hover,
  :focus {
    cursor: pointer;
    outline: none;
    opacity: 1 !important;
    background-color: #27618b !important;
  }

  svg {
    margin-top: 2px;
    fill: rgb(74,254,253);
  }
`
const GlobalSettings = () => {
  const [onPresentSettingsModal] = useModal(<SettingsModal />)

  return (
    <Flex>
      <StyledIconButton onClick={onPresentSettingsModal} variant="text" scale="sm" mr="8px" id="open-settings-dialog-button">
        <CogIcon height={24} width={24} color="textSubtle" />
      </StyledIconButton>
    </Flex>
  )
}

export default GlobalSettings
