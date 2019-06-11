import React, { useState } from 'react'
import styled from 'styled-components'
import OutsideClickHandler from 'react-outside-click-handler'
import { DiaryEntry } from './DiaryEntry'
import { Header } from './Header'
import { Filtermenu } from './FilterMenu'
import { filterEntries } from './utils'
import { DiaryLogo } from './DiaryLogo'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'

library.add(faFilter)

const DiaryEntriesContainer = styled.ul`
  overflow: scroll;
  padding: 20px;
`

const Filterbutton = styled.button`
  position: relative;
  font-size: 1.5rem;
  color: #002f47;
`
const Filter = styled.span`
  color: #007fbf;
  font-size: 1rem;
`

const FilterBox = styled.div`
  border-bottom: solid 1px #007fbf;
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: 1fr 0.5fr;
  align-items: center;
  margin-bottom: 25px;
`
const StyledSpan = styled.span`
  color: #002f47;
  font-size: 0.7rem;
  margin-right: 10px;
`

export function DiaryEntriesList({ diaryEntries, history, onDeleteClick }) {
  const [filter, setFilter] = useState('all')
  const [isMenuVisible, setIsMenuVisible] = useState(false)

  function handleFilterbuttonClick(filter) {
    setFilter(filter)
  }

  return (
    <>
      <Header title={'My Diary Entries'} />
      <DiaryEntriesContainer id="diary">
        <DiaryLogo />
        <FilterBox>
          <OutsideClickHandler onOutsideClick={() => setIsMenuVisible(false)}>
            <Filterbutton onClick={() => setIsMenuVisible(!isMenuVisible)}>
              <FontAwesomeIcon icon={faFilter} />
              {isMenuVisible && (
                <Filtermenu
                  onFilterbuttonClick={handleFilterbuttonClick}
                  filter={filter}
                />
              )}
            </Filterbutton>
          </OutsideClickHandler>
          {filter !== 'all' && (
            <div>
              <StyledSpan>Active Filter: </StyledSpan>
              <Filter>{filter}</Filter>
            </div>
          )}
        </FilterBox>
        {filterEntries(diaryEntries, filter).map(entry => (
          <DiaryEntry
            key={entry.id}
            entry={entry}
            history={history}
            onDeleteClick={onDeleteClick}
          />
        ))}
      </DiaryEntriesContainer>
    </>
  )
}
