import React from 'react'
import styled from 'styled-components'

const Navbar = styled.nav`
  align-items: center;
  background: #007fbf;
  border-radius: 10px;
  color: #ffffff;
  display: flex;
  font-size: 2rem;
  justify-content: center;
  position: relative;
`

const NavLink = styled.a`
  align-items: center;
  background-color: white;
  border: solid 1px #979797;
  border-radius: 20px;
  bottom: 20px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.5);
  display: flex;
  height: 95px;
  justify-content: center;
  position: relative;
  text-decoration: none;
  width: 65px;
`

export function Footer() {
  return (
    <Navbar>
      <NavLink href="/">
        <img
          src="./icons/listentries-active.png"
          alt="list diary entries navigation icon"
        />
      </NavLink>
    </Navbar>
  )
}
