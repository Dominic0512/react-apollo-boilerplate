import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import client from './config/apollo'
import { ApolloProvider } from '@apollo/react-hooks'

import 'bootstrap/dist/css/bootstrap.min.css'
// import { Container } from 'react-bootstrap'
import styled from 'styled-components'

import Header from './container/Header'
import Login from './container/Login'
import Signup from './container/Signup'
import LoggedIn from './container/LoggedIn'

const AppWrapper = styled.div`
  position: relative;
  height: 100vh;
  overflow: hidden;
`

const BodyWrapper = styled.div`
  position: flex;
  padding-top: 5rem;
`

const App = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <AppWrapper>
        <Header />
        <BodyWrapper>
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
        </BodyWrapper>
      </AppWrapper>
    </BrowserRouter>
  </ApolloProvider>
)

const wrapper = document.getElementById('app')
wrapper ? ReactDOM.render(<App />, wrapper) : false
