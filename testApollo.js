import { ApolloClient, gql, InMemoryCache } from '@apollo/client/core/core.cjs'
import dotenv from 'dotenv'

dotenv.config({ path: ".env.local" })

const client = new ApolloClient({
    uri: "https://api.github.com/graphql",
    headers: {
        Authorization: `Bearer ${process.env.VITE_GITHUB_TOKEN}`
    },
    cache: new InMemoryCache()
})

const query = gql`
    query {
        user(login: "octocat") {
            name
            url
            avatarUrl
        }
    }
`

client.query({ query })
    .then(result => console.log(result))
