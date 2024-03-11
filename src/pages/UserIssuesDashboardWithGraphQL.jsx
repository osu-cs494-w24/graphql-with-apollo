import { useQuery, gql } from '@apollo/client'

import UserHeader from '../components/UserHeaderForGraphQL'
import ReposList from '../components/ReposListForGraphQL'

/*
 * Caution!!!  This is not a safe way to incorporate an authentication token
 * into your app.  The token will be readable by anyone who runs the code.
 * We're doing it this way for ease of demonstration only.
 */
const token = import.meta.env.VITE_GITHUB_TOKEN
const login = 'robwhess'

const query = gql`
query GetUserData($login: String!) {
  user(login: $login) {
      name
      url
      avatarUrl(size: 64)
      repositories(first: 10) {
          nodes {
              name
              url
              issues(first: 3) {
                  nodes {
                      title
                      url
                      createdAt
                  }
              }
          }
      }
  }
}
`

export default function UserIssuesDashboard() {
  const { data, loading, error, refetch } = useQuery(query, {
    variables: {
      login: login
    }
  })
  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {token ? (
        data && data.user && (
          <>
            <UserHeader login={login} user={data.user} />
            <ReposList repos={data.user.repositories.nodes} />
          </>
        )
      ) : (
        <p>
          Rerun with a valid <a href="https://help.github.com/articles/creating-an-access-token-for-command-line-use/">GitHub OAuth Token</a> set in the environment variable <code>REACT_APP_NOT_SECRET_GITHUB_TOKEN</code>
        </p>
      )}
    </div>
  )
}
