import React from 'react'
import renderer from 'react-test-renderer'
import BasicTestWrapper from 'test-utils'
import Resume from '../Resume'

describe('resume page', () => {
  //TODO: to unblock this test we need to integrate apollo-testing package(mocking apollo)
  it.skip('renders propery', () => {
    expect.assertions(1)
    const component = renderer.create(
      <BasicTestWrapper>
        <Resume />
      </BasicTestWrapper>
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})
