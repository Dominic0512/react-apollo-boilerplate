import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import client from './config/apollo'
import { ApolloProvider } from '@apollo/react-hooks'

import 'bootstrap/dist/css/bootstrap.min.css'

import Login from './container/Login'
import Signup from './container/Signup'
import LoggedIn from './container/LoggedIn'

const App = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <h2>My first Apollo app 🚀</h2>
      <Switch>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route path="/signup" exact>
          <Signup />
        </Route>
        <Route path="/logged-in" exact>
          <LoggedIn />
        </Route>
      </Switch>
    </BrowserRouter>
  </ApolloProvider>
)

const wrapper = document.getElementById('app')
wrapper ? ReactDOM.render(<App />, wrapper) : false
