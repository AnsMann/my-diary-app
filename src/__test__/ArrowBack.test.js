import React from 'react'
import renderer from 'react-test-renderer'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { mount } from 'enzyme'
import { ArrowBack } from '../app/ArrowBack'

Enzyme.configure({ adapter: new Adapter() })

describe('Arrowicon as backbutton', () => {
  it('renders an element', () => {
    const component = renderer.create(<ArrowBack />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('triggers a callback when clicked', () => {
    const callback = jest.fn()
    const button = mount(<ArrowBack onBackClick={callback} />)
    button.simulate('click')
    expect(callback).toHaveBeenCalled()
  })
})
