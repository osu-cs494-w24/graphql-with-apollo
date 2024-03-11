import { useState } from 'react'
import { useMutation, gql } from '@apollo/client'

/*
 * Caution!!!  This is not a safe way to incorporate an authentication token
 * into your app.  The token will be readable by anyone who runs the code.
 * We're doing it this way for ease of demonstration only.
 */
const token = import.meta.env.VITE_GITHUB_TOKEN
const login = 'robwhess'

const mutation = gql`
mutation ChangeUserStatus(
  $emoji: String!,
  $message: String!
) {
  changeUserStatus(input: {
      clientMutationId: "cs494ApolliQuery",
      message: $message,
      emoji: $emoji
  }) {
      status {
          updatedAt
      }
  }
}`

export default function ChangeUserStatus() {
  const [ emoji, setEmoji ] = useState("")
  const [ message, setMessage ] = useState("")

  const [ mutate, { data } ] = useMutation(mutation)

  return (
    <div>
      {token ? (
        <form onSubmit={(e) => {
          e.preventDefault()
          mutate({
            variables: {
              message: message,
              emoji: emoji
            }
          })
          setEmoji("")
          setMessage("")
        }}>
          <div>
            <input
              type="text"
              placeholder="Emoji"
              value={emoji}
              onChange={(e) => setEmoji(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div>
            <button>Submit</button>
            {data && <p>Last updated at: {data.changeUserStatus.status.updatedAt}</p>}
          </div>
        </form>
      ) : (
        <p>
          Rerun with a valid <a href="https://help.github.com/articles/creating-an-access-token-for-command-line-use/">GitHub OAuth Token</a> set in the environment variable <code>REACT_APP_NOT_SECRET_GITHUB_TOKEN</code>
        </p>
      )}
    </div>
  )
}
