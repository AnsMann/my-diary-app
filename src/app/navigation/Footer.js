import React from 'react'
import styled from 'styled-components'
import { Navigation } from './Navigation'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBook, faPenFancy, faCogs } from '@fortawesome/free-solid-svg-icons'

library.add(faBook, faPenFancy, faCogs)

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

export function Footer() {
  const nav = [
    {
      linkTo: '/',
      icon: 'book',
    },
    {
      linkTo: '/create',
      icon: 'pen-fancy',
    },
    {
      linkTo: '/settings',
      icon: 'cogs',
    },
  ]
  return (
    <NavBar>
      {nav.map(obj => (
        <Navigation key={obj.icon} linkTo={obj.linkTo} icon={obj.icon} />
      ))}
    </NavBar>
  )
}
