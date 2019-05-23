import React from 'react'
import styled from 'styled-components'

const StyledHeader = styled.header`
  align-items: center;
  background: #007fbf;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  color: #ffffff;
  display: flex;
  font-size: 2rem;
  justify-content: center;
`

export function Header({ title }) {
  return <StyledHeader>{title}</StyledHeader>
}
