import React, { useState } from 'react'
import styled from 'styled-components'
import OutsideClickHandler from 'react-outside-click-handler'
import { DiaryEntry } from './DiaryEntry'
import { Header } from './Header'
import { FilterMenu } from './FilterMenu'
import { SortMenu } from './SortMenu'
import { filterEntries, sortEntries } from './utils'
import { DiaryLogo } from './DiaryLogo'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faSort } from '@fortawesome/free-solid-svg-icons'

library.add(faFilter, faSort)

const DiaryEntriesContainer = styled.ul`
  margin: 0;
  overflow: scroll;
  padding: 20px;
`

const Filterbutton = styled.button`
  color: #002f47;
  font-size: 1.5rem;
  position: relative;
`
const Sortbutton = styled.button`
  color: #002f47;
  font-size: 1.5rem;
  position: relative;
  margin-right: 6px;
`

const Filter = styled.span`
  color: #007fbf;
  font-size: 1rem;
`

const FilterBox = styled.div`
  border-bottom: solid 1px #007fbf;
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  align-items: center;
  margin-bottom: 25px;

  div:nth-child(3n) {
    justify-self: end;
  }
  div:nth-last-child(3n) {
    justify-self: start;
  }
`
const StyledSpan = styled.span`
  color: #002f47;
  font-size: 0.7rem;
  margin-right: 10px;
`

export function DiaryEntriesList({ diaryEntries, history, onDeleteClick }) {
  const [filter, setFilter] = useState({ filter: 'all', sortBy: 'all' })
  const [isFilterMenuVisible, setIsFilterMenuVisible] = useState(false)
  const [isSortMenuVisible, setIsSortMenuVisible] = useState(false)

  function handleFilterbuttonClick(changedFilter) {
    setFilter({ ...filter, filter: changedFilter })
  }

  function handleSortbuttonClick(changedSortBy) {
    setFilter({ ...filter, sortBy: changedSortBy })
  }
  const filteredEntries = filterEntries(diaryEntries, filter.filter)
  const sortedAndFilteredEntries = sortEntries(filteredEntries, filter.sortBy)
  return (
    <>
      <Header title={'My Diary Entries'} />
      <DiaryEntriesContainer id="diary">
        <DiaryLogo />
        <FilterBox>
          <OutsideClickHandler
            onOutsideClick={() => setIsFilterMenuVisible(false)}
          >
            <Filterbutton
              onClick={() => setIsFilterMenuVisible(!isFilterMenuVisible)}
            >
              <FontAwesomeIcon icon={faFilter} />
              {isFilterMenuVisible && (
                <FilterMenu
                  onFilterbuttonClick={handleFilterbuttonClick}
                  filter={filter.filter}
                />
              )}
            </Filterbutton>
          </OutsideClickHandler>
          <div>
            {filter.filter !== 'all' && (
              <>
                <StyledSpan>Active Filter: </StyledSpan>
                <Filter>{filter.filter}</Filter>
              </>
            )}
            {filter.sortBy !== 'all' && (
              <>
                <StyledSpan>sorted by: </StyledSpan>
                <Filter>{filter.sortBy}</Filter>
              </>
            )}
          </div>
          <OutsideClickHandler
            onOutsideClick={() => setIsSortMenuVisible(false)}
          >
            <Sortbutton
              onClick={() => setIsSortMenuVisible(!isSortMenuVisible)}
            >
              <FontAwesomeIcon icon={faSort} />
              {isSortMenuVisible && (
                <SortMenu
                  onSortbuttonClick={handleSortbuttonClick}
                  sortBy={filter.sortBy}
                />
              )}
            </Sortbutton>
          </OutsideClickHandler>
        </FilterBox>
        {sortedAndFilteredEntries.map(entry => (
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
