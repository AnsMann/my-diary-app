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
  width: 20%;
`

export function SlackResultList({
  userContacts,
  channels,
  searchInput,
  onContactClick,
}) {
  console.log(channels)
  const filteredResult = filterData(userContacts, channels, searchInput)
  if (channels.length === 0 && userContacts.length === 0) {
    return <p>No connection to slack</p>
  } else if (filteredResult.length !== 0) {
    return filteredResult.map(contact => (
      <SlackResult
        onClick={() => onContactClick(contact.id, contact.name)}
        key={contact.id}
      >
        <SlackLogo src="/icons/Slack_Mark_Web.png" />
        {contact.name}
      </SlackResult>
    ))
  } else {
    return <p>No match found</p>
  }
}
