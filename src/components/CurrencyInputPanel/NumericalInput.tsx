import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { escapeRegExp } from '../../utils'

const StyledInput = styled.input<{ error?: boolean; fontSize?: string; align?: string }>`
  color: ${({ theme }) => (theme.isDark) ? '#FFFFFF' : '#000000'};
  width: 0;
  position: relative;
  font-weight: 500;
  outline: none;
  border: none; 
  border-radius: 8px;
  flex: 1 1 auto;
  background-color: transparent;
  font-size: 24px;
  font-family: Ubuntu, sans-serif;
  letter-spacing: -0.05em;
  text-align: ${({ align }) => align && align};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 8px 15px;
  -webkit-appearance: textfield;

  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  [type='number'] {
    -moz-appearance: textfield;
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  ::placeholder {
    color: ${({ theme }) => (theme.isDark) ? '#FFFFFF' : '#8d8d8d'} !important;
  }
`

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`) // match escaped "." characters via in a non-capturing group

export const Input = React.memo(function InnerInput({
  value,
  onUserInput,
  placeholder,
  ...rest
}: {
  value: string | number
  onUserInput: (input: string) => void
  error?: boolean
  fontSize?: string
  align?: 'right' | 'left'
} & Omit<React.HTMLProps<HTMLInputElement>, 'ref' | 'onChange' | 'as'>) {
  const enforcer = (nextUserInput: string) => {
    if (nextUserInput === '' || inputRegex.test(escapeRegExp(nextUserInput))) {
      onUserInput(nextUserInput)
    }
  }

  const { t } = useTranslation()

  return (
    <StyledInput
      {...rest}
      value={value}
      onChange={(event) => {
        // replace commas with periods, because we exclusively uses period as the decimal separator
        enforcer(event.target.value.replace(/,/g, '.'))
      }}
      // universal input options
      inputMode="decimal"
      title={t('Token Amount')}
      autoComplete="off"
      autoCorrect="off"
      // text-specific options
      type="text"
      pattern="^[0-9]*[.,]?[0-9]*$"
      placeholder={placeholder || '0.0'}
      minLength={1}
      maxLength={79}
      spellCheck="false"
    />
  )
})

export default Input
