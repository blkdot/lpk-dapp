import React from 'react'
import styled from 'styled-components'

export const BodyWrapper = styled.div`
  border-radius: 8px;
  max-width: 420px;
  background: ${({ theme }) => (theme.isDark) ? '#152b39' : '#FFFFFF'};
  // border: 1px solid ${({ theme }) => (theme.isDark) ? '#152b39' : '#CBD8E1'};
  border-top: none;
  border-radius: 0px 0px 8px 8px;

  width: 100%;
  z-index: 1;
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children }: { children: React.ReactNode }) {
  return <BodyWrapper>{children}</BodyWrapper>
}
