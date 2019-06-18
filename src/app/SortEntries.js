import React, { useState } from 'react'
import styled from 'styled-components'
import OutsideClickHandler from 'react-outside-click-handler'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortAmountUp } from '@fortawesome/free-solid-svg-icons'
import { SortMenu } from './SortMenu'
import PropTypes from 'prop-types'

library.add(faSortAmountUp)

const Sortbutton = styled.button`
  color: #002f47;
  font-size: 1.5rem;
  margin-right: 6px;
  position: relative;
`

const MenuContainer = styled.section`
  right: 0;
  position: absolute;
  top: 45px;
  z-index: 15;
`

export function SortEntries({ onSortbuttonClick, sortBy }) {
  const [isSortMenuVisible, setIsSortMenuVisible] = useState(false)
  function resetSortMenuVisible() {
    setIsSortMenuVisible(false)
  }
  return (
    <OutsideClickHandler onOutsideClick={() => resetSortMenuVisible()}>
      <Sortbutton onClick={() => setIsSortMenuVisible(!isSortMenuVisible)}>
        <FontAwesomeIcon icon={faSortAmountUp} />
        {isSortMenuVisible && (
          <MenuContainer>
            <SortMenu onSortbuttonClick={onSortbuttonClick} sortBy={sortBy} />
          </MenuContainer>
        )}
      </Sortbutton>
    </OutsideClickHandler>
  )
}

SortEntries.propTypes = {
  sortBy: PropTypes.string.isRequired,
  onSortbuttonClick: PropTypes.func.isRequired,
}
