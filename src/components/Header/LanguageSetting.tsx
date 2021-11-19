import React from 'react'
import styled from 'styled-components'
import { languageList } from 'config/localization/languages'
import { useTranslation } from 'contexts/Localization'

const LangSettingWrapper = styled.ul`
  margin-right: 8px;
  padding:0;
  list-style: none;
  position: relative;

  .lang-active {
    background: #bce3ff;
  }
}
`
const LangSettingContent = styled.li`
  cursor: pointer;
  color: #fff;
  background: #1B435F;
  padding: 10px 9px;
  border-radius: 8px;
  align-items: center;
  vertical-align: middle;
  display: flex;

  span {
    font-weight: 600;
    line-height: 20px;
    font-size: 20px;
    color: rgb(74,254,253);
  }

  :hover {
    background: #27618b;
    
    ul {
      position: absolute;
      top:42px;
      right:0px;
      display: block;
      background: #fff;
      padding-top: 0px;
      z-index: 20;
      border-radius:5px;
      box-shadow: 0px 0px 20px rgba(0,0,0,0.2);
      height: 300px;
      overflow: auto;
    }
    
    .triangle {
      position: absolute;
      top: 36px;
      right: 5x;
      z-index:10;
      height: 14px;
      overflow:hidden;
      width: 30px;
      background: transparent;

      :after {
        content: '';
        display: block;
        z-index: 20;
        width: 15px;
        transform: rotate(45deg) translateY(0px) translatex(10px);
        height: 15px;
        background: #fff;
        border-radius:2px 0px 0px 0px;
        box-shadow: 0px 0px 20px rgba(0,0,0,0.2);
      }
    }
  }
`
const LangSettingItemWapper = styled.ul`
  display: none;
`
const LangSettingItem = styled.li`
  position: relative;
  text-align: left;
  background: transparent;
  padding: 10px 15px;
  z-index: 2;
  font-size: 15px;
  color: #3c3c3c; 
  list-style: none;
  font-weight: 600;

  :hover {
    background: #bce3ff;
  }
  span {
    padding-left: 5px;
    font-weight: 600;
    :hover {
      color: #27618b;
    }
  }
`
const LanguageSetting = () => {

  const { currentLanguage, setLanguage, t } = useTranslation()

  return (
    <LangSettingWrapper>
      <LangSettingContent>
        <span><i className="bi bi-globe2" /></span>
        <LangSettingItemWapper>
          {languageList.map((item, index) => {     
            return (
                <LangSettingItem 
                  className={(currentLanguage.code === item.code) ? 'lang-active' : ''}
                  onClick={() => {
                    setLanguage(item)
                  }}
                >
                  {item.language}
                </LangSettingItem>
              ) 
            })}
        </LangSettingItemWapper>
      </LangSettingContent>
    </LangSettingWrapper>
  )
}

export default LanguageSetting
