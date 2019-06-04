import React from 'react'
import styled from 'styled-components'

const Menu = styled.section`
  height: 150px;
  width: 200px;
  border: solid 1px #007fbf;
  border-radius: 10px;
  position: absolute;
  top: -23px;
  right: 55px;
  background: white;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.5);
  z-index: 10;
  &:after {
    position: absolute;
    right: -15px;
    top: 30px;
    content: '';
    width: 0px;
    height: 0px;
    border-style: solid;
    border-width: 10px 0px 10px 15px;
    border-color: transparent transparent transparent #007fbf;
    font-size: 0.5rem;
  }
`

const MenuOption = styled.li`
  list-style: none;
  padding: 15px;
  color: #007fbf;
  font-weight: bold;
`

export function DiaryEntryMenu({ history, entryId, onDeleteMenuClick }) {
  return (
    <Menu>
      <MenuOption onClick={() => history.push(`/cards/${entryId}/share`)}>
        Share via slack
      </MenuOption>
      <MenuOption onClick={() => onDeleteMenuClick()}>Delete</MenuOption>
    </Menu>
  )
}
