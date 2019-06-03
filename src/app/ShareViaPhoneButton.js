import React from 'react'
import styled from 'styled-components'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMobileAlt } from '@fortawesome/free-solid-svg-icons'

library.add(faMobileAlt)

const ShareButton = styled.a`
  text-decoration: none;
  position: relative;
  margin-top: 15px;

  button {
    background: white;
    border-radius: 10px;
    border: solid 1px #007fbf;
    font-size: 1rem;
    padding: 10px;
    width: 110px;
    color: #007fbf;
    text-align: left;
  }
`

export function ShareViaPhoneButton({ message }) {
  return (
    <ShareButton href={`sms:&body=${message}`}>
      <button>
        Share via <FontAwesomeIcon icon={faMobileAlt} />
      </button>
    </ShareButton>
  )
}
