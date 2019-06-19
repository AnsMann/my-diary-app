import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import moment from 'moment'
import 'moment/locale/de'
moment.locale('de')

const Search = styled.section`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 40%;
  justify-content: center;
  margin-top: 20px;
  padding: 15px;
  position: relative;
`
const StyledSearch = styled.input`
  border: solid 1px #007fbf;
  border-radius: 10px;
  font-size: 1.3rem;
  height: 50px;
  padding: 10px;
  width: 75%;
`
const SearchHelp = styled.span`
  font-size: 0.8rem;
  margin: 10px;
`

export function SearchArea({ diaryEntryDate, onSeachInputChange }) {
  return (
    <Search>
      <h2>Diary Entry from {moment(diaryEntryDate).format('L')}</h2>
      <p>share with</p>
      <StyledSearch
        type="search"
        placeholder="Search here"
        onChange={event => onSeachInputChange(event.target.value.toLowerCase())}
      />
      <SearchHelp>Search for channels with #</SearchHelp>
    </Search>
  )
}

SearchArea.propTypes = {
  onSeachInputChange: PropTypes.func.isRequired,
  diaryEntryDate: PropTypes.object.isRequired,
}
