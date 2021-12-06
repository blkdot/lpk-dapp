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
  ::-webkit-scrollbar {
    width: 4px;
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
    color: ${({ theme }) => (theme.isDark) ? '#4afefd' : '#27618b'} !important
  }
  .pancake-button--disabled {
    background-color: ${({ theme }) => (theme.isDark) ? '#12344c6b' : '#E9EAEB'} !important;
    border-color: ${({ theme }) => (theme.isDark) ? '#12344c6b' : '#E9EAEB'} !important;
    color: ${({ theme }) => (theme.isDark) ? '#27618b' : '#BDC2C4'} !important;
  }

  [role="presentation"] {
    background: #000000;
    transition: opacity 0.4s;
    opacity: 0.5;
    backdrop-filter: blur(2px);
  }

  [role="progressbar"] {
    width: 60%
  }

  #swap-page {
    max-width: 420px;
    width: 100%;
  }
  #tab_2{
    margin-top: 20px;
  }

  .react-tabs {
    width: 100%;
    display: flex;
    flex-direction: column;
    max-width: 520px;
  }
  .react-tabs__tab-list {
    display: flex;
    flex-flow: row nowrap;
    width: 100%;
    -webkit-box-ali	gn: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    border: ${({ theme }) => (theme.isDark) ? 'none' : '1px solid #EDF4F9'};

    border-bottom: none;
    margin: 0;  
    padding: 0;
    background: ${({ theme }) => (theme.isDark) ? 'rgb(38 91 128 / 20%)' : 'rgb(237 244 249 / 50%)'};
    border-radius: 8px 8px 0 0;
  }
  .react-tabs__tab {
    display: inline-block;
    border: none;
    color: ${({ theme }) => (theme.isDark) ? '#27618b' : '#8d8d8d'} ;
    border-bottom: none;
    position: relative;
    list-style: none;
    padding: 1rem;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    width: 100%;
    justify-content: center;
    bottom:0; 
    :hover {
      color: ${({ theme }) => (theme.isDark) ? '#3681b7' : '#5e5e5e'} ;
    }
  }
  .react-tabs__tab:focus {
    box-shadow: none;
    border-color: none;
    outline: none;
  }
  .react-tabs__tab:focus:after {
    height: 5px; */
    left: 0;
    right: 0;
    bottom: 0;
    background: transparent;
}
  }

  .react-tabs__tab--selected {
    background:  ${({ theme }) => (theme.isDark) ? '#152b39' : '#FFFFFF'};
    color: ${({ theme }) => (theme.isDark) ? '#FFFFFF' : '#27618b'};
    border-bottom: 4px solid ${({ theme }) => (theme.isDark) ? '#27618b' : '#27618b'};

    :hover {
      color: ${({ theme }) => (theme.isDark) ? '#FFFFFF' : '#27618b'} ;
    }
  }
  .react-tabs__tab-panel--selected {
    background:  ${({ theme }) => (theme.isDark) ? '#152b39' : '#FFFFFF'};
    border-radius: 0 0 8px 8px;
  }
`

export default GlobalStyle
