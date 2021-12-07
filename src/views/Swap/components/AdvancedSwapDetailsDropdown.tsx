import React from 'react'
import styled from 'styled-components'
import useLastTruthy from 'hooks/useLast'
import { AdvancedSwapDetails, AdvancedSwapDetailsProps } from './AdvancedSwapDetails'

const AdvancedDetailsFooter = styled.div<{ show: boolean }>`
  margin-top: ${({ show }) => (show ? "5px" : 0)};
  margin-bottom: ${({ show }) => (show ? "10px" : 0)};
  padding: ${({ show }) => (show ? "10px" : 0)};
  width: 100%;
  max-width: 520px;
  display: flex;
  justify-content: center;
  border-radius: 8px;
  background-color: ${({ theme }) => (theme.isDark) ? 'transparent' : '#f5f5f5'};

  transform: ${({ show }) => (show ? 'translateY(0%)' : 'translateY(-100%)')};
  transition: transform 300ms ease-in-out;
`

export default function AdvancedSwapDetailsDropdown({ trade, ...rest }: AdvancedSwapDetailsProps) {
  const lastTrade = useLastTruthy(trade)

  return (
    <AdvancedDetailsFooter show={Boolean(trade)}>
      <AdvancedSwapDetails {...rest} trade={trade ?? lastTrade ?? undefined} />
    </AdvancedDetailsFooter>
  )
}
