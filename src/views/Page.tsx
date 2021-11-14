import React from 'react'
import styled from 'styled-components'
import { Flex } from '@pancakeswap/uikit'
import { PageMeta } from 'components/Layout/Page'
import Hero from 'components/Hero'

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-bottom: 0;
  min-height: calc(100vh - 64px);
  background: ${({ theme }) => (theme.isDark) ? '#12344c' : 'rgb(247, 248, 250)' }; 

  ${({ theme }) => theme.mediaQueries.xs} {
    background-size: auto;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-bottom: 0;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    min-height: calc(100vh - 64px);
  }
`
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  background: ${({ theme }) => (theme.isDark) ? '#12344c' : 'rgb(247, 248, 250)' }; 

`
const StyledFlex = styled(Flex)`
  display: flex;
  flex-direction: row;
  align-items: start;
  width: 100%;
  padding: 16px;
  padding-bottom: 2rem;
  justify-content: space-between;
  max-width: 1440px;
  background: ${({ theme }) => (theme.isDark) ? '#12344c' : 'rgb(247, 248, 250)' }; 
`

const Page: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  return (
    <>
      <PageMeta />
      <Wrapper>
        <StyledFlex>
          <Hero />
          <StyledPage {...props}>
            {children}
            <Flex flexGrow={1} />
          </StyledPage>
          <Hero />
        </StyledFlex>
      </Wrapper>
    </>
  )
}

export default Page