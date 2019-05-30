import React from 'react'
import styled from 'styled-components'
import { filterContacts } from './utils'

const SlackUser = styled.li`
  list-style: none;
  display: flex;
  align-items: center;
  height: 50px;
  color: #c3b8c5;
  background: #39133e;
  border-radius: 10px;
  padding: 10px;
  margin: 10px 0;
`
const SlackLogo = styled.img`
  width: 20%;
`

export function SlackContactList({ userContacts, searchInput }) {
  const filteredContacts = filterContacts(userContacts, searchInput)
  if (filteredContacts.length !== 0) {
    return filteredContacts.map(contact => (
      <SlackUser key={contact.id}>
        <SlackLogo src="/icons/Slack_Mark_Web.png" />
        {contact.name}
      </SlackUser>
    ))
  } else {
    return <p>No match found</p>
  }
}
