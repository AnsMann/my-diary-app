import React from 'react'
import styled from 'styled-components'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faDatabase } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
library.add(faTrashAlt, faDatabase)

const DatabaseIcon = styled.div`
  color: #002f47;
  width: 15%;
  margin-bottom: 5px;
`
const DatabaseIconLight = styled.div`
  color: #002f47;
  opacity: 0.3;
  width: 15%;
  margin-bottom: 5px;
`

const ToDeleteIcon = styled.div`
  color: red;
  width: 15%;
`

const SlackLogo = styled.img`
  width: 21px;
  position: relative;
  left: -2px;
  margin-bottom: 3px;
`

export function EntryStatusIcons({ entry }) {
  return (
    <>
      {entry.shared.status && <SlackLogo src="/icons/slacklogo-klein.png" />}
      {entry.inDatabase ? (
        <DatabaseIcon>
          <FontAwesomeIcon icon={faDatabase} />
        </DatabaseIcon>
      ) : (
        <DatabaseIconLight>
          <FontAwesomeIcon icon={faDatabase} />
        </DatabaseIconLight>
      )}
      {entry.toDelete && (
        <ToDeleteIcon>
          <FontAwesomeIcon icon={faTrashAlt} />
        </ToDeleteIcon>
      )}
    </>
  )
}

EntryStatusIcons.propTypes = {
  entry: PropTypes.object,
}
