import React from 'react'
import styled from 'styled-components'
import { filterContacts } from './utils'

const SlackUser = styled.li`
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

export function SlackContactList({
  userContacts,
  searchInput,
  handleContactClick,
}) {
  const filteredContacts = filterContacts(userContacts, searchInput)
  if (filteredContacts.length !== 0) {
    return filteredContacts.map(contact => (
      <SlackUser
        onClick={() => handleContactClick(contact.id)}
        key={contact.id}
      >
        <SlackLogo src="/icons/Slack_Mark_Web.png" />
        {contact.name}
      </SlackUser>
    ))
  } else {
    return <p>No match found</p>
  }
}
