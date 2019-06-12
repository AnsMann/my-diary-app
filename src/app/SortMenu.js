import React from 'react'
import styled from 'styled-components'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLongArrowAltUp,
  faLongArrowAltDown,
} from '@fortawesome/free-solid-svg-icons'

library.add(faLongArrowAltUp, faLongArrowAltDown)

const Menu = styled.section`
  background: white;
  border: solid 1px #007fbf;
  border-radius: 10px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.5);
  height: 200px;
  right: 0;
  position: absolute;
  padding: 5px 0;
  top: 45px;
  width: 150px;
  z-index: 15;
  &:after {
    border-color: transparent transparent #007fbf transparent;
    border-style: solid;
    border-width: 0 10px 15px 10px;
    content: '';
    font-size: 0.5rem;
    height: 0;
    right: 10px;
    position: absolute;
    top: -15px;
    width: 0;
  }
  ul {
    height: 180px;
    list-style: none;
    overflow: scroll;
    padding: 0 0 10px 0;
  }
`

const MenuOption = styled.li`
  list-style: none;
  padding: 15px;
  color: #007fbf;
  font-weight: bold;
  font-size: 1rem;
  text-align: left;
`

export function SortMenu({ onSortbuttonClick, sortBy }) {
  return (
    <Menu>
      <ul>
        {sortBy !== 'all' && (
          <MenuOption onClick={() => onSortbuttonClick('all')}>
            Reset filter
          </MenuOption>
        )}
        <MenuOption onClick={() => onSortbuttonClick('Entry date up')}>
          Entry date <FontAwesomeIcon icon={faLongArrowAltUp} />
        </MenuOption>
        <MenuOption onClick={() => onSortbuttonClick('Entry date down')}>
          Entry date <FontAwesomeIcon icon={faLongArrowAltDown} />
        </MenuOption>
        <MenuOption onClick={() => onSortbuttonClick('Create date up')}>
          Create date <FontAwesomeIcon icon={faLongArrowAltUp} />
        </MenuOption>
        <MenuOption onClick={() => onSortbuttonClick('Create date down')}>
          Create date <FontAwesomeIcon icon={faLongArrowAltDown} />
        </MenuOption>
      </ul>
    </Menu>
  )
}
