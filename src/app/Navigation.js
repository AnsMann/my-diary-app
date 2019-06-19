import React from 'react'
import styled from 'styled-components'
import { NavLink as RouterLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faPenFancy, faCogs } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import PropTypes from 'prop-types'

library.add(faBook, faPenFancy, faCogs)

const NavLink = styled(RouterLink)`
  align-items: center;
  background-color: hsl(200, 65%, 55%);
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

export function Navigation({ linkTo, icon }) {
  return (
    <NavLink exact to={linkTo}>
      <FontAwesomeIcon icon={icon} />
    </NavLink>
  )
}

Navigation.propTypes = {
  linkTo: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
}
