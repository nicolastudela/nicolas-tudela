import React from 'react'
import renderer from 'react-test-renderer'
import BasicTestWrapper from 'test-utils'
import Home from '../Home'

describe('renders properly', () => {
  it('renders propery', () => {
    expect.assertions(1)
    const component = renderer.create(
      <BasicTestWrapper>
        <Home />
      </BasicTestWrapper>
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})
