import React, { useState } from 'react'
import styled from 'styled-components'
import OutsideClickHandler from 'react-outside-click-handler'
import { DayRatingInput } from './DayRatingInput'
import { ShowDayRating } from './ShowDayRating'
import PropTypes from 'prop-types'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
library.add(faPencilAlt)

const SaveButton = styled.button`
  background: #007fbf;
  border-radius: 10px;
  color: #ffffff;
  font-size: 1rem;
  height: 30px;
  margin: 5px 0;
  width: 100%;
`

const EditIcon = styled.div`
  color: #007fbf;
  display: inline;
  font-size: 1rem;
  position: relative;
  top: -50px;
  right: -275px;
`

export function ShowRating({ rating, onEditDetail }) {
  const [isRatingEditable, setIsRatingEditable] = useState(false)

  return isRatingEditable ? (
    <OutsideClickHandler onOutsideClick={() => setIsRatingEditable(false)}>
      <form
        onSubmit={event => {
          event.preventDefault()
          onEditDetail('rating', event.target.dayrating.value)
          setIsRatingEditable(false)
        }}
      >
        <label>
          <DayRatingInput defaultValue={rating} />
        </label>
        <SaveButton>Change rating</SaveButton>
      </form>
    </OutsideClickHandler>
  ) : (
    <div onClick={() => setIsRatingEditable(true)}>
      <ShowDayRating entryRating={rating} />
      <EditIcon>
        <FontAwesomeIcon icon={faPencilAlt} />
      </EditIcon>
    </div>
  )
}
ShowRating.propTypes = {
  rating: PropTypes.number,
  onEditDetail: PropTypes.func.isRequired,
}
