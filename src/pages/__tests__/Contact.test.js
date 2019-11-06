import React from 'react'
import renderer from 'react-test-renderer'
import BasicTestWrapper from 'test-utils'
import Contact from '../Contact'

describe('contact page', () => {
  it('renders propery', () => {
    expect.assertions(1)
    const component = renderer.create(
      <BasicTestWrapper>
        <Contact />
      </BasicTestWrapper>
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})
