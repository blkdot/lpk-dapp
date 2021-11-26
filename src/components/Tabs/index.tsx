import React, { ReactElement, useState } from "react"
import styled from 'styled-components'
import TabTitle from "./TabTitle"

const StyledFlex = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  max-width: 520px;
`

const Wrapper = styled.ul`
  text-align: center;
  outline: none;
  text-decoration: none;
  -webkit-box-pack: center;
  justify-content: center;
  position: relative;
  z-index: 0;
  font-size: 1.5rem;
  font-weight: 500;
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  -webkit-box-ali	gn: center;
  align-items: center;
  height: 50px;
  border-radius: 8px 8px 0px 0px;
  // border: 1px solid ${({ theme }) => (theme.isDark) ? '#152b39' : '#CBD8E1'};
  border-bottom: none;

  cursor: pointer;
  user-select: none;
  background-color: rgb(105 120 131 / 10%);
  backdrop-filter: blur(5px);
  color: rgb(242, 244, 248);
  padding: 0px;
`;

type Props = {
  children: ReactElement[]
}

const Tabs: React.FC<Props> = ({ children }) => {
  const [selectedTab, setSelectedTab] = useState(0)

  return (
    <StyledFlex>
      <Wrapper>
        {children.map((item, index) => (
          <TabTitle
            title={item.props.title}
            index={index}
            active={(selectedTab === index)}
            setSelectedTab={setSelectedTab}
          />
        ))}
      </Wrapper>
      {children[selectedTab]}
    </StyledFlex>
  )
}

export default Tabs