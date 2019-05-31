import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { findIndex, handleSlackContactData } from './utils'
import { getContacts, sendMessage } from './services'
import { SlackContactList } from './SlackContactList'

const ShareContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #007fbf;
  flex-direction: column;
  padding: 20px;

  h2 {
    font-size: 1.4rem;
  }
  p {
    margin-top: 0;
  }
`

const SearchArea = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
  height: 200px;
  position: relative;
`
const ResultArea = styled.section`
  padding: 15px;
  height: 400px;
  overflow: scroll;
  p {
    text-align: center;
  }
`

const StyledSearch = styled.input`
  border: solid 1px #007fbf;
  border-radius: 10px;
  font-size: 1.3rem;
  height: 50px;
  width: 75%;
  padding: 10px;
`
const StyledDiv = styled.div`
  border: solid 1px #007fbf;
  border-radius: 10px;
`
const SearchHelp = styled.span`
  margin: 10px;
  font-size: 0.8rem;
`

const Line = styled.div`
  position: relative;
  left: 10%;
  width: 80%;
  border-bottom: solid 1px #007fbf;
  margin-bottom: 10px;
`

export function ShareDiaryEntry({ match, diaryEntries }) {
  const [searchInput, setSearchInput] = useState('')
  const [slackContacts, setSlackContacts] = useState([])
  const entryIndex = findIndex(match.params.id, diaryEntries)
  const diaryEntryToShare = diaryEntries[entryIndex]

  useEffect(() => {
    async function fetchData() {
      const contacts = await getContacts()
      const SlackContactList = handleSlackContactData(contacts)
      setSlackContacts(SlackContactList)
    }
    fetchData()
  }, [])

  function handleContactClick(contactId) {
    sendMessage(diaryEntryToShare, contactId)
  }

  return (
    <ShareContainer>
      <StyledDiv>
        <SearchArea>
          <h2>Diary Entry from {diaryEntryToShare.date}</h2>
          <p>share with</p>
          <StyledSearch
            type="search"
            placeholder="Search here"
            onChange={event => setSearchInput(event.target.value.toLowerCase())}
          />
          <SearchHelp>Search for channels with #</SearchHelp>
        </SearchArea>
        <Line />
        <ResultArea>
          <SlackContactList
            userContacts={slackContacts}
            searchInput={searchInput}
            handleContactClick={handleContactClick}
          />
        </ResultArea>
      </StyledDiv>
    </ShareContainer>
  )
}
