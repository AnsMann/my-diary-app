import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const SaveButton = styled.button`
  background: #007fbf;
  border-radius: 10px;
  color: #ffffff;
  font-size: 1rem;
  height: 30px;
  margin: 5px 0;
  width: 100%;
`

export function FormSubmitButton({ title }) {
  return <SaveButton>{title}</SaveButton>
}

FormSubmitButton.propTypes = {
  title: PropTypes.string,
}
