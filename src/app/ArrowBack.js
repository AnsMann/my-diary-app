import React from 'react'
import styled from 'styled-components'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

library.add(faLongArrowAltLeft)

const Back = styled.div`
  align-items: center;
  background-color: white;
  border: solid 2px #007fbf;
  border-radius: 20px;
  color: #007fbf;
  display: flex;
  font-size: 3.5rem;
  height: 60px;
  justify-content: center;
  left: 13px;
  position: absolute;
  top: 85px;
  width: 80px;
  z-index: 100;
`

export function ArrowBack({ onBackClick, history }) {
  return (
    <Back onClick={() => onBackClick(history)}>
      <FontAwesomeIcon icon={faLongArrowAltLeft} />
    </Back>
  )
}