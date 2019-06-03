import React from 'react'
import styled from 'styled-components'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAt } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope as farEnvelope } from '@fortawesome/free-regular-svg-icons'

library.add(faAt, farEnvelope)

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

export function ShareViaMailButton({ message, entryDate }) {
  return (
    <ShareButton
      href={`mailto:?subject=My diary entry from ${entryDate}&body=${message}`}
    >
      <button>
        Share via <FontAwesomeIcon icon={farEnvelope} />
      </button>
    </ShareButton>
  )
}
