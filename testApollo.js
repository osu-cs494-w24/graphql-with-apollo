import { ApolloClient, gql, InMemoryCache } from '@apollo/client'
import 'dotenv'

const client = new ApolloClient({
    uri: "https://api.github.com/graphql",
    headers: {
        Authorization: `Bearer ${process.env.VITE_GITHUB_TOKEN}`
    }
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
