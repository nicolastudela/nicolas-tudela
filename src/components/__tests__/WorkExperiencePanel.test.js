import React from 'react'
import renderer from 'react-test-renderer'
import BasicTestWrapper from 'test-utils'
import WorkExperiencesPanel from 'components/WorkExperiencesPanel'

describe('workExperiencePanel', () => {
  it('renders properly', () => {
    expect.assertions(1)
    const component = renderer.create(
      <BasicTestWrapper>
        <WorkExperiencesPanel />
      </BasicTestWrapper>
    )

    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})
