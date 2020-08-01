import React from 'react'
import styled from 'styled-components'

const HeaderContainer = styled.div`
  position: absolute;
  width: 100vw;
  height: 5rem;
`

const Header = (props) => {
  return (
    <HeaderContainer>
      <div className="d-flex align-items-center justify-content-center h-100">
        <h1>React Apollo Boilerplate</h1>
      </div>
    </HeaderContainer>
  )
}

export default Header
