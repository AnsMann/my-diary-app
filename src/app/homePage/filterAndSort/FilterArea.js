import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const FilterGrid = styled.section`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 1fr 1fr;
  justify-self: start;
`
const StyledSpan = styled.span`
  align-items: center;
  color: #002f47;
  display: flex;
  font-size: 0.7rem;
  justify-content: center;
  margin-right: 10px;
`

const Filter = styled.span`
  color: #007fbf;
  font-size: 1rem;
`

export function FilterArea({ filter }) {
  return (
    <FilterGrid>
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
    </FilterGrid>
  )
}

FilterArea.propTypes = {
  filter: PropTypes.object.isRequired,
}
