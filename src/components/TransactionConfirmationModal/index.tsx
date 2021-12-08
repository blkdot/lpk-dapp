import React, { useCallback } from 'react'
import { ChainId, Currency, Token } from '@pancakeswap/sdk'
import styled from 'styled-components'
import {
  Button,
  Text,
  ErrorIcon,
  ArrowUpIcon,
  MetamaskIcon,
  Flex,
  Box,
  Link,
  Spinner,
  Modal,
  InjectedModalProps,
} from '@pancakeswap/uikit'
import Loader from "react-loader-spinner";
import { registerToken } from 'utils/wallet'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { wrappedCurrency } from 'utils/wrappedCurrency'
import { RowFixed } from '../Layout/Row'
import { AutoColumn, ColumnCenter } from '../Layout/Column'
import { getBscScanLink } from '../../utils'
import useTheme from '../../hooks/useTheme'

const Wrapper = styled.div`
  width: 100%;
`
const Section = styled(AutoColumn)`
  padding: 24px;
`

const ConfirmedIcon = styled(ColumnCenter)`
  padding: 24px 0;
  svg {
    fill: ${({ theme }) => theme.isDark ? '#50f7f7' : '#265B80'};
  }
`
const StyledModal = styled(Modal)`
  background: ${({ theme }) => theme.isDark ? '#152b39' : '#FFFFFF'};
  border: 1px solid ${({ theme }) => theme.isDark ? '#152b39' : '#EDF4F9'};
  border-radius: 8px;
  max-width: 520px;
  h2 {
    color: ${({ theme }) => theme.isDark ? '#50f7f7' : '#000000'};
  }
`
const StyledConfirmText = styled(Text)`
  color: ${({ theme }) => theme.isDark ? '#50f7f7' : '#265B80'};
  font-weight: 500;
`
const StyledText = styled(Text)`
  color: ${({ theme }) => theme.isDark ? '#EDF4F9' : '#000000'};
`
export const StyledButton = styled.button`
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
  color: rgb(74, 254, 253);
  font-weight: 500;
  padding: 0.8rem;

  :hover,
  :focus {
    background-color: #27618b;

    :focus {
      border: 1px solid #27618b;
    }
  }
` 

function ConfirmationPendingContent({ pendingText }: { pendingText: string }) {
  const { t } = useTranslation()
  const { isDark } = useTheme()

  return (
    <Wrapper>
      <ConfirmedIcon>
        <Loader
          type="Bars"
          color={isDark ? '#4afefd' : '#265B80'}
          height={60}
          width={60}
        />
      </ConfirmedIcon>
      <AutoColumn gap="12px" justify="center">
        <StyledConfirmText fontSize="20px">{t('Waiting For Confirmation')}</StyledConfirmText>
        <AutoColumn gap="12px" justify="center">
          <StyledText bold small textAlign="center">
            {pendingText}
          </StyledText>
        </AutoColumn>
        <StyledText small textAlign="center">
          {t('Confirm this transaction in your wallet')}
        </StyledText>
      </AutoColumn>
    </Wrapper>
  )
}

function TransactionSubmittedContent({
  onDismiss,
  chainId,
  hash,
  currencyToAdd,
}: {
  onDismiss: () => void
  hash: string | undefined
  chainId: ChainId
  currencyToAdd?: Currency | undefined
}) {
  const { library } = useActiveWeb3React()

  const { t } = useTranslation()

  const token: Token | undefined = wrappedCurrency(currencyToAdd, chainId)

  return (
    <Wrapper>
      <Section>
        <ConfirmedIcon>
          <svg xmlns="http://www.w3.org/2000/svg" strokeWidth="0.5" width="90" height="90" fill="currentColor" viewBox="0 0 16 16">
            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855a.75.75 0 0 0-.124 1.329l4.995 3.178 1.531 2.406a.5.5 0 0 0 .844-.536L6.637 10.07l7.494-7.494-1.895 4.738a.5.5 0 1 0 .928.372l2.8-7Zm-2.54 1.183L5.93 9.363 1.591 6.602l11.833-4.733Z"/>
            <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686Z"/>
          </svg>
        </ConfirmedIcon>
        <AutoColumn gap="12px" justify="center">
          <StyledConfirmText fontSize="20px">{t('Transaction Submitted')}</StyledConfirmText>
          {chainId && hash && (
            <Link external small href={getBscScanLink(hash, 'transaction', chainId)}>
              {t('View on BscScan')}
            </Link>
          )}
          {currencyToAdd && library?.provider?.isMetaMask && (
            <StyledButton
              onClick={() => registerToken(token.address, token.symbol, token.decimals)}
            >
              <RowFixed>
                {t('Add %asset% to Metamask', { asset: currencyToAdd.symbol })}
                <MetamaskIcon width="16px" ml="6px" />
              </RowFixed>
            </StyledButton>
          )}
          <StyledButton onClick={onDismiss}>
            {t('Close')}
          </StyledButton>
        </AutoColumn>
      </Section>
    </Wrapper>
  )
}


export const StyledWrapper = styled(Wrapper)`
  display: flex;
  flex-direction: column;
  background: transparent;
`
export const StyledBox = styled.div`
  background: transparent;
  border-radius: 8px;
`
export const StyledErrorIcon = styled(ErrorIcon)`
  fill: #EF4444;
`
export const StyledErrorText = styled(Text)`
  color: #EF4444;
`


export function ConfirmationModalContent({
  bottomContent,
  topContent,
}: {
  topContent: () => React.ReactNode
  bottomContent: () => React.ReactNode
}) {
  return (
    <StyledWrapper>
      <StyledBox>{topContent()}</StyledBox>
      <StyledBox>{bottomContent()}</StyledBox>
    </StyledWrapper>
  )
}

export function TransactionErrorContent({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  const { t } = useTranslation()
  return (
    <Wrapper>
      <AutoColumn justify="center">
        <StyledErrorIcon width="64px" />
        <StyledErrorText style={{ textAlign: 'center', width: '85%' }}>
          {message}
        </StyledErrorText>
      </AutoColumn>

      <Flex justifyContent="center" pt="24px">
        <StyledButton onClick={onDismiss}>{t('Dismiss')}</StyledButton>
      </Flex>
    </Wrapper>
  )
}

interface ConfirmationModalProps {
  title: string
  customOnDismiss?: () => void
  hash: string | undefined
  content: () => React.ReactNode
  attemptingTxn: boolean
  pendingText: string
  currencyToAdd?: Currency | undefined
}

const TransactionConfirmationModal: React.FC<InjectedModalProps & ConfirmationModalProps> = ({
  title,
  onDismiss,
  customOnDismiss,
  attemptingTxn,
  hash,
  pendingText,
  content,
  currencyToAdd,
}) => {
  const { chainId } = useActiveWeb3React()
  const { theme } = useTheme()

  const handleDismiss = useCallback(() => {
    if (customOnDismiss) {
      customOnDismiss()
    }
    onDismiss()
  }, [customOnDismiss, onDismiss])

  if (!chainId) return null

  return (
    <StyledModal title={title} headerBackground={(theme.isDark) ? '#152b39' : '#EDF4F9'} onDismiss={handleDismiss}>
      {attemptingTxn ? (
        <ConfirmationPendingContent pendingText={pendingText} />
      ) : hash ? (
        <TransactionSubmittedContent
          chainId={chainId}
          hash={hash}
          onDismiss={onDismiss}
          currencyToAdd={currencyToAdd}
        />
      ) : (
        content()
      )}
    </StyledModal>
  )
}

export default TransactionConfirmationModal
