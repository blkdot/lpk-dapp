import React, {useRef, RefObject} from 'react'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import ReactTooltip from "react-tooltip";
import Logo from '../assets/images/lpk_logo.png'

const FooterFrame = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  
  background-color: ${({ theme }) => (theme.isDark) ? 'rgb(21, 43, 57)' : 'rgb(21, 43, 57)' };
  color: ${({ theme }) => (theme.isDark) ? 'rgb(21, 43, 57)' : 'rgb(21, 43, 57)' };
  padding-bottom: 0px;

  ${({ theme }) => theme.mediaQueries.xs} {
    padding: 2rem 2rem;
  };
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 2rem 2rem;
  };
  ${({ theme }) => theme.mediaQueries.lg} {
    padding: 3rem 8rem;
  };
`
const PreFooterWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  justify-content: space-between;
  color: #6C95AF;
  font-size: 15px;

  ${({ theme }) => theme.mediaQueries.xs} {
    flex-direction: column;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: column;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
  }
`
const AboutUs = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  h4 {
    color: #ffffff;
    margin-bottom: 20px;
  }
  span {
    line-height: 24px;
  }
`
const Platforms = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.xs} {
    justify-content: flex-start;
    align-items: flex-start;
    margin-top: 2rem;
  };
  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: flex-start;
    align-items: flex-start;
    margin-top: 2rem;
  };
  ${({ theme }) => theme.mediaQueries.lg} {
    justify-content: center;
    align-items: center;
    margin-top: 0;
  };

  div {
    h4 {
      color: #ffffff;
      margin-bottom: 20px;
    }
    a {
      margin-bottom: 15px;
    }
  }
  
`
const SiteLink = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start
  a {
    color: #6C95AF;
    text-decoration: none;
    margin-bottom: 10px;
  }
`
const FooterLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  width: 100%;
`
const SocialFooterWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  justify-content: space-between;
  color: #6C95AF;
  font-size: 15px;

  padding: 5px 0px;
  border-top: 1px solid #306E96;
  border-bottom: 1px solid #306E96;
  margin-top: 10px;
`
const SocialFooter = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  h4 {
    color: #ffffff;
    font-size: 14px;
    margin-right: 40px;
  }

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`
const SocialLinkButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-radius: 5px;
  &:hover {
    background-color: transparent;
    border: 1px solid #fff;
    transition: all 0.5s ease;
  }
  ${({ theme }) => theme.mediaQueries.xs} {
    width: 32px;
    height: 32px;
    margin: 2px;
  };
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 32px;
    height: 32px;
    margin: 2px;
  };
  ${({ theme }) => theme.mediaQueries.lg} {
    width: 48px;
    height: 48px;
    margin: 5px;
  };
`
const CopyRight = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
  text-align: center;
  span {
    color: #6C95AF;
  }
`

const FbSocialIconHolder = styled.div`
  position: relative;
  z-index: 100;
  transition: all 0.5s ease;
  &:hover {
    z-index: 101;
    p {
      background-color: transparent;
      border: 1px solid #fff;
    }
    a {
      &:nth-child(1) {
        transform: translate(-35px, -50px);
      }
      &:nth-child(2) {
        transform: translate(5px, -50px);
      }
      &:nth-child(3) {
        transform: translate(-35px, 25px);
      }
      &:nth-child(4) {
        transform: translate(5px, 25px);
      }
    }
  }
  p {
    width: 48px;
    height: 48px;
    background-color: #fff;
    color: #000;
    border: 1px solid transparent;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
    transition: all 0.5s ease;
    &:hover {
      background-color: transparent;
      border: 1px solid #fff;
      transition: all 0.5s ease;
    }
  }
`

const TwSocialIconHolder = styled.div`
  position: relative;
  z-index: 100;
  transition: all 0.5s ease;
  &:hover {
    z-index: 101;
    p {
      background-color: transparent;
      border: 1px solid #fff;
    }
    a {
      &:nth-child(1) {
        transform: translate(-15px, -55px);
      }
      &:nth-child(2) {
        transform: translate(-15px, 25px);
      }
    }
  }
  p {
    width: 48px;
    height: 48px;
    background-color: #fff;
    color: #000;
    border: 1px solid transparent;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
    transition: all 0.5s ease;
    &:hover {
      background-color: transparent;
      border: 1px solid #fff;
      transition: all 0.5s ease;
    }
  }
`

