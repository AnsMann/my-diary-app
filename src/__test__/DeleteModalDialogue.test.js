import React from 'react'
import renderer from 'react-test-renderer'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { mount } from 'enzyme'
import { DeleteModalDialogue } from '../app/DeleteModalDialogue'

Enzyme.configure({ adapter: new Adapter() })

describe('Modaldialogue to confirm or abort deletion', () => {
  it('renders a modal', () => {
    const component = renderer.create(<DeleteModalDialogue />)
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
