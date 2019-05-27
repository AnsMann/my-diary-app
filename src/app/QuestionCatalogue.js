import React from 'react'
import styled from 'styled-components'

const Styledquestion = styled.h4`
  color: #007fbf;
`

const Answer = styled.textarea`
  border: 1px solid #007fbf;
  border-radius: 10px;
  font-family: inherit;
  font-size: 1rem;
  padding: 15px 20px 0;
  width: 100%;
  text-align: justify;
`

export function Questions() {
  const questions = [
    {
      questionNumber: 1,
      question: 'Was waren die wichtigsten Inhalte in meinen eigenen Worten?',
      name: 'content in own words',
    },
    {
      questionNumber: 2,
      question: 'Als besonders positiv erinnere ich...',
      name: 'remember positive',
    },
    {
      questionNumber: 3,
      question: 'Als besonders negativ erinnere ich...',
      name: 'remember negative',
    },
    {
      questionNumber: 4,
      question: 'Welches Feedback würde ich meinem Coach heute geben?',
      name: 'coach feedback',
    },
    {
      questionNumber: 5,
      question: 'Zudem ist mir noch folgendes wichtig...',
      name: 'anything else',
    },
  ]

  return questions.map(questionObject => (
    <label key={questionObject.questionNumber}>
      <Styledquestion>{questionObject.question}</Styledquestion>
      <Answer rows="5" placeholder="Type here" name={questionObject.name} />
    </label>
  ))
}
