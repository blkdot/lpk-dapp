import React from 'react'
import styled from 'styled-components'
import HeroBg from '../../assets/images/hero-bg.jpg'
import CircleBg from '../../assets/images/circle_bg.png'

export const SideContentWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.md} {
    margin-left: 1rem;
  };
  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 0;
  };
`
export const StyledHeroWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  z-index: 1;
  border-radius: 8px;
  background: url(${HeroBg}) no-repeat center;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 12px 0 0 0;
    width: calc(100%);
    position: relative;
    height: 700px;
  };
  ${({ theme }) => theme.mediaQueries.md} {
    width: 100%;
    height: 700px;
  };
  ${({ theme }) => theme.mediaQueries.xl} {
    width: 100%;
    height: 700px;
  };
  `
export const HeroImageWrapper = styled.div`
  display: flex;

  img {
    padding-top: 4rem;
    ${({ theme }) => theme.mediaQueries.xs} {
      padding: 1rem;
    };
    ${({ theme }) => theme.mediaQueries.sm} {
      padding: 1rem;
    };
    ${({ theme }) => theme.mediaQueries.lg} {
      padding: 2rem;
    };
  }
`
export const LpkOtherLink = styled.div`
  display: flex;
  margin-left: 2rem;
  margin-right: 2rem;
  padding: 10px;
  width: 100%;
  background: ${({ theme }) => (theme.isDark) ? '#27618b' : '#1B435F'};
  border-radius: 8px;
  padding: 30px;
  margin-top: 20px;
  font-size: 32px;
  font-weight: 600;
  color: #4AFEFD;
  align-items: center; 
  justify-content: space-between;
  
  div {
    display: flex;
    align-items: center;
  }
  span {
    padding-left: 0.5rem;
  }
`
export const SelectPoolWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  height: 100%;
  ${({ theme }) => theme.mediaQueries.lg} {
    padding: 4rem;
    height: 450px;
  };
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 3rem;
  };
  ${({ theme }) => theme.mediaQueries.xs} {
    padding: 3rem;
  };
  `
export const PoolBuuton = styled.button`
  border-radius: 50%;
  background: #0C1F2C;
  padding: 0;
  border: 4px solid #16FFFF;
  cursor: pointer;
  :hover {
    background: #1B435F;
  }
  ${({ theme }) => theme.mediaQueries.xs} {
    width: 60px;
    height: 60px;
  };
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 60px;
    height: 60px;
  };
  ${({ theme }) => theme.mediaQueries.lg} {
    width: 80px;
    height: 80px;
  };

  img {
    ${({ theme }) => theme.mediaQueries.xs} {
      width: 36px;
      height: 36px;
    };
    ${({ theme }) => theme.mediaQueries.sm} {
      width: 36px;
      height: 36px;
    };
    ${({ theme }) => theme.mediaQueries.lg} {
      width: 44px;
      height: 44px;
    };
  }

`
export const LogoImage = styled.img`
  position: absolute;
  z-index: 10;
  ${({ theme }) => theme.mediaQueries.xs} {
    width: 80px;
    bottom: 40px;
  };
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 80px;
    bottom: 128px;
  };
  ${({ theme }) => theme.mediaQueries.lg} {
    width: 110px;
    bottom: 164px;
  };
`
export const CircleContainer = styled.ul`
  position: relative;

  .swap-active {
    box-shadow: 0px 0px 20px #16ffff;
    background: #1b435f;
  }
  
  border-radius: 50%;
  padding: 0;
  list-style: none;
  margin: 0px;
  background: url(${CircleBg}) no-repeat center/75%;
  background-position: 47% 48%;

  > * {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    

    ${({ theme }) => theme.mediaQueries.xs} {
      margin: -2em;
      width: 4em;
      height: 4em;
    };

    ${({ theme }) => theme.mediaQueries.sm} {
      margin: -2em;
      width: 4em;
      height: 4em;
    };

    ${({ theme }) => theme.mediaQueries.lg} {
      margin: -42px;
      width: 5em;
      height: 5em;
    };
  }
  
  ${({ theme }) => theme.mediaQueries.xs} {
    width: 16em;
    height: 16em;
    > *:nth-of-type(1) {
      transform: rotate(0deg) translate(8em) rotate(0deg);
    }
    > *:nth-of-type(2) {
      transform: rotate(45deg) translate(8em) rotate(-45deg);
    }
    > *:nth-of-type(3) {
      transform: rotate(90deg) translate(8em) rotate(-90deg);
    }
    > *:nth-of-type(4) {
      transform: rotate(135deg) translate(8em) rotate(-135deg);
    }
    > *:nth-of-type(5) {
      transform: rotate(180deg) translate(8em) rotate(-180deg);
    }
    > *:nth-of-type(6) {
      transform: rotate(225deg) translate(8em) rotate(-225deg);
    }
    > *:nth-of-type(7) {
      transform: rotate(270deg) translate(8em) rotate(-270deg);
    }
    > *:nth-of-type(8) {
      transform: rotate(315deg) translate(8em) rotate(-315deg);
    }
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 16em;
    height: 16em;
    > *:nth-of-type(1) {
      transform: rotate(0deg) translate(8em) rotate(0deg);
    }
    > *:nth-of-type(2) {
      transform: rotate(45deg) translate(8em) rotate(-45deg);
    }
    > *:nth-of-type(3) {
      transform: rotate(90deg) translate(8em) rotate(-90deg);
    }
    > *:nth-of-type(4) {
      transform: rotate(135deg) translate(8em) rotate(-135deg);
    }
    > *:nth-of-type(5) {
      transform: rotate(180deg) translate(8em) rotate(-180deg);
    }
    > *:nth-of-type(6) {
      transform: rotate(225deg) translate(8em) rotate(-225deg);
    }
    > *:nth-of-type(7) {
      transform: rotate(270deg) translate(8em) rotate(-270deg);
    }
    > *:nth-of-type(8) {
      transform: rotate(315deg) translate(8em) rotate(-315deg);
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    width: 20em;
    height: 20em;
    > *:nth-of-type(1) {
      transform: rotate(0deg) translate(10em) rotate(0deg);
    }
    > *:nth-of-type(2) {
      transform: rotate(45deg) translate(10em) rotate(-45deg);
    }
    > *:nth-of-type(3) {
      transform: rotate(90deg) translate(10em) rotate(-90deg);
    }
    > *:nth-of-type(4) {
      transform: rotate(135deg) translate(10em) rotate(-135deg);
    }
    > *:nth-of-type(5) {
      transform: rotate(180deg) translate(10em) rotate(-180deg);
    }
    > *:nth-of-type(6) {
      transform: rotate(225deg) translate(10em) rotate(-225deg);
    }
    > *:nth-of-type(7) {
      transform: rotate(270deg) translate(10em) rotate(-270deg);
    }
    > *:nth-of-type(8) {
      transform: rotate(315deg) translate(10em) rotate(-315deg);
    }
  }
`
export const StyledTradingInformationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  color: ${({ theme }) => (theme.isDark) ? '#ffffff' : '#000000'};
  text-align: center;  
`
export const TradingInfoTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-size: 16px;
`
export const TradingInfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  font-weight: 500; 
  color: #4afefd;
  margin: 15px;
  background: transparent;
  border: 1px solid #4afefd;
  border-radius: 4px;
  padding: 1rem;
  backdrop-filter: blur(5px);
}
`
export const TradingInfoRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 5px;
`
export const TradingMoreInfoButton = styled.a`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 15px;
  cursor: pointer;

  :hover {
    color: ${({ theme }) => (theme.isDark) ? '#27618b': '#2aa1a0' };
  }
`
