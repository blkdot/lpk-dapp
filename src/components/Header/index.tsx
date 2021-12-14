import React from 'react'
import { MoonIcon, SunIcon } from '@pancakeswap/uikit'
import useTheme from 'hooks/useTheme'
import UserMenu from './UserMenu'
import GlobalSettings from './GlobalSettings'
import LanguageSetting from './LanguageSetting'

import Logo from '../../assets/images/lpk_logo.png'
import LogoLPesaApp from '../../assets/images/lpesa_app.png'
import AnySwapLogo from '../../assets/images/anyswap_round.png'

import {
  RowBetween,
  HeaderFrame,
  SubHeaderFrame,
  HeaderElement,
  HeaderElementBlock,
  SubHeaderLastElement,
  StyledLinkButton,
  StyledIcon,
  Title,
  StyledAnySwapLogoButton,
  ThemeSwitchButton
} from './styleds'

const Header = () => {
  const { isDark, toggleTheme } = useTheme()
  return (
    <>
    <HeaderFrame>
      <RowBetween>
        <HeaderElement>
          <Title>
              <img style={{ height: '80px' }} src={isDark ? Logo : Logo} alt="logo" />
          </Title>
        </HeaderElement>
        <HeaderElement>
          <HeaderElementBlock>
            <UserMenu />
            <GlobalSettings />
            <ThemeSwitchButton onClick={toggleTheme}>
              {isDark ? (
                <MoonIcon height={24} width={24} color="textSubtle" />
              ) : (
                <SunIcon height={24} width={24} color="textSubtle" />
              )}
            </ThemeSwitchButton>
            <LanguageSetting />
          </HeaderElementBlock>
          <HeaderElementBlock>
            <a href="https://anyswap.exchange/" target="_blank" rel="noopener noreferrer">
              <StyledAnySwapLogoButton src={AnySwapLogo} alt="" width="30" height="30" />
            </a>
          </HeaderElementBlock>
        </HeaderElement>
      </RowBetween>
    </HeaderFrame>
    <SubHeaderFrame>
      <RowBetween>
        <SubHeaderLastElement>
          <StyledLinkButton>
            <StyledIcon>
              <svg width="24" height="24" viewBox="0 0 156 155" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M32.6511 73.3535C32.6513 72.4905 32.8219 71.636 33.1532 70.8392C33.4845 70.0423 33.9699 69.3187 34.5816 68.71C35.1934 68.1012 35.9193 67.6193 36.7178 67.2919C37.5162 66.9644 38.3715 66.798 39.2345 66.802L50.149 66.8376C51.8893 66.8376 53.5583 67.529 54.7889 68.7595C56.0194 69.9901 56.7108 71.6591 56.7108 73.3994V114.673C57.9401 114.309 59.5133 113.92 61.2445 113.512C62.4439 113.23 63.5128 112.551 64.2779 111.585C65.043 110.62 65.4595 109.424 65.4597 108.191V56.9982C65.4597 55.2578 66.151 53.5887 67.3816 52.358C68.6121 51.1272 70.2811 50.4356 72.0215 50.4352H82.9691C84.7093 50.4356 86.3781 51.127 87.6086 52.3575C88.8391 53.588 89.5305 55.2568 89.5309 56.997V104.512C89.5309 104.512 92.2697 103.404 94.9359 102.278C95.9266 101.859 96.7721 101.158 97.3668 100.261C97.9614 99.3648 98.279 98.3131 98.2798 97.2374V40.5933C98.2798 38.8532 98.971 37.1844 100.201 35.9539C101.432 34.7234 103.1 34.0319 104.84 34.0316H115.776C117.516 34.0333 119.183 34.7253 120.412 35.9557C121.641 37.1861 122.332 38.8541 122.332 40.5933V87.2387C131.813 80.3675 141.422 72.1026 149.047 62.1651C150.154 60.7226 150.886 59.0287 151.178 57.2345C151.471 55.4403 151.315 53.6016 150.724 51.8824C147.194 41.7272 141.583 32.4207 134.25 24.5585C126.917 16.6962 118.024 10.4513 108.139 6.22342C98.2541 1.99551 87.5954 -0.122327 76.845 0.0054566C66.0947 0.13324 55.4894 2.50382 45.7077 6.9655C35.9261 11.4272 27.1836 17.8817 20.0396 25.916C12.8956 33.9504 7.50755 43.3876 4.22013 53.6238C0.932706 63.86 -0.18165 74.6697 0.948364 85.3613C2.07838 96.0529 5.42788 106.391 10.7825 115.714C11.7154 117.322 13.0879 118.631 14.7388 119.486C16.3897 120.341 18.2503 120.707 20.1022 120.542C22.171 120.359 24.7467 120.102 27.8091 119.743C29.1408 119.59 30.3697 118.953 31.2623 117.953C32.1548 116.952 32.6486 115.659 32.6498 114.319V73.3535" fill="#0C598B"/>
                <path d="M32.4182 139.545C43.9458 147.932 57.5685 152.965 71.7794 154.09C85.9902 155.214 100.235 152.385 112.938 145.916C125.641 139.447 136.307 129.59 143.755 117.436C151.204 105.281 155.145 91.3032 155.142 77.0479C155.142 75.2645 155.059 73.5091 154.941 71.7588C126.708 113.867 74.5783 133.552 32.4182 139.545Z" fill="#979695"/>
              </svg>
            </StyledIcon>
            <StyledIcon>
              <svg width="24" height="24" viewBox="0 0 163 166" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_3_4277)">
                  <path d="M141.741 99.1897C140.451 100.082 138.945 100.608 137.382 100.713C135.818 100.818 134.256 100.499 132.858 99.7881C129.578 97.9287 127.81 93.5687 127.81 87.6271V69.4178C127.81 60.6764 124.359 54.4571 118.586 52.7686C108.83 49.9047 101.545 61.8947 98.733 66.4043L81.4787 94.4236V60.2276C81.287 52.3412 78.7308 47.6179 73.8953 46.2073C70.7001 45.2669 65.9072 45.6516 61.2422 52.79L22.6649 114.92C17.5321 105.067 14.8706 94.1069 14.9111 82.9893C14.9111 45.5447 44.7334 15.089 81.4787 15.089C118.224 15.089 148.153 45.5447 148.153 82.9893V83.1817C148.153 83.1817 148.153 83.3099 148.153 83.374C148.515 90.6193 146.172 96.3899 141.762 99.1897H141.741ZM163.043 83.0107V82.6473C162.744 37.0171 126.276 0 81.4787 0C36.6814 0 0 37.2309 0 82.9893C0 128.748 36.5536 166 81.4787 166C102.083 165.999 121.904 158.075 136.863 143.858C138.315 142.486 139.169 140.594 139.241 138.594C139.313 136.594 138.596 134.646 137.246 133.172C136.6 132.455 135.819 131.873 134.949 131.46C134.078 131.047 133.134 130.811 132.172 130.766C131.21 130.72 130.248 130.866 129.342 131.194C128.436 131.523 127.604 132.028 126.894 132.68C120.453 138.81 112.845 143.57 104.525 146.676C96.2057 149.782 87.3463 151.169 78.4791 150.753C69.6118 150.338 60.9197 148.13 52.9244 144.26C44.9292 140.39 37.7958 134.939 31.9524 128.235L66.6741 72.239V98.0783C66.6741 110.496 71.4669 114.514 75.493 115.689C79.519 116.865 85.6751 116.053 92.1295 105.537L111.301 74.3976C111.897 73.3931 112.473 72.5382 112.984 71.7901V87.6271C112.984 99.2324 117.628 108.508 125.765 113.082C129.465 115.086 133.634 116.054 137.836 115.885C142.037 115.716 146.116 114.415 149.644 112.12C158.591 106.285 163.469 95.7273 162.957 83.0107H163.043Z" fill="#17181B"/>
                </g>
                <defs>
                  <clipPath id="clip0_3_4277">
                    <rect width="163" height="166" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </StyledIcon>
            <StyledIcon>
              <svg width="24" height="24" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M69.9919 3.55006e-06C108.739 0.0125138 139.912 31.3119 139.928 70.134C139.945 108.574 108.358 140.182 69.3383 139.876C31.7273 139.581 -0.0289485 108.378 0.103931 69.9328C0.237487 31.2784 31.4142 -0.0121686 69.9919 3.55006e-06ZM16.9296 106.57C16.9059 107.244 17.2596 107.737 17.639 108.262C20.4562 112.155 23.5066 115.834 27.229 118.91C28.9175 120.306 30.4827 121.857 32.3251 123.059C37.4431 126.396 42.7083 129.422 48.5158 131.467C53.2659 133.14 58.1145 134.424 63.0984 134.884C66.9546 135.239 70.8835 135.439 74.7542 134.916C77.0338 134.609 79.4054 134.633 81.55 133.589C81.9084 133.862 82.0964 133.435 82.374 133.389C86.9853 132.621 91.3899 131.188 95.6583 129.304C109.894 123.021 120.669 112.996 127.702 99.1352C133.892 86.936 135.963 73.9845 133.943 60.4037C132.023 47.4927 126.709 36.1584 117.932 26.5509C106.008 13.4986 91.0768 6.48337 73.4549 5.36455C65.5416 4.86245 57.7568 5.92447 50.2036 8.39407C38.0027 12.3832 27.8244 19.3422 19.7424 29.3322C10.4797 40.7812 5.86036 53.9437 5.36198 68.5969C5.23992 72.1921 5.58243 75.7697 6.08521 79.3362C7.24765 87.5869 9.9678 95.2851 14.1763 102.462C15.0091 103.884 15.7019 105.409 16.9296 106.57Z" fill="#8DC740"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M81.5501 133.588C79.4051 134.633 77.0339 134.609 74.754 134.916C70.8836 135.439 66.9547 135.239 63.0981 134.884C58.1143 134.424 53.2657 133.14 48.5155 131.467C42.708 129.422 37.4429 126.396 32.3248 123.059C30.4824 121.857 28.9173 120.306 27.2287 118.91C23.5064 115.834 20.4559 112.155 17.6387 108.262C17.2593 107.737 16.9057 107.244 16.9293 106.57C21.3692 96.7214 22.958 86.2266 23.9267 75.5959C24.3743 70.6814 24.5451 65.7388 25.3248 60.8588C26.238 55.1409 28.3715 49.9863 32.4793 45.7626C36.1952 41.9422 40.7172 39.3959 45.6138 37.4855C49.7121 35.8866 53.8486 34.3921 58.3293 34.1797C62.4526 33.9843 66.4762 34.6328 70.4988 35.3736C76.6126 36.8495 82.6108 38.6611 88.257 41.4939C92.8679 43.4005 97.5085 45.2297 102.303 46.6285C107.283 48.0814 112.179 49.6986 116.399 52.8667C121.71 56.8538 123.206 62.0594 120.696 68.2026C119.152 71.9811 116.513 74.9825 113.666 77.8339C108.645 82.8623 103.354 87.6199 98.6953 93.0102C93.2324 99.3306 88.2489 105.967 84.8572 113.662C82.0586 120.011 80.4563 126.582 81.5501 133.588ZM116.845 73.3342C116.615 73.3231 116.43 73.4008 116.302 73.5983C116.081 73.646 115.877 73.716 115.862 73.9902C115.86 74.0209 115.915 74.0791 115.948 74.0821C116.219 74.1099 116.328 73.9327 116.398 73.7102C116.564 73.6017 116.73 73.4931 116.895 73.3846C116.969 73.3319 117.154 73.3231 116.979 73.1726C116.934 73.2267 116.89 73.2808 116.845 73.3342ZM60.8669 41.5067C53.9494 41.5006 48.3315 47.1039 48.3302 54.0109C48.3285 60.9085 53.9592 66.5493 60.8496 66.5533C67.7479 66.5574 73.3758 60.9291 73.3772 54.0254C73.3778 47.0981 67.7969 41.5131 60.8669 41.5067ZM71.0989 80.0306C72.1089 81.6015 74.2735 83.0764 76.6099 83.9176C81.3084 85.6102 86.1039 85.6268 90.9423 84.7159C99.3306 83.1372 107.152 80.1158 114.303 75.4268C114.73 75.1469 115.355 74.9778 115.494 74.3398C115.15 74.1667 114.965 74.3361 114.785 74.4449C112.398 75.8931 109.883 77.0846 107.315 78.1662C100.647 80.9756 93.7233 82.7531 86.4782 83.0591C81.14 83.2846 75.8873 82.8782 71.0989 80.0306ZM105.665 69.2501C107.147 69.2177 108.398 67.8953 108.347 66.4154C108.294 64.9077 106.996 63.705 105.488 63.7676C104.049 63.8274 102.868 65.0747 102.882 66.5219C102.896 68.0201 104.184 69.2822 105.665 69.2501Z" fill="#8BC43F"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M70.4989 35.373C66.4764 34.6322 62.4528 33.9837 58.3295 34.1791C53.8488 34.3915 49.7122 35.8856 45.6139 37.4849C40.7177 39.3952 36.1957 41.9419 32.4795 45.7619C28.3717 49.9857 26.2382 55.1403 25.3249 60.8581C24.5452 65.7382 24.3745 70.6807 23.9268 75.5952C22.9581 86.2259 21.3693 96.7207 16.9295 106.57C15.7018 105.408 15.009 103.883 14.1755 102.462C9.96736 95.2844 7.24721 87.5865 6.08443 79.3358C5.58199 75.7694 5.23914 72.1918 5.3612 68.5966C5.85992 53.9433 10.4793 40.7808 19.7416 29.3319C27.8233 19.3419 38.0019 12.3828 50.2028 8.39373C57.756 5.92414 65.5405 4.86211 73.4541 5.36422C91.076 6.48304 106.007 13.4986 117.931 26.5505C126.709 36.1581 132.022 47.4924 133.942 60.4034C135.963 73.9841 133.891 86.9356 127.701 99.1349C120.668 112.996 109.893 123.021 95.6575 129.304C91.3891 131.188 86.9845 132.621 82.3732 133.388C82.096 133.435 81.9077 133.861 81.5496 133.589C80.4561 126.582 82.0581 120.011 84.8574 113.661C88.249 105.967 93.2325 99.3303 98.6954 93.0099C103.354 87.62 108.646 82.862 113.666 77.8336C116.513 74.9819 119.152 71.9805 120.696 68.2024C123.206 62.0591 121.71 56.8535 116.399 52.8664C112.179 49.6983 107.283 48.0811 102.303 46.6282C97.5087 45.2294 92.868 43.4002 88.2571 41.4936C87.2854 38.3843 85.1394 36.3877 82.1545 35.3088C78.2824 33.9086 74.3782 34.2183 70.4989 35.373ZM130.296 74.2543C130.413 74.2614 130.53 74.2685 130.647 74.2756C131.341 71.6697 131.387 68.9634 131.355 66.3119C131.318 63.1864 131.009 60.0517 130.383 56.9597C128.346 46.8723 123.772 38.1036 116.692 30.6661C112.345 26.0985 107.333 22.271 102.479 18.2704C98.1278 14.6847 93.4165 11.8131 87.9048 10.3802C82.687 9.02364 77.434 8.33355 72.0651 9.33572C71.7811 9.38881 71.3148 9.27655 71.3463 9.72253C71.3703 10.0661 71.7912 10.0934 72.1067 10.1475C80.1576 11.5247 87.8112 14.1687 95.4053 17.1219C102.791 19.9941 108.928 24.3078 113.443 30.8656C116.609 35.4646 119.523 40.2033 121.772 45.3292C124.81 52.2558 127.258 59.3748 128.78 66.7965C129.289 69.282 129.791 71.7685 130.296 74.2543Z" fill="#F8E888"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M60.8667 41.5064C67.7968 41.5131 73.3777 47.0978 73.377 54.0251C73.3757 60.9287 67.7481 66.5567 60.8495 66.553C53.959 66.5489 48.3284 60.9085 48.3301 54.0106C48.3314 47.1032 53.9492 41.5003 60.8667 41.5064ZM69.6418 54.1059C69.6314 49.2103 65.6751 45.2736 60.8008 45.3078C55.9803 45.3416 52.075 49.2641 52.0639 54.0822C52.0527 59.0079 55.9323 62.9101 60.8458 62.9152C65.7694 62.9206 69.653 59.0316 69.6418 54.1059Z" fill="#FBFCFA"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M71.0989 80.03C75.8873 82.8776 81.14 83.284 86.4778 83.0585C93.723 82.7528 100.647 80.975 107.314 78.1656C109.882 77.084 112.398 75.8925 114.785 74.4443C114.964 74.3358 115.149 74.1664 115.494 74.3392C115.355 74.9772 114.73 75.1463 114.303 75.4262C107.152 80.1149 99.3303 83.1366 90.942 84.7152C86.1035 85.6258 81.308 85.6096 76.6096 83.917C74.2732 83.0757 72.1089 81.6012 71.0989 80.03Z" fill="#5A5D5A"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M70.4991 35.3732C74.3783 34.2185 78.2825 33.9088 82.155 35.3089C85.1399 36.3875 87.2859 38.3841 88.2576 41.4938C82.6111 38.661 76.6129 36.8494 70.4991 35.3732Z" fill="#069446"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M105.665 69.25C104.184 69.2821 102.896 68.0196 102.882 66.5217C102.868 65.075 104.049 63.8273 105.488 63.7675C106.996 63.7049 108.294 64.9076 108.347 66.4152C108.398 67.8952 107.147 69.2179 105.665 69.25Z" fill="#FBFCFA"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M116.4 73.7124C116.328 73.9328 116.219 74.1103 115.948 74.0826C115.915 74.0792 115.86 74.0211 115.862 73.9907C115.877 73.7161 116.081 73.6461 116.303 73.5991C116.336 73.6367 116.368 73.6742 116.4 73.7124Z" fill="#5A5D5A"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M116.896 73.3853C116.731 73.4938 116.565 73.6023 116.399 73.7115C116.368 73.6747 116.336 73.6368 116.303 73.5989C116.43 73.4011 116.616 73.3234 116.845 73.3345L116.896 73.3853Z" fill="#5A5D5A"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M116.845 73.3335C116.89 73.2803 116.934 73.2264 116.978 73.1729C117.153 73.3227 116.968 73.3315 116.895 73.384C116.896 73.3843 116.845 73.3335 116.845 73.3335Z" fill="#5A5D5A"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M130.296 74.2542C129.791 71.7684 129.289 69.2819 128.78 66.7968C127.258 59.3751 124.81 52.2561 121.771 45.3295C119.523 40.2036 116.609 35.4646 113.443 30.8659C108.928 24.3078 102.791 19.9941 95.4051 17.1222C87.811 14.1687 80.157 11.5246 72.1065 10.1478C71.791 10.0937 71.3701 10.0664 71.3461 9.72283C71.3146 9.27685 71.7809 9.38911 72.0649 9.33602C77.4338 8.33385 82.6868 9.02394 87.9046 10.3805C93.4166 11.8134 98.1276 14.685 102.479 18.2707C107.333 22.2713 112.344 26.0985 116.692 30.6664C123.772 38.1043 128.345 46.8726 130.383 56.96C131.008 60.0524 131.318 63.1867 131.355 66.3122C131.387 68.9638 131.34 71.67 130.647 74.2759C130.53 74.2684 130.413 74.2617 130.296 74.2542Z" fill="#FEFDFB"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M69.6419 54.1061C69.653 59.0314 65.7694 62.9205 60.8454 62.9157C55.9323 62.9106 52.0524 59.0085 52.0636 54.0828C52.0747 49.2646 55.98 45.3418 60.8005 45.3083C65.6751 45.2738 69.6314 49.2105 69.6419 54.1061Z" fill="#595A5C"/>
              </svg>
            </StyledIcon>
            <StyledIcon>
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 172 172" fill="none">
                <g transform="translate(-17.2,-17.2) scale(1.2,1.2)">
                  <g fill="none" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0">
                    <path d="M0,172v-172h172v172z" fill="none" />
                    <g>
                      <path d="M86,14.33333c-39.58041,0 -71.66667,32.08626 -71.66667,71.66667c0,39.58041 32.08626,71.66667 71.66667,71.66667c39.58041,0 71.66667,-32.08626 71.66667,-71.66667c0,-39.58041 -32.08626,-71.66667 -71.66667,-71.66667z" fill="#29b6f6" />
                      <path d="M121.65417,53.75l-13.42317,68.53483c0,0 -0.57692,3.13183 -4.46125,3.13183c-2.064,0 -3.12825,-0.98183 -3.12825,-0.98183l-29.07517,-24.12658l-14.22583,-7.17025l-18.25708,-4.85542c0,0 -3.25008,-0.93883 -3.25008,-3.62633c0,-2.23958 3.34325,-3.30742 3.34325,-3.30742l76.38233,-30.34367c-0.00358,-0.00358 2.33275,-0.84208 4.03483,-0.8385c1.04633,0 2.23958,0.44792 2.23958,1.79167c0,0.89583 -0.17917,1.79167 -0.17917,1.79167z" fill="#ffffff" />
                      <path d="M82.41667,109.30958l-12.2765,12.09017c0,0 -0.53392,0.41208 -1.247,0.43c-0.24725,0.00717 -0.51242,-0.03225 -0.78475,-0.15408l3.45433,-21.37458z" fill="#b0bec5" />
                      <path d="M107.13092,65.20233c-0.60558,-0.78833 -1.72358,-0.93167 -2.51192,-0.33325l-47.28567,28.29758c0,0 7.5465,21.113 8.69675,24.768c1.15383,3.65858 2.07833,3.74458 2.07833,3.74458l3.45433,-21.37458l35.23133,-32.594c0.78833,-0.59842 0.93525,-1.72 0.33683,-2.50833z" fill="#cfd8dc" />
                    </g>
                  </g>
                </g>
              </svg>
            </StyledIcon>
            <StyledIcon>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 172 172">
              <g transform="translate(-17.2,-17.2) scale(1.2,1.2)">
                <g fill="none" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0">
                  <path d="M0,172v-172h172v172z" fill="none" />
                  <g>
                    <path d="M86,14.33333c-39.58041,0 -71.66667,32.08626 -71.66667,71.66667c0,39.58041 32.08626,71.66667 71.66667,71.66667c39.58041,0 71.66667,-32.08626 71.66667,-71.66667c0,-39.58041 -32.08626,-71.66667 -71.66667,-71.66667z" fill="#03a9f4" />
                    <path d="M129,61.34667c-3.1605,1.40108 -7.16308,2.71617 -10.75,3.15333c3.64783,-2.16433 9.43492,-6.67217 10.75,-10.75c-3.40775,2.00308 -9.57108,4.14233 -13.59158,4.91633c-3.21067,-3.40417 -7.79017,-4.91633 -12.86417,-4.91633c-9.74667,0 -16.54425,8.25958 -16.54425,17.91667v7.16667c-14.33333,0 -28.30833,-10.91842 -37.00508,-21.5c-1.53008,2.58358 -2.39008,5.60792 -2.39008,8.80425c0,6.51808 5.98775,13.13292 10.7285,16.27908c-2.89175,-0.08958 -8.36708,-2.29692 -10.75,-3.58333c0,0.05733 0,0.129 0,0.20425c0,8.48175 5.95192,14.24017 14.018,15.8455c-1.47275,0.40492 -3.268,1.86692 -10.17667,1.86692c2.24317,6.93375 13.51992,10.5995 21.242,10.75c-6.0415,4.68342 -16.813,7.16667 -25.08333,7.16667c-1.42975,0 -2.20375,0.07883 -3.58333,-0.08242c7.8045,4.945 18.705,7.24908 28.66667,7.24908c32.45425,0 50.16667,-24.7895 50.16667,-47.90917c0,-0.75967 -0.02508,-3.30383 -0.0645,-4.04917c3.46867,-2.44383 4.87333,-5.00233 7.23117,-8.52833" fill="#ffffff" />
                  </g>
                </g>
              </g>
            </svg>
            </StyledIcon>
            <StyledIcon>
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="144" height="144" viewBox="0 0 226 226">
                <g transform="translate(-22.6,-22.6) scale(1.2,1.2)">
                  <g fill="none" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0">
                    <path d="M0,226v-226h226v226z" fill="none" />
                    <g>
                      <path d="M113,23.54167c-49.40647,0 -89.45833,40.05186 -89.45833,89.45833c0,49.40647 40.05186,89.45833 89.45833,89.45833c49.40647,0 89.45833,-40.05186 89.45833,-89.45833c0,-49.40647 -40.05186,-89.45833 -89.45833,-89.45833z" fill="#039be5" />
                      <path d="M125.10983,136.71117h23.15087l3.63483,-23.51812h-26.79042v-12.85375c0,-9.76979 3.19225,-18.43312 12.33113,-18.43312h14.68529v-20.52362c-2.58017,-0.34842 -8.03713,-1.11117 -18.34838,-1.11117c-21.53121,0 -34.15425,11.37062 -34.15425,37.27587v15.64579h-22.13388v23.51813h22.13388v64.64071c4.38346,0.65917 8.82342,1.10646 13.38108,1.10646c4.11979,0 8.14071,-0.37667 12.10983,-0.91342z" fill="#ffffff" />
                    </g>
                  </g>
                </g>
              </svg>
            </StyledIcon>
            <StyledIcon>
              <img src={LogoLPesaApp} alt="" width="24" height="24"/>
            </StyledIcon>
          </StyledLinkButton>
        </SubHeaderLastElement>
      </RowBetween>
    </SubHeaderFrame>
    </>
  )
}

export default Header
