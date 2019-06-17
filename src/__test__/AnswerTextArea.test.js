import React from 'react'
import renderer from 'react-test-renderer'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { AnswerTextArea } from '../app/AnswerTextArea'

Enzyme.configure({ adapter: new Adapter() })

describe('AnswerTextArea for form with default values for rows and placeholder', () => {
  it('renders an element', () => {
    const component = renderer.create(<AnswerTextArea />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders an element with props sizes', () => {
    const component = renderer.create(<AnswerTextArea rows={'3'} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders an element with props placeholder', () => {
    const component = renderer.create(
      <AnswerTextArea placeholder={'placeholder'} />
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders an element with props name', () => {
    const component = renderer.create(<AnswerTextArea name={'name'} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders an element with props defaultvalue', () => {
    const component = renderer.create(
      <AnswerTextArea defaultValue={'default value'} />
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders an element with all props', () => {
    const component = renderer.create(
      <AnswerTextArea
        rows={'3'}
        placeholder={'placeholder'}
        name={'name'}
        defaultValue={'default value'}
      />
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