const ToolTipAnchor = styled.a`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: -1;
  margin-bottom: 0;
  transition: all 0.5s ease;
`

const StyledToolTip = styled.div`
  div {
    background: rgba(0, 0, 0, .8);
    border-radius: 8px;
    color: #fff;
  }
`

const Footer = () => {
  const { t } = useTranslation()

  return (
    <FooterFrame>
      <PreFooterWrapper>
        <AboutUs>
          <h4>{t('ABOUT US')}</h4>
          <span>{t('Kripton (LPK), a native crypto-fiat token along with a full-fledged financial inclusion platform with hybrid crypto-fiat and self credit scoring, is the future of microfinance and decentralized finance. We provide financial tools to the Underdeveloped Countries in the world, giving them the opportunity to participate in building a stable financial system through Decentralized Finance and Tactical Partnerships.')}</span>
        </AboutUs>
        <Platforms>
          <div>
            <div>
              <h4>{t('PLATFORMS')}</h4>
            </div>
            <SiteLink>
              <a href="https://l-pesa.com/">l-pesa.com</a>
              <a href="https://l-pesa.in/">l-pesa.in</a>
              <a href="https://l-pesa.net/">l-pesa.net</a>
              <a href="https://ficopesa.com/">ficopesa.com</a>
              <a href="https://ico.lpesa.io/">ico.lpesa.io</a>
            </SiteLink>
          </div>
        </Platforms>
        <FooterLogo>
          <img src={Logo} alt="" />
        </FooterLogo>
      </PreFooterWrapper>

      <SocialFooterWrapper>
        <SocialFooter>
          <h4>{t('SOCIAL MEDIA LINK')}</h4>
          <div>
            <FbSocialIconHolder>
              <p>
                <svg width="15" height="30" viewBox="0 0 15 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.0806 10V7.01613C10.0806 5.64516 10.4032 5 12.4194 5H15V0H10.6452C5.32258 0 3.54839 2.41935 3.54839 6.6129V9.91936H0V14.9194H3.54839V30H10V15H14.4355L15 10H10.0806Z" fill="#3C66C4"/>
                </svg>
              </p>
              <div>
                <ToolTipAnchor data-tip data-for="tip1" href="#">
                  <img src="/assets/images/footerTooltip/India.png" alt="icon" />
                </ToolTipAnchor>
                <ToolTipAnchor data-tip data-for="tip2" href="https://business.facebook.com/lpesacareske">
                  <img src="/assets/images/footerTooltip/Kenya.png" alt="icon" />
                </ToolTipAnchor>
                <ToolTipAnchor data-tip data-for="tip3" href="https://business.facebook.com/lpesaugx">
                  <img src="/assets/images/footerTooltip/Uganda.png" alt="icon" />
                </ToolTipAnchor>
                <ToolTipAnchor data-tip data-for="tip4" href="https://business.facebook.com/lpesatzs">
                  <img src="/assets/images/footerTooltip/Tanzania.png" alt="icon" />
                </ToolTipAnchor>
                <StyledToolTip>
                  <ReactTooltip id="tip1" place="top" effect="solid">
                    Inida
                  </ReactTooltip>
                  <ReactTooltip id="tip2" place="top" effect="solid">
                    Kenya
                  </ReactTooltip>
                  <ReactTooltip id="tip3" place="top" effect="solid">
                    Uganda
                  </ReactTooltip>
                  <ReactTooltip id="tip4" place="top" effect="solid">
                    Tanzania
                  </ReactTooltip>
                </StyledToolTip>
              </div>
            </FbSocialIconHolder>
            <TwSocialIconHolder>
              <p>
                <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M34.4839 9.83186C33.302 10.3572 32.03 10.7116 30.6953 10.8702C32.0581 10.0544 33.1029 8.76219 33.5957 7.22066C32.3211 7.97707 30.9101 8.52594 29.407 8.82223C28.2042 7.54045 26.4897 6.73901 24.5925 6.73901C20.9502 6.73901 17.997 9.6922 17.997 13.3352C17.997 13.8515 18.0551 14.3546 18.168 14.8383C12.6858 14.5628 7.82496 11.9373 4.57156 7.94639C4.00376 8.92013 3.67875 10.0531 3.67875 11.2631C3.67875 13.5512 4.84305 15.5705 6.61301 16.7531C5.53224 16.7185 4.51478 16.4216 3.62523 15.9275C3.62458 15.9549 3.62458 15.983 3.62458 16.011C3.62458 19.2064 5.89837 21.8717 8.91617 22.4787C8.36273 22.6288 7.77992 22.7097 7.17819 22.7097C6.75267 22.7097 6.33955 22.6686 5.93687 22.5909C6.77682 25.2113 9.21246 27.1189 12.0984 27.1718C9.84095 28.9411 6.99741 29.9958 3.90652 29.9958C3.37462 29.9958 2.84924 29.9644 2.33301 29.9031C5.25291 31.7755 8.71972 32.8667 12.4443 32.8667C24.5775 32.8667 31.2116 22.8161 31.2116 14.0995C31.2116 13.8136 31.2057 13.5284 31.1933 13.2452C32.4816 12.3171 33.6002 11.1548 34.4839 9.83186Z" fill="#00ABF1"/>
                </svg>
              </p>
              <div>
                <ToolTipAnchor data-tip data-for="tip5" href="#">
                  <img src="/assets/images/footerTooltip/lpk_kripton_logo_2.png" alt="icon" />
                </ToolTipAnchor>
                <ToolTipAnchor data-tip data-for="tip6" href="https://business.facebook.com/lpesacareske">
                  <img src="/assets/images/footerTooltip/l-pesa_logo.png" alt="icon" />
                </ToolTipAnchor>
                <StyledToolTip>
                  <ReactTooltip id="tip5" place="top" effect="solid">
                    Kripton
                  </ReactTooltip>
                  <ReactTooltip id="tip6" place="top" effect="solid">
                    L-PESA
                  </ReactTooltip>
                </StyledToolTip>
              </div>
            </TwSocialIconHolder>
            {/* <SocialLinkButton href="https://facebook.com">
              <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M34.4839 9.83186C33.302 10.3572 32.03 10.7116 30.6953 10.8702C32.0581 10.0544 33.1029 8.76219 33.5957 7.22066C32.3211 7.97707 30.9101 8.52594 29.407 8.82223C28.2042 7.54045 26.4897 6.73901 24.5925 6.73901C20.9502 6.73901 17.997 9.6922 17.997 13.3352C17.997 13.8515 18.0551 14.3546 18.168 14.8383C12.6858 14.5628 7.82496 11.9373 4.57156 7.94639C4.00376 8.92013 3.67875 10.0531 3.67875 11.2631C3.67875 13.5512 4.84305 15.5705 6.61301 16.7531C5.53224 16.7185 4.51478 16.4216 3.62523 15.9275C3.62458 15.9549 3.62458 15.983 3.62458 16.011C3.62458 19.2064 5.89837 21.8717 8.91617 22.4787C8.36273 22.6288 7.77992 22.7097 7.17819 22.7097C6.75267 22.7097 6.33955 22.6686 5.93687 22.5909C6.77682 25.2113 9.21246 27.1189 12.0984 27.1718C9.84095 28.9411 6.99741 29.9958 3.90652 29.9958C3.37462 29.9958 2.84924 29.9644 2.33301 29.9031C5.25291 31.7755 8.71972 32.8667 12.4443 32.8667C24.5775 32.8667 31.2116 22.8161 31.2116 14.0995C31.2116 13.8136 31.2057 13.5284 31.1933 13.2452C32.4816 12.3171 33.6002 11.1548 34.4839 9.83186Z" fill="#00ABF1"/>
              </svg>
            </SocialLinkButton> */}
            <SocialLinkButton href="https://lpkdefi.com/#">
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_189:981)">
                  <path d="M27.5 13.125V10.625H25V13.125H22.5V15.625H25V18.125H27.5V15.625H30V13.125H27.5Z" fill="#FA6D62"/>
                  <path d="M10.0002 13.125V16.875H15.9322C15.5164 18.1659 14.69 19.2854 13.5789 20.0631C12.4678 20.8407 11.1329 21.2338 9.77766 21.1824C8.42244 21.131 7.12116 20.638 6.07212 19.7785C5.02308 18.919 4.28379 17.7401 3.96691 16.4214C3.65002 15.1027 3.77292 13.7166 4.31686 12.4743C4.86081 11.232 5.79598 10.2015 6.97989 9.53997C8.16379 8.87842 9.5315 8.62205 10.8746 8.80991C12.2177 8.99778 13.4626 9.61958 14.4196 10.5806L17.0713 7.9289C15.3694 6.21692 13.1094 5.17306 10.7026 4.98738C8.29585 4.80169 5.90243 5.48655 3.95816 6.91723C2.01389 8.34792 0.64809 10.4293 0.109446 12.7823C-0.429198 15.1354 -0.104861 17.6037 1.0234 19.7377C2.15167 21.8717 4.00881 23.5296 6.25669 24.4094C8.50457 25.2892 10.9937 25.3325 13.2708 24.5313C15.5479 23.7302 17.4615 22.1379 18.6633 20.0444C19.865 17.9508 20.275 15.4953 19.8184 13.125H10.0002Z" fill="#FA6D62"/>
                </g>
                <defs>
                  <clipPath id="clip0_189:981">
                    <rect width="30" height="30" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </SocialLinkButton>
            <SocialLinkButton href="https://lpkdefi.com/#">
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_189:986)">
                  <path d="M25.4566 6.75164C25.1576 5.63293 24.2767 4.75203 23.158 4.45308C21.1302 3.90967 12.9999 3.90967 12.9999 3.90967C12.9999 3.90967 4.86957 3.90967 2.84172 4.45308C1.72326 4.75203 0.842156 5.63293 0.543156 6.75164C0 8.77923 0 13.0097 0 13.0097C0 13.0097 0 17.2402 0.543156 19.2676C0.842156 20.3863 1.72326 21.2674 2.84172 21.5664C4.86957 22.1096 12.9999 22.1096 12.9999 22.1096C12.9999 22.1096 21.1302 22.1096 23.158 21.5664C24.2767 21.2674 25.1576 20.3863 25.4566 19.2676C26 17.2402 26 13.0097 26 13.0097C26 13.0097 26 8.77923 25.4566 6.75164Z" fill="#ED1F24"/>
                  <path d="M10.3994 16.9146L17.1542 13.0146L10.3994 9.1145V16.9146Z" fill="white"/>
                </g>
                <defs>
                  <clipPath id="clip0_189:986">
                    <rect width="26" height="26" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </SocialLinkButton>
            <SocialLinkButton href="https://lpkdefi.com/#">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M23.1532 6.52684C23.1532 7.45478 22.4009 8.20684 21.4732 8.20684C20.5454 8.20684 19.7932 7.45478 19.7932 6.52684C19.7932 5.59891 20.5454 4.84684 21.4732 4.84684C22.4011 4.84684 23.1532 5.59891 23.1532 6.52684ZM14 18.6666C11.4227 18.6666 9.33341 16.5773 9.33341 14C9.33341 11.4227 11.4227 9.33341 14 9.33341C16.5773 9.33341 18.6666 11.4227 18.6666 14C18.6666 16.5773 16.5773 18.6666 14 18.6666ZM14 6.81078C10.0295 6.81078 6.81078 10.0295 6.81078 14C6.81078 17.9705 10.0295 21.1892 14 21.1892C17.9705 21.1892 21.1892 17.9705 21.1892 14C21.1892 10.0295 17.9705 6.81078 14 6.81078ZM14 2.52262C17.7382 2.52262 18.181 2.53684 19.6571 2.60422C21.0221 2.66656 21.7634 2.8945 22.2567 3.08634C22.9101 3.34031 23.3765 3.64372 23.8665 4.13372C24.3565 4.6235 24.6599 5.08988 24.9139 5.7435C25.1055 6.23678 25.3337 6.97813 25.396 8.34312C25.4634 9.81947 25.4776 10.2622 25.4776 14.0004C25.4776 17.7387 25.4634 18.1814 25.396 19.6575C25.3337 21.0225 25.1057 21.7639 24.9139 22.2572C24.6599 22.9106 24.3565 23.3769 23.8665 23.8669C23.3767 24.3569 22.9103 24.6603 22.2567 24.9143C21.7634 25.1059 21.0221 25.3341 19.6571 25.3964C18.181 25.4638 17.7382 25.478 14 25.478C10.2616 25.478 9.81881 25.4638 8.34269 25.3964C6.97769 25.3341 6.23634 25.1062 5.74306 24.9143C5.08966 24.6603 4.62328 24.3569 4.13328 23.8669C3.6435 23.3772 3.33987 22.9108 3.08591 22.2572C2.89428 21.7639 2.66613 21.0225 2.60378 19.6575C2.53641 18.1812 2.52219 17.7384 2.52219 14.0004C2.52219 10.2622 2.53641 9.81947 2.60378 8.34312C2.66613 6.97813 2.89406 6.23678 3.08591 5.7435C3.33987 5.09009 3.64328 4.62372 4.13328 4.13372C4.62306 3.64372 5.08944 3.34031 5.74306 3.08634C6.23634 2.89472 6.97769 2.66656 8.34269 2.60422C9.81903 2.53684 10.2618 2.52262 14 2.52262ZM14 0C10.1979 0 9.72103 0.0161875 8.22784 0.0842187C6.73772 0.15225 5.71987 0.388937 4.82956 0.735C3.90884 1.09266 3.12812 1.5715 2.34981 2.34981C1.5715 3.12812 1.09266 3.90884 0.735 4.82956C0.388937 5.72009 0.15225 6.73772 0.0842187 8.22784C0.0161875 9.72103 0 10.1979 0 14C0 17.8021 0.0161875 18.279 0.0842187 19.7722C0.15225 21.2623 0.388937 22.2799 0.735 23.1704C1.09266 24.0912 1.5715 24.8719 2.34981 25.6502C3.12812 26.4285 3.90884 26.9071 4.82956 27.265C5.72009 27.6111 6.73772 27.8477 8.22784 27.9158C9.72103 27.9838 10.1979 28 14 28C17.8021 28 18.279 27.9838 19.7722 27.9158C21.2623 27.8477 22.2799 27.6111 23.1704 27.265C24.0912 26.9071 24.8719 26.4285 25.6502 25.6502C26.4285 24.8719 26.9071 24.0912 27.265 23.1704C27.6111 22.2799 27.8477 21.2623 27.9158 19.7722C27.9838 18.279 28 17.8021 28 14C28 10.1979 27.9838 9.72103 27.9158 8.22784C27.8477 6.73772 27.6111 5.72009 27.265 4.82956C26.9071 3.90884 26.4285 3.12812 25.6502 2.34981C24.8719 1.5715 24.0912 1.09288 23.1704 0.735C22.2799 0.388937 21.2623 0.15225 19.7722 0.0842187C18.279 0.0161875 17.8021 0 14 0Z" fill="url(#paint0_radial_189:36)"/>
                <defs>
                  <radialGradient id="paint0_radial_189:36" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(4.18055 28.0972) scale(35.777)">
                    <stop stopColor="#FFB140"/>
                    <stop offset="0.2559" stopColor="#FF5445"/>
                    <stop offset="0.599" stopColor="#FC2B82"/>
                    <stop offset="1" stopColor="#8E40B7"/>
                  </radialGradient>
                </defs>
              </svg>
            </SocialLinkButton>
            <SocialLinkButton href="https://lpkdefi.com/#">
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M28.3997 5.75601L24.3323 24.9379C24.0255 26.2917 23.2252 26.6285 22.0879 25.9909L15.8906 21.424L12.9003 24.3001C12.5695 24.631 12.2926 24.9079 11.6549 24.9079L12.1 18.596L23.5862 8.21689C24.0856 7.7717 23.478 7.52496 22.81 7.97021L8.61032 16.9113L2.49717 14.9979C1.16745 14.5828 1.14342 13.6682 2.77391 13.0304L26.6849 3.81861C27.7919 3.40348 28.7607 4.06523 28.3997 5.75601Z" fill="#20A0E1"/>
              </svg>
            </SocialLinkButton>
          </div>
        </SocialFooter>
      </SocialFooterWrapper>

      <CopyRight>
        <span>&copy; {t('Copyright')} 2021 www.lpkdefi.com. {t('All Rights Reserved.')}</span>
      </CopyRight>
    </FooterFrame>
  )
}

export default Footer
