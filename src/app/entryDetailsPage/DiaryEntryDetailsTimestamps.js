import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import moment from 'moment'
import 'moment/locale/de'
moment.locale('de')

const StyledDiv = styled.div`
  color: #c3b8c5;
  font-size: 0.8rem;
  margin-bottom: 10px;
`

export function DiaryEntryDetailsTimestamps({ diaryEntry }) {
  const { shared, edit, createDate } = diaryEntry
  return (
    <>
      <StyledDiv>
        Created on <strong>{moment(createDate).format('L')}</strong>
      </StyledDiv>
      {edit.status && (
        <StyledDiv>
          Last edit on <strong>{moment(edit.editOn).format('L')}</strong>
        </StyledDiv>
      )}
      {shared.status && (
        <StyledDiv>
          Last shared with <strong>{shared.sharedWith}</strong>
          <br /> on <strong>{moment(shared.sharedOn).format('L')}</strong>
        </StyledDiv>
      )}
    </>
  )
}

DiaryEntryDetailsTimestamps.propTypes = {
  diaryEntry: PropTypes.object.isRequired,
}
