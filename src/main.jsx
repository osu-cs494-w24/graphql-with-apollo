import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache
} from '@apollo/client'

import App from './App'

const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  headers: {
      Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`
  },
  cache: new InMemoryCache()
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
)
