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
import { faFilter, faSortAmountUp } from '@fortawesome/free-solid-svg-icons'

library.add(faFilter, faSortAmountUp)

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
  margin-right: 6px;
  position: relative;
`

const Filter = styled.span`
  color: #007fbf;
  font-size: 1rem;
`

const FilterBox = styled.div`
  align-items: center;
  border-bottom: solid 1px #007fbf;
  display: grid;
  grid-template-columns: 4fr 1fr 1fr;
  margin-bottom: 25px;

  div {
    justify-self: end;
  }
`
const StyledSpan = styled.span`
  align-items: center;
  color: #002f47;
  display: flex;
  font-size: 0.7rem;
  justify-content: center;
  margin-right: 10px;
`
const FilterArea = styled.section`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 1fr 1fr;
  justify-self: start;
`

export function DiaryEntriesList({
  diaryEntries,
  history,
  onDeleteClick,
  workOfflineStatus,
}) {
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
          <FilterArea>
            {filter.filter !== 'all' && (
              <>
                <StyledSpan>Active Filter: </StyledSpan>
                <Filter>{filter.filter}</Filter>
              </>
            )}
            {filter.sortBy !== 'all' && (
              <>
                <StyledSpan>Sorted by: </StyledSpan>
                <Filter>{filter.sortBy}</Filter>
              </>
            )}
          </FilterArea>
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
          <OutsideClickHandler
            onOutsideClick={() => setIsSortMenuVisible(false)}
          >
            <Sortbutton
              onClick={() => setIsSortMenuVisible(!isSortMenuVisible)}
            >
              <FontAwesomeIcon icon={faSortAmountUp} />
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
            key={entry._id || entry.id}
            entry={entry}
            history={history}
            onDeleteClick={onDeleteClick}
            workOfflineStatus={workOfflineStatus}
          />
        ))}
      </DiaryEntriesContainer>
    </>
  )
}
