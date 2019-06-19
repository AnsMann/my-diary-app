import React, { useState } from 'react'
import styled from 'styled-components'
import OutsideClickHandler from 'react-outside-click-handler'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { FilterMenu } from './FilterMenu'
import PropTypes from 'prop-types'

library.add(faFilter)

const Filterbutton = styled.button`
  color: #002f47;
  font-size: 1.5rem;
  position: relative;
`

const MenuContainer = styled.section`
  top: 45px;
  width: 150px;
  z-index: 15;
  right: 0;
  position: absolute;
`

export function FilterEntries({ onFilterbuttonClick, filter }) {
  const [isFilterMenuVisible, setIsFilterMenuVisible] = useState(false)

  function resetFilterMenuVisible() {
    setIsFilterMenuVisible(false)
  }

  return (
    <OutsideClickHandler onOutsideClick={() => resetFilterMenuVisible()}>
      <Filterbutton
        onClick={() => setIsFilterMenuVisible(!isFilterMenuVisible)}
      >
        <FontAwesomeIcon icon={faFilter} />
        {isFilterMenuVisible && (
          <MenuContainer>
            <FilterMenu
              onFilterbuttonClick={onFilterbuttonClick}
              filter={filter}
            />
          </MenuContainer>
        )}
      </Filterbutton>
    </OutsideClickHandler>
  )
}

FilterEntries.propTypes = {
  filter: PropTypes.string.isRequired,
  onFilterbuttonClick: PropTypes.func.isRequired,
}
