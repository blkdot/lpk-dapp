import React from 'react'
import { BlockIcon, CheckmarkCircleIcon, Flex, Link, OpenNewIcon, RefreshIcon } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { TransactionDetails } from 'state/transactions/reducer'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { getBscScanLink } from 'utils'
import { 
  StyledIconButton,
  StyledText
} from '../styleds'

interface TransactionRowProps {
  txn: TransactionDetails
}

const TxnIcon = styled(Flex)`
  align-items: center;
  flex: none;
  width: 18px;
  svg {
    fill: ${({ theme }) => theme.isDark ? '#50F7F7' : '#265B80'};
  }
`

const Summary = styled.div`
  flex: 1;
  padding: 0 8px;
  color: ${({ theme }) => theme.isDark ? '#50F7F7' : '#265B80'};
  font-size: 14px;
`

const TxnLink = styled(Link)`
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  margin-bottom: 10px;
  width: 100%;

  &:hover {
    text-decoration: none;
  }
`

const renderIcon = (txn: TransactionDetails) => {
  if (!txn.receipt) {
    return <RefreshIcon spin width="18px" />
  }

  return txn.receipt?.status === 1 || typeof txn.receipt?.status === 'undefined' ? (
    <CheckmarkCircleIcon color="success" width="18px" />
  ) : (
    <BlockIcon color="failure" width="18px" />
  )
}

const TransactionRow: React.FC<TransactionRowProps> = ({ txn }) => {
  const { chainId } = useActiveWeb3React()

  if (!txn) {
    return null
  }

  return (
    <TxnLink href={getBscScanLink(txn.hash, 'transaction', chainId)} external>
      <TxnIcon>{renderIcon(txn)}</TxnIcon>
      <Summary>{txn.summary ?? txn.hash}</Summary>
      <TxnIcon>
        <OpenNewIcon width="18px" />
      </TxnIcon>
    </TxnLink>
  )
}

export default TransactionRow
