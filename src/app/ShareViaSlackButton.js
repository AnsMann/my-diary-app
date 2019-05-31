import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const SlackResult = styled(Link)`
  align-items: center;
  background: #39133e;
  border-radius: 20px;
  color: #c3b8c5;
  display: flex;
  font-size: 1.3rem;
  height: 60px;
  justify-content: center;
  padding: 5px;
  text-decoration: none;
  width: 80px;
`

const SlackLogo = styled.img`
  width: 120%;
`

export function ShareViaSlackButton({ idForURL }) {
  return (
    <SlackResult to={`/cards/${idForURL}/share`}>
      <SlackLogo src="/icons/Slack_Mark_Web.png" />
    </SlackResult>
  )
}
