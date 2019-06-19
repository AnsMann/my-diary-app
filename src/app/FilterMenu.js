import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Menu = styled.section`
  background: white;
  border: solid 1px #007fbf;
  border-radius: 10px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.5);
  height: 200px;
  padding: 5px 0;
  position: relative;
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
const EmojiOption = styled.li`
  list-style: none;
  font-size: 1.2rem;
  margin-bottom: 5px;
`

export function FilterMenu({ onFilterbuttonClick, filter }) {
  const dayrating = [
    { emoji: '😃', label: 'good day' },
    { emoji: '😶', label: 'average day' },
    { emoji: '😔', label: 'bad day' },
  ]

  const allFilter = [
    {
      title: 'Shared',
    },
    {
      title: 'Not shared',
    },
    {
      title: 'In database',
    },
    {
      title: 'Not in Database',
    },
  ]

  return (
    <Menu>
      <ul>
        {filter !== 'all' && (
          <MenuOption onClick={() => onFilterbuttonClick('all')}>
            Reset filter
          </MenuOption>
        )}
        {allFilter.map(filter => (
          <MenuOption
            key={filter.title}
            onClick={() => onFilterbuttonClick(filter.title)}
          >
            {filter.title}
          </MenuOption>
        ))}
        <MenuOption>Dayrating</MenuOption>
        {dayrating.map(rating => (
          <EmojiOption
            key={rating.label}
            onClick={() => onFilterbuttonClick(rating.emoji)}
          >
            <span role="img" aria-label={rating.label}>
              {rating.emoji}
            </span>
          </EmojiOption>
        ))}
      </ul>
    </Menu>
  )
}

FilterMenu.propTypes = {
  filter: PropTypes.string.isRequired,
  onFilterbuttonClick: PropTypes.func.isRequired,
}
