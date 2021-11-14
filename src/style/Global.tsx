import { createGlobalStyle } from 'styled-components'
// eslint-disable-next-line import/no-unresolved
import { PancakeTheme } from '@pancakeswap/uikit/dist/theme'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Montserrat', sans-serif;
  }
  ::-webkit-scrollbar-thumb {
    background: #27618b;
    border-radius: 8px;
  }
  body {
    background-color: ${({ theme }) => theme.colors.background};

    img {
      height: auto;
      max-width: 100%;
    }
  }
  .active {
    background: ${({ theme }) => (theme.isDark) ? '#27618b' : '#27618b'} !important;
    border: 1px solid ${({ theme }) => (theme.isDark) ? '#27618b' : '#27618b'} !important;
    color: rgb(74, 254, 253) !important;
  }
  .pancake-button--disabled {
    
    background-color: ${({ theme }) => (theme.isDark) ? '#12344c6b' : '#E9EAEB'} !important;
    border-color: ${({ theme }) => (theme.isDark) ? '#12344c6b' : '#E9EAEB'} !important;
    color: ${({ theme }) => (theme.isDark) ? '#27618b' : '#BDC2C4'} !important;
  }
`

export default GlobalStyle
