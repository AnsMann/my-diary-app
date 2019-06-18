import React from 'react'
import styled from 'styled-components'
import { FilterArea } from './FilterArea'
import { FilterEntries } from './FilterEntries'
import { SortEntries } from './SortEntries'
import PropTypes from 'prop-types'

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

export function FilterAndSort({
  filter,
  onFilterbuttonClick,
  onSortbuttonClick,
}) {
  return (
    <FilterBox>
      <FilterArea filter={filter} />
      <FilterEntries
        onFilterbuttonClick={onFilterbuttonClick}
        filter={filter.filter}
      />
      <SortEntries
        onSortbuttonClick={onSortbuttonClick}
        sortBy={filter.sortBy}
      />
    </FilterBox>
  )
}

FilterAndSort.propTypes = {
  filter: PropTypes.object.isRequired,
  onFilterbuttonClick: PropTypes.func.isRequired,
  onSortbuttonClick: PropTypes.func.isRequired,
}
