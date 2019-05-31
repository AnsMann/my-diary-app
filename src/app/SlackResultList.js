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
  handleContactClick,
}) {
  const filteredResult = filterData(userContacts, channels, searchInput)
  if (filteredResult.length !== 0) {
    return filteredResult.map(contact => (
      <SlackResult
        onClick={() => handleContactClick(contact.id)}
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
