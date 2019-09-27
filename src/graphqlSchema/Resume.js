import gql from 'graphql-tag'

const fragments = {
  workExperience: gql`
    fragment WorkExperience on WorkExperience {
      _id
      company
      companyWebsite
      position
      website
      current
      startDate
      endDate
      summary
      highlights
      scope
      programmingLanguages
      technologies
    }
  `,
  skill: gql`
    fragment Skill on Skill {
      _id
      name
      level
      keywords
      scope
      priority
    }
  `,
}

export const GET_RESUME = gql`
  query Resume {
    resume {
      summary
      languages {
        fluency
        language
      }
      workExperiences {
        ...WorkExperience
      }
      education {
        institution
        area
        startYear
        endYear
      }
      skills {
        ...Skill
      }
    }
  }
  ${fragments.workExperience}
  ${fragments.skill}
`

export const CREATE_SKILL_MUTATION = {
  operationName: `createSkill`,
  gql: gql`
    mutation createSkill($skill: SkillInput) {
      createSkill(skill: $skill) {
        ...Skill
      }
    }
    ${fragments.skill}
  `,
}

export const REMOVE_SKILL_MUTATION = {
  operationName: `removeSkill`,
  gql: gql`
    mutation removeSkill($id: ID!) {
      removeSkill(id: $id)
    }
  `,
}

export const UPDATE_SKILL_MUTATION = {
  operationName: `updateSkill`,
  gql: gql`
    mutation updateSkill($id: ID!, $skill: SkillInput) {
      updateSkill(id: $id, skill: $skill) {
        ...Skill
      }
    }
    ${fragments.skill}
  `,
}
