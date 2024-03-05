import { useEffect, useState } from 'react'

import UserHeader from '../components/UserHeader'
import ReposList from '../components/ReposList'

/*
 * Caution!!!  This is not a safe way to incorporate an authentication token
 * into your app.  The token will be readable by anyone who runs the code.
 * We're doing it this way for ease of demonstration only.
 */
const token = import.meta.env.VITE_GITHUB_TOKEN
const login = 'octocat'

/*
 * This hook does the actual fetching of the data for the dashboard from
 * GitHub's RESTful API.
 */
function useUserReposWithIssues(login, token) {
  const [ user, setUser ] = useState({})
  const [ repos, setRepos ] = useState([])

  useEffect(() => {
    async function fetchData() {
      setUser({})
      setRepos([])

      /*
       * First, fetch data for the specified user.
       */
      const userRes = await fetch(
        `https://api.github.com/users/${login}`,
        { headers: { Authorization: `token ${token}` } }
      )
      const userResBody = await userRes.json()
      setUser(userResBody)

      /*
       * Next, fetch a list of repos for the specified user.
       */
      const reposRes = await fetch(
        `https://api.github.com/users/${login}/repos?sort=updated`,
        { headers: { Authorization: `token ${token}` } }
      )
      const reposResBody = await reposRes.json()

      /*
       * Finally, truncate the array of repos down to 10, and fetch issues for
       * each repo.  Truncate each array of issues down to 3.
       */
      const reposWithIssues = await Promise.all(reposResBody.slice(0, 10).map(async repo => {
        const issuesRes = await fetch(
          repo.issues_url.replace("{/number}", ""),
          { headers: { Authorization: `token ${token}` } }
        )
        const issuesResBody = await issuesRes.json()
        repo.issues = issuesResBody.slice(0, 3)
        return repo
      }))
      setRepos(reposWithIssues)
    }
    if (token && login) {
      fetchData()
    }
  }, [ login, token ])

  return { user, repos }
}

export default function UserIssuesDashboard() {
  const { user, repos } = useUserReposWithIssues(login, token)
  return (
    <div>
      {token ? (
        <>
          {user.name ? <UserHeader login={login} user={user} /> : <p>Loading user...</p>}
          {repos.length ? <ReposList repos={repos} /> : <p>Loading repos...</p>}
        </>
      ) : (
        <p>
          Rerun with a valid <a href="https://help.github.com/articles/creating-an-access-token-for-command-line-use/">GitHub OAuth Token</a> set in the environment variable <code>REACT_APP_NOT_SECRET_GITHUB_TOKEN</code>
        </p>
      )}
    </div>
  )
}
