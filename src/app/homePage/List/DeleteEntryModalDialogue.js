import React from 'react'
import styled from 'styled-components'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTrashAlt,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import 'moment/locale/de'
import PropTypes from 'prop-types'
moment.locale('de')

library.add(faTrashAlt, faExclamationTriangle)

const Dialogue = styled.div`
  align-items: center;
  background: white;
  border: solid 2px #007fbf;
  border-radius: 10px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
  color: #007fbf;
  display: flex;
  flex-direction: column;
  font-size: 1.3rem;
  justify-content: center;
  padding: 10px 0;
  span {
    line-height: 150%;
    text-align: center;
  }
`

const StyledIcon = styled.span`
  color: red;
  font-size: 2rem;
  margin-top: 10px;
`

export const StyledButton = styled.button`
  background: #007fbf;
  border-radius: 10px;
  color: #ffffff;
  font-size: 1.5rem;
  margin-top: 20px;
  padding: 5px;
  width: 80%;
`

export function DeleteEntryModalDialogue({
  entryDate,
  onDeleteConfirmation,
  resetDeleteEntryModal,
  deleteConfirmation,
}) {
  return deleteConfirmation ? (
    <Dialogue>
      <span>
        Delete entry from
        <br />
        <strong>{moment(entryDate).format('L')}</strong>
      </span>
      <StyledIcon>
        <FontAwesomeIcon icon={faTrashAlt} />
      </StyledIcon>
      <StyledButton onClick={() => onDeleteConfirmation()}>Ok</StyledButton>
      <StyledButton onClick={() => resetDeleteEntryModal()}>Abort</StyledButton>
    </Dialogue>
  ) : (
    <Dialogue>
      <strong>Failed to Delete</strong>
      <StyledIcon>
        <FontAwesomeIcon icon={faExclamationTriangle} />
      </StyledIcon>
      <StyledButton onClick={() => resetDeleteEntryModal()}>Ok</StyledButton>
    </Dialogue>
  )
}

DeleteEntryModalDialogue.propTypes = {
  entryDate: PropTypes.object.isRequired,
  onDeleteConfirmation: PropTypes.func.isRequired,
  resetDeleteEntryModal: PropTypes.func.isRequired,
  deleteConfirmation: PropTypes.bool.isRequired,
}
