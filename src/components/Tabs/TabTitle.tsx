import React, { useCallback, useState } from "react"
import styled from 'styled-components'

type Props = {
  title: string
  index: number
  active: boolean
  setSelectedTab: (index: number) => void
}

const TabTitle: React.FC<Props> = ({ title, setSelectedTab, index, active }) => {

  const TabTitleWrapper = styled.li`
    display: flex;
    width: 100%;
    
    .tab-active {
      background:  ${({ theme }) => (theme.isDark) ? '#152b39' : '#FFFFFF'};
      color: ${({ theme }) => (theme.isDark) ? '#FFFFFF' : '#000000'};
      border-bottom: 4px solid ${({ theme }) => (theme.isDark) ? '#27618b' : '#27618b'};
    }
  `
  const TabTitleButton = styled.div`
    height: 50px;
    font-size: 18px;
    border-radius: 8px 8px 0px 0px;
    width: 100%;
    color:  rgb(159 159 159);
    align-items: center;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    justify-content: center;

    :hover {
      color: rgb(159 159 159);
    }
    
  `

  const onClick = useCallback(() => {
    setSelectedTab(index)
  }, [setSelectedTab, index])

  return (
    <TabTitleWrapper>
      <TabTitleButton className={(active ? 'tab-active' : '')} onClick={onClick}>{title}</TabTitleButton>
    </TabTitleWrapper>
  )
}

export default TabTitle