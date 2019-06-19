import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { ArrowBack } from './ArrowBack'
import { SlackResultList } from './SlackResultList'
import { getLocalStorage, getSlackInfo, setLocalStorage } from './services'
import { handleSlackContactData, handleSlackChannelData } from './utils'
import { SearchArea } from './SearchArea'
import PropTypes from 'prop-types'

const StyledDiv = styled.div`
  border: solid 1px #007fbf;
  border-radius: 10px;
`

const Line = styled.div`
  border-bottom: solid 1px #007fbf;
  left: 10%;
  margin-bottom: 10px;
  position: relative;
  width: 80%;
`

const ResultArea = styled.section`
  height: 32vh;
  overflow: scroll;
  padding: 15px;
  p {
    text-align: center;
  }
`
const BackButton = styled.div`
  left: 13px;
  position: absolute;
  top: 85px;
  z-index: 50;
`

export function ShareOverview({
  onContactClick,
  onBackClick,
  sendAnonymous,
  workOfflineStatus,
  history,
  diaryEntryToShare,
}) {
  const [searchInput, setSearchInput] = useState('')
  const [slackContacts, setSlackContacts] = useState(
    getLocalStorage('contacts') || []
  )
  const [slackChannels, setSlackChannels] = useState(
    getLocalStorage('channels') || []
  )

  useEffect(() => {
    async function fetchContacts() {
      const contacts = await getSlackInfo('users').then(data => data.members)
      const SlackContactList = handleSlackContactData(contacts || [])
      setSlackContacts(SlackContactList)
      setLocalStorage('contacts', SlackContactList)
    }
    fetchContacts()
  }, [])

  useEffect(() => {
    async function fetchChannels() {
      const channels = await getSlackInfo('channels').then(
        data => data.channels
      )
      const SlackChannelList = handleSlackChannelData(channels || [])
      setSlackChannels(SlackChannelList)
      setLocalStorage('channels', SlackChannelList)
    }
    fetchChannels()
  }, [])

  function handleSearchInputChange(searchInput) {
    setSearchInput(searchInput)
  }

  return (
    <StyledDiv>
      <BackButton>
        <ArrowBack onBackClick={onBackClick} history={history} />
      </BackButton>
      <SearchArea
        diaryEntryDate={diaryEntryToShare.date}
        onSeachInputChange={handleSearchInputChange}
      />
      <Line />
      <ResultArea>
        <SlackResultList
          userContacts={slackContacts}
          channels={slackChannels}
          searchInput={searchInput}
          onContactClick={onContactClick}
          sendAnonymous={sendAnonymous}
          workOfflineStatus={workOfflineStatus}
        />
      </ResultArea>
    </StyledDiv>
  )
}

ShareOverview.propTypes = {
  onContactClick: PropTypes.func.isRequired,
  onBackClick: PropTypes.func.isRequired,
  sendAnonymous: PropTypes.bool.isRequired,
  workOfflineStatus: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  diaryEntryToShare: PropTypes.object.isRequired,
}
