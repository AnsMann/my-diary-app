import React from 'react'
import renderer from 'react-test-renderer'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { mount } from 'enzyme'
import { DeleteEntryModalDialogue } from '../app/homePage/List/DeleteEntryModalDialogue'

Enzyme.configure({ adapter: new Adapter() })

describe('Modaldialogue to confirm or abort deletion', () => {
  it('renders a modal', () => {
    const callback = jest.fn()
    const component = renderer.create(
      <DeleteEntryModalDialogue
        entryDate={new Date()}
        onDeleteConfirmation={callback}
        resetDeleteEntryModal={callback}
        deleteConfirmation={false}
      />
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('triggers a callback when button is clicked', () => {
    const callbackConfirm = jest.fn()
    const callbackAbort = jest.fn()
    const component = mount(
      <DeleteEntryModalDialogue
        entryDate={new Date()}
        onDeleteConfirmation={callbackConfirm}
        resetDeleteEntryModal={callbackAbort}
        deleteConfirmation={true}
      />
    )
    component
      .find('button')
      .at(0)
      .simulate('click')
    expect(callbackConfirm).toHaveBeenCalled()
    component
      .find('button')
      .at(1)
      .simulate('click')
    expect(callbackAbort).toHaveBeenCalled()
    component.unmount()
  })
})
