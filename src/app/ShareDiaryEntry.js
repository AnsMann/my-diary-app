import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import 'moment/locale/de'

import {
  findIndex,
  handleSlackContactData,
  handleSlackChannelData,
} from './utils'
import {
  getContacts,
  sendMessage,
  setLocalStorage,
  getLocalStorage,
  getChannels,
} from './services'
import { SlackResultList } from './SlackResultList'
import { Header } from './Header'
import { ShareModalDialogue } from './ShareModalDialogue'
import { ArrowBack } from './ArrowBack'

moment.locale('de')

const ShareContainer = styled.section`
  align-items: center;
  color: #007fbf;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;

  h2 {
    font-size: 1.4rem;
  }
  p {
    margin-top: 0;
  }
`
const StyledDiv = styled.div`
  border: solid 1px #007fbf;
  border-radius: 10px;
  height: 90%;
`

const SearchArea = styled.section`
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

const Line = styled.div`
  border-bottom: solid 1px #007fbf;
  left: 10%;
  margin-bottom: 10px;
  position: relative;
  width: 80%;
`

const ResultArea = styled.section`
  height: 35vh;
  overflow: scroll;
  padding: 15px;
  p {
    text-align: center;
  }
`
export function ShareDiaryEntry({
  diaryID,
  diaryEntries,
  history,
  onBackClick,
  onShare,
}) {
  const [searchInput, setSearchInput] = useState('')
  const [slackContacts, setSlackContacts] = useState(
    getLocalStorage('contacts') || []
  )
  const [slackChannels, setSlackChannels] = useState(
    getLocalStorage('channels') || []
  )
  const [modalStatus, setModalStatus] = useState({
    showModal: false,
    shareWith: '',
  })

  const entryIndex = findIndex(diaryID, diaryEntries)
  const diaryEntryToShare = diaryEntries[entryIndex]

  useEffect(() => {
    async function fetchContacts() {
      const contacts = await getContacts()
      const SlackContactList = handleSlackContactData(contacts || [])
      setSlackContacts(SlackContactList)
      setLocalStorage('contacts', SlackContactList)
    }
    fetchContacts()
  }, [])

  useEffect(() => {
    async function fetchChannels() {
      const channels = await getChannels()
      const SlackChannelList = handleSlackChannelData(channels || [])
      setSlackChannels(SlackChannelList)
      setLocalStorage('channels', SlackChannelList)
    }
    fetchChannels()
  }, [])

  function handleContactClick(contactId, contactName) {
    sendMessage(diaryEntryToShare, contactId).then(res => {
      res.ok
        ? setModalStatus({ showModal: true, shareWith: contactName })
        : setModalStatus({ showModal: true, shareWith: '' })
    })
  }

  function handleModalButtonClick(history, success, contactName) {
    if (success) {
      const sharedDiaryEntry = {
        ...diaryEntryToShare,
        shared: {
          status: true,
          sharedWith: contactName,
          sharedOn: moment(),
        },
      }
      onShare(sharedDiaryEntry, entryIndex)
    } else {
      setModalStatus({ showModal: false, shareWith: '' })
    }
    history.push('/')
  }

  return (
    <>
      <Header title={'Share via slack'} />
      {modalStatus.showModal && (
        <ShareModalDialogue
          onModalButtonClick={handleModalButtonClick}
          shareWith={modalStatus.shareWith}
          history={history}
        />
      )}
      <ShareContainer>
        <StyledDiv>
          <ArrowBack onBackClick={onBackClick} history={history} />
          <SearchArea>
            <h2>
              Diary Entry from {moment(diaryEntryToShare.date).format('L')}
            </h2>
            <p>share with</p>
            <StyledSearch
              type="search"
              placeholder="Search here"
              onChange={event =>
                setSearchInput(event.target.value.toLowerCase())
              }
            />
            <SearchHelp>Search for channels with #</SearchHelp>
          </SearchArea>
          <Line />
          <ResultArea>
            <SlackResultList
              userContacts={slackContacts}
              channels={slackChannels}
              searchInput={searchInput}
              onContactClick={handleContactClick}
            />
          </ResultArea>
        </StyledDiv>
      </ShareContainer>
    </>
  )
}
