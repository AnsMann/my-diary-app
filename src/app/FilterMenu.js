import React, { useState } from 'react'
import styled from 'styled-components'

const Menu = styled.section`
  background: white;
  border: solid 1px #007fbf;
  border-radius: 10px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.5);
  height: 200px;
  left: -2px;
  overflow: scroll;
  position: absolute;
  padding: 5px 0;
  top: 30px;
  width: 150px;
  z-index: 15;
  &:after {
    border-color: transparent transparent #007fbf transparent;
    border-style: solid;
    border-width: 0px 10px 15px 10px;
    content: '';
    font-size: 0.5rem;
    height: 0px;
    left: 10px;
    position: absolute;
    top: -15px;
    width: 0px;
  }
`

const MenuOption = styled.li`
  list-style: none;
  padding: 15px;
  color: #007fbf;
  font-weight: bold;
  font-size: 1.2rem;
`
const EmojiOption = styled.li`
  list-style: none;
  font-size: 1.2rem;
  margin-bottom: 5px;
`

export function Filtermenu({ onFilterbuttonClick, filter }) {
  return (
    <Menu>
      {filter !== 'all' && (
        <MenuOption onClick={() => onFilterbuttonClick('all')}>
          reset filter
        </MenuOption>
      )}
      <MenuOption onClick={() => onFilterbuttonClick('shared')}>
        shared
      </MenuOption>
      <MenuOption onClick={() => onFilterbuttonClick('not shared')}>
        not shared
      </MenuOption>
      <MenuOption>Dayrating</MenuOption>
      <EmojiOption onClick={() => onFilterbuttonClick('😃')}>
        <span>😃</span>
      </EmojiOption>
      <EmojiOption onClick={() => onFilterbuttonClick('😶')}>
        <span>😶</span>
      </EmojiOption>
      <EmojiOption onClick={() => onFilterbuttonClick('😔')}>
        <span>😔</span>
      </EmojiOption>
    </Menu>
  )
}
