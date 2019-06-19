import React, { useState } from 'react'
import styled from 'styled-components'
import { DiaryEntry } from './DiaryEntry'
import { Header } from '../../common/Header.js'
import { filterEntries, sortEntries } from '../../utils.js'
import { DiaryLogo } from '../../common/DiaryLogo.js'
import { FilterAndSort } from '../filterAndSort/FilterAndSort'
import PropTypes from 'prop-types'

const DiaryEntriesContainer = styled.ul`
  margin: 0;
  overflow: scroll;
  padding: 20px;
`

export function DiaryEntriesList({
  diaryEntries,
  history,
  onDeleteClick,
  workOfflineStatus,
}) {
  const [filter, setFilter] = useState({ filter: 'all', sortBy: 'all' })

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
        <FilterAndSort
          filter={filter}
          onFilterbuttonClick={handleFilterbuttonClick}
          onSortbuttonClick={handleSortbuttonClick}
        />
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

DiaryEntriesList.propTypes = {
  diaryEntries: PropTypes.array,
  history: PropTypes.object.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  workOfflineStatus: PropTypes.bool.isRequired,
}
