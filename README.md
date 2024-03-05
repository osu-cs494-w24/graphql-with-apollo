# Using Apollo to execute GraphQL queries

We'll use this code as a starting point for exploring how to use [Apollo](https://www.apollographql.com/) to make queries to a GraphQL API.  The first time you run this app, make sure to run `npm install` first, to install needed dependencies.

Also, before running this app, make sure you have the environment variable `VITE_GITHUB_TOKEN` set to contain a [GitHub personal access token](https://help.github.com/articles/creating-an-access-token-for-command-line-use/) with `user` scope as well as `public_repo` scope.  Then, to run the app and see it in your browser, you can run
```
npm run dev
```
This will run the app using Vite's development server.  You should be able to visit the running app by viewing [http://localhost:5173](http://localhost:5173) to view the app in your browser.  The development server is set up to use "Hot Module Replacement" (HMR), so the app will automatically reload in your browser if you make edits to the code.
