import renderer from 'react-test-renderer'
import TitleAndSubtitle from '../TitleAndSubtitle'

test('TitleAndSubtitlerenders properly', () => {
  const component = renderer.create(TitleAndSubtitle)

  let tree = component.toJSON()

  expect(tree).toMatchSnapshot()
})
