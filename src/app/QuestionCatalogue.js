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
  text-align: justify;
  width: 100%;
`

export function QuestionCatalogue() {
  const questions = [
    {
      question: 'Was waren die wichtigsten Inhalte in meinen eigenen Worten?',
      name: 'content in own words',
    },
    {
      question: 'Als besonders positiv erinnere ich...',
      name: 'remember positive',
    },
    {
      question: 'Als besonders negativ erinnere ich...',
      name: 'remember negative',
    },
    {
      question: 'Welches Feedback würde ich meinem Coach heute geben?',
      name: 'coach feedback',
    },
    {
      question: 'Zudem ist mir noch folgendes wichtig...',
      name: 'anything else',
    },
  ]

  return questions.map(questionObject => (
    <label key={questions.indexOf(questionObject)}>
      <Styledquestion>{questionObject.question}</Styledquestion>
      <Answer rows="5" placeholder="Type here" name={questionObject.name} />
    </label>
  ))
}
