import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloud } from '@fortawesome/free-solid-svg-icons'

library.add(faCloud)

const SlackResult = styled(Link)`
  /*align-items: center;
  background: #39133e;
  border-radius: 20px;
  color: #c3b8c5;
  display: flex;
  height: 60px;
  justify-content: center;
  padding: 5px;
  text-decoration: none;
  width: 80px;*/
  font-size: 5rem;
  color: #39133e;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const SlackLogo = styled.img`
  width: 100%;
  position: absolute;
  right: 0px;
  bottom: -25px;
`

export function ShareViaSlackButton({ idForURL }) {
  return (
    <SlackResult to={`/cards/${idForURL}/share`}>
      <div>
        <FontAwesomeIcon icon={faCloud} />
        <SlackLogo src="/icons/Slack_Mark_Web.png" />
      </div>
    </SlackResult>
  )
}
