import React from 'react'
import styled from 'styled-components'

const Menu = styled.section`
  background: white;
  border: solid 1px #007fbf;
  border-radius: 10px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.5);
  height: 150px;
  position: absolute;
  right: 50px;
  top: -26px;
  width: 200px;
  z-index: 10;
  &:after {
    border-color: transparent transparent transparent #007fbf;
    border-style: solid;
    border-width: 10px 0px 10px 15px;
    content: '';
    font-size: 0.5rem;
    height: 0px;
    position: absolute;
    right: -15px;
    top: 30px;
    width: 0px;
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
      <MenuOption onClick={() => history.push(`/entries/${entryId}/share`)}>
        Share via slack
      </MenuOption>
      <MenuOption onClick={() => onDeleteMenuClick()}>Delete</MenuOption>
      <MenuOption onClick={() => history.push(`/entries/${entryId}/edit`)}>
        Edit
      </MenuOption>
    </Menu>
  )
}
