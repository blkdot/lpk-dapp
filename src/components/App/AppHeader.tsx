import React from 'react'
import styled from 'styled-components'
import { Flex, Heading, IconButton, ArrowBackIcon } from '@pancakeswap/uikit'
import { Link } from 'react-router-dom'
// import { useExpertModeManager } from 'state/user/hooks'
import QuestionHelper from '../QuestionHelper'

interface Props {
  title: string
  subtitle: string
  helper?: string
  backTo?: string
  noConfig?: boolean
}

const AppHeaderContainer = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  padding: 18px 24px;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => (theme.isDark) ? '#102836' : theme.colors.cardBorder};
  h2 {
    color: ${({ theme }) => (theme.isDark) ? '#FFFFFF' : '#000'} !important;
  }

`

const AppHeader: React.FC<Props> = ({ title, subtitle, helper, backTo, noConfig = false }) => {

  return (
    <AppHeaderContainer>
      <Flex alignItems="center" mr={noConfig ? 0 : '16px'}>
        {backTo && (
          <IconButton as={Link} to={backTo}>
            <ArrowBackIcon width="32px" />
          </IconButton>
        )}
        <Flex flexDirection="column">
          <Heading as="h2">
            {title}
          </Heading>
          <Flex alignItems="center">
            {helper && <QuestionHelper text={helper} mr="4px" placement="top-start" />}
          </Flex>
        </Flex>
      </Flex>
    </AppHeaderContainer>
  )
}

export default AppHeader
