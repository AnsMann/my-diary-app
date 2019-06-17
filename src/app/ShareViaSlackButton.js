import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const ShareButton = styled(Link)`
  text-decoration: none;
  position: relative;
  margin-top: 15px;

  button {
    background: #39133e;
    border-radius: 10px;
    font-size: 1rem;
    padding: 10px;
    width: 110px;
    color: #c3b8c5;
    text-align: left;
  }
`

const SlackLogo = styled.img`
  width: 30%;
  position: absolute;
  bottom: 3px;
`

export function ShareViaSlackButton({ idForURL }) {
  return (
    <ShareButton to={`/entries/${idForURL}/share`}>
      <button>
        Share via <SlackLogo src="/icons/Slack_Mark_Web.png" />
      </button>
    </ShareButton>
  )
}
