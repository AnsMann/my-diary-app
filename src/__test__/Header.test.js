import React from 'react'
import renderer from 'react-test-renderer'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Header } from '../app/common/Header'

Enzyme.configure({ adapter: new Adapter() })

describe('Header with different title', () => {
  it('renders an element with required props', () => {
    const component = renderer.create(<Header title={'test title'} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
