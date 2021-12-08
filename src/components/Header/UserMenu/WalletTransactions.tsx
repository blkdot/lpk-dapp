import React from 'react'
import { useDispatch } from 'react-redux'
import { Box, Flex } from '@pancakeswap/uikit'
import { AppDispatch } from 'state'
import { isTransactionRecent, useAllTransactions } from 'state/transactions/hooks'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { clearAllTransactions } from 'state/transactions/actions'
import { orderBy } from 'lodash'
import TransactionRow from './TransactionRow'
import { 
  StyledIconButton,
  StyledText
} from '../styleds'

const WalletTransactions: React.FC = () => {
  const { chainId } = useActiveWeb3React()
  const dispatch = useDispatch<AppDispatch>()
  const { t } = useTranslation()
  const allTransactions = useAllTransactions()
  const sortedTransactions = orderBy(Object.values(allTransactions).filter(isTransactionRecent), 'addedTime', 'desc')

  const handleClearAll = () => {
    if (chainId) {
      dispatch(clearAllTransactions({ chainId }))
    }
  }

  return (
    <>
      <Flex alignItems="center" justifyContent="space-between" mb="24px">
        <StyledText fontSize="12px" textTransform="uppercase" fontWeight="bold">
          {t('Recent Transactions')}
        </StyledText>
        {sortedTransactions.length > 0 && (
          <StyledIconButton variant="text" onClick={handleClearAll}>
            {t('Clear all')}
          </StyledIconButton>
        )}
      </Flex>
      {sortedTransactions.length > 0 ? (
        sortedTransactions.map((txn) => <TransactionRow key={txn.hash} txn={txn} />)
      ) : (
        <StyledText textAlign="center">{t('No recent transactions')}</StyledText>
      )}
    </>
  )
}

export default WalletTransactions
