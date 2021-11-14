import React, { useState } from 'react'
import styled, {keyframes} from 'styled-components'

import SwapList from 'config/constants/tokenLists/swap.json'

import HeroBg from '../../assets/images/hero-bg.jpg'
import Parachute1 from '../../assets/images/parachute_1.png'
import Parachute2 from '../../assets/images/parachute_2.png'
import LogoNoText from '../../assets/images/logo_no_text.png'
import CircleBg from '../../assets/images/circle_bg.png'
import KriptonCrystal from '../../assets/images/KriptonCrystal.png'

const SideContentWrapper = styled.div`
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
const StyledHeroWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  z-index: 1;
  border-radius: 8px;
  background: url(${HeroBg}) no-repeat center;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 12px 0 0 0;
    width: calc(100%);
    position: relative;
  };
`

const HeroImageWrapper = styled.div`
  display: flex;

  img {
    padding: 2rem;
    padding-top: 4rem;
    ${({ theme }) => theme.mediaQueries.sm} {
      padding: 1rem;
    };
  }
`
const LpkOtherLink = styled.div`
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

const SelectPoolWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  height: 100%;
  padding: 4rem;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 3rem;
  };
`

const PoolBuuton = styled.button`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #0C1F2C;
  padding: 0;
  border: 4px solid #16FFFF;
  cursor: pointer;
  :hover {
    background: #1B435F;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 60px;
    height: 60px;
  };

  img {
    width: 44px;
    height: 44px;
    ${({ theme }) => theme.mediaQueries.sm} {
      width: 36px;
      height: 36px;
    };
  }

`

const LogoImage = styled.img`
  position: absolute;
  bottom: 15px;
  z-index: 10;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 80px;
    bottom: 132px;
  };
`
const rotateAnimation = (fromDegree, toDegree) => keyframes`
  from {
    transform:  rotate(${fromDegree}deg); 
  }
  to {
    transform:  rotate(${toDegree}deg); 
  }
`


const CircleContainer = styled.ul<{ index: number, fromDegree: number, toDegree: number}>`
  position: relative;
  width: 20em;
  height: 20em;
  border-radius: 50%;
  padding: 0;
  list-style: none;
  margin: 0px;
  background: url(${CircleBg}) no-repeat center/75%;
  background-position: 47% 48%;

  animation-name: ${({fromDegree, toDegree}) => rotateAnimation(fromDegree, toDegree)};
  animation-fill-mode: forwards;
  animation-duration: 5000ms;
  
  > * {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -42px;
    width: 5em;
    height: 5em;

    ${({ theme }) => theme.mediaQueries.sm} {
      margin: -2em;
      width: 4em;
      height: 4em;
    };
  }
  

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
  };
`

export default function Hero() {
  
  const [toDegree, setToDegree] = useState(0)
  const [fromDegree, setFromDegree] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)


  const switchNetwork = (index: number) => {

    setCurrentIndex(index)
    setCurrentIndex((state) => {
      console.log('currentIndex', state);
      return state;
    });

    const ctx = currentIndex - index

    if (ctx < 0){
      setToDegree(fromDegree + ctx * 45 + 360)
      setToDegree((state) => {
        console.log('ToDegree', state);
        return state;
      });
       
      setFromDegree(toDegree)
      setFromDegree((state) => {
        console.log('FromDegree', state);
        return state;
      });

    }else{
      setToDegree(fromDegree + ctx * 45)
      setToDegree((state) => {
        console.log('ToDegree', state);
        return state;
      });
      setFromDegree(toDegree)
      setFromDegree((state) => {
        console.log('FromDegree', state);
        return state;
      });
    }

    console.log("ctx", ctx)
    console.log("index", index)
  }

  const handleSwitchNetwork = (index: number) => {
    const ctx = currentIndex - index

    const toDeg = (ctx < 0) ? (fromDegree + ctx * 45 + 360) : (fromDegree + ctx * 45)

    setFromDegree(toDeg);
    
    console.log("currentIndex", currentIndex)
    console.log("index", index)
    console.log("ctx", ctx)
    console.log("fromDegree", fromDegree)
    console.log("toDeg", toDeg)
  }

  return (
    <>
      <SideContentWrapper>
        <StyledHeroWrapper className="hero">
          <HeroImageWrapper>
            <img src={Parachute1} alt="Parachute1" />
            <img src={Parachute2} alt="Parachute2"/>
          </HeroImageWrapper>

          <SelectPoolWrapper>
            <LogoImage src={KriptonCrystal} />
            <CircleContainer
              index={currentIndex}
              fromDegree={fromDegree}
              toDegree={toDegree}
            >
              {SwapList.map((swap, index) => {     
                return (
                  <li>
                    <PoolBuuton 
                      onClick={() => {
                        handleSwitchNetwork(swap.id)
                        setCurrentIndex(swap.id)
                      }}>
                      <img src={swap.icon} alt="11"/>
                    </PoolBuuton>
                  </li>
                ) 
              })}
            </CircleContainer>
          </SelectPoolWrapper>
        </StyledHeroWrapper>

        <LpkOtherLink>
          <div>
            <img src={LogoNoText} alt="LogoNoText" />
            <span>LPK Stacking</span>
          </div>
          <div>
            <svg width="20" height="36" viewBox="0 0 20 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.69824 1.30176L18.095 17.6985L1.69824 34.0952" stroke="#4AFEFD" strokeOpacity="0.3" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </LpkOtherLink>
      </SideContentWrapper>
    </>
  )
}
