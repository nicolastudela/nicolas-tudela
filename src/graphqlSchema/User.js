import gql from 'graphql-tag'

const fragments = {
  user: gql`
    fragment User on User {
      email
      role
    }
  `,
  personalData: gql`
    fragment PersonalData on Personal {
      name
      label
      picture
      phone
      website
      summary
      interests {
        name
        keywords
      }
      profiles {
        network
        username
        url
      }
    }
  `,
}
export const SIGN_IN = gql`
  mutation signin($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      user {
        ...User
      }
      token
    }
  }
  ${fragments.user}
`
export const ME = gql`
  query Me {
    me {
      ...User
      personalData {
        ...PersonalData
      }
    }
  }
  ${fragments.user}
  ${fragments.personalData}
`

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`
