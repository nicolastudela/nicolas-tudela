import { gql } from 'apollo-boost'

const fragments = {
  workExperience: gql`
    fragment WorkExperience on WorkExperience {
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
      name
      level
      keywords
      scope
    }
  `,
}

// eslint-disable-next-line import/prefer-default-export
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
