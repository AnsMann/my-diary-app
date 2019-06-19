import React from 'react'
import styled from 'styled-components'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'

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
  width: 80px;
`

export function ArrowBack({ onBackClick, history }) {
  return (
    <Back onClick={() => onBackClick(history)}>
      <FontAwesomeIcon icon={faLongArrowAltLeft} />
    </Back>
  )
}

ArrowBack.propTypes = {
  onBackClick: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
}
