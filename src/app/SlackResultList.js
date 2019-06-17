import React from 'react'
import styled from 'styled-components'
import { filterData } from './utils'

const SlackResult = styled.li`
  align-items: center;
  background: #39133e;
  border-radius: 10px;
  color: #c3b8c5;
  display: flex;
  height: 50px;
  list-style: none;
  margin: 10px 0;
  padding: 10px;
`
const SlackLogo = styled.img`
  width: 10%;
  margin-right: 10px;
`

export function SlackResultList({
  userContacts,
  channels,
  searchInput,
  onContactClick,
  sendAnonymous,
  workOfflineStatus,
}) {
  const filteredResult = filterData(userContacts, channels, searchInput)
  if (workOfflineStatus) {
    return (
      <>
        <p>
          <strong>Sorry, you work offline.</strong>
        </p>
        <p>See settings to go online and share your entry with everybody</p>
      </>
    )
  } else if (channels.length === 0 && userContacts.length === 0) {
    return <p>No connection to slack</p>
  } else if (filteredResult.length !== 0) {
    return filteredResult.map(contact => (
      <SlackResult
        onClick={() => onContactClick(contact.id, contact.name, sendAnonymous)}
        key={contact.id}
      >
        <SlackLogo src="/icons/slacklogo-klein.png" />
        {contact.name}
      </SlackResult>
    ))
  } else {
    return <p>No match found</p>
  }
}
