import React from 'react'
import styled from 'styled-components'
import { AnswerTextArea } from './AnswerTextArea'

const Styledquestion = styled.h4`
  color: #007fbf;
`

export function QuestionCatalogue({ defaultValues = '' }) {
  const questions = [
    {
      question: 'Was waren die wichtigsten Inhalte in meinen eigenen Worten?',
      name: 'content in own words',
      default: `${defaultValues && defaultValues.content}`,
    },
    {
      question: 'Als besonders positiv erinnere ich...',
      name: 'remember positive',
      default: `${defaultValues && defaultValues.positive}`,
    },
    {
      question: 'Als besonders negativ erinnere ich...',
      name: 'remember negative',
      default: `${defaultValues && defaultValues.negative}`,
    },
    {
      question: 'Welches Feedback würde ich meinem Coach heute geben?',
      name: 'coach feedback',
      default: `${defaultValues && defaultValues.coachFeedback}`,
    },
    {
      question: 'Zudem ist mir noch folgendes wichtig...',
      name: 'anything else',
      default: `${defaultValues && defaultValues.additional}`,
    },
  ]

  return questions.map(questionObject => (
    <label key={questions.indexOf(questionObject)}>
      <Styledquestion>{questionObject.question}</Styledquestion>
      <AnswerTextArea
        name={questionObject.name}
        defaultValue={questionObject.default}
      />
    </label>
  ))
}
