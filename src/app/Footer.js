import React from 'react'
import styled from 'styled-components'
import { NavLink as RouterLink } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faPenFancy } from '@fortawesome/free-solid-svg-icons'

library.add(faBook, faPenFancy)

const NavBar = styled.nav`
  align-items: center;
  background: #007fbf;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  color: #ffffff;
  display: flex;
  font-size: 2rem;
  justify-content: space-evenly;
  position: relative;
`

const NavLink = styled(RouterLink)`
  align-items: center;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  color: #ffffff;
  display: flex;
  height: 70px;
  justify-content: center;
  text-decoration: none;
  width: 65px;
  z-index: 50;

  &.active {
    background-color: white;
    border: solid 1px #979797;
    bottom: 20px;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.5);
    color: #007fbf;
    height: 95px;
    position: relative;
  }
`
export function Footer() {
  return (
    <NavBar>
      <NavLink exact to="/">
        <FontAwesomeIcon icon="book" />
      </NavLink>
      <NavLink to="/create">
        <FontAwesomeIcon icon="pen-fancy" />
      </NavLink>
    </NavBar>
  )
}
