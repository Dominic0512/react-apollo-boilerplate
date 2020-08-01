import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers'
import * as yup from 'yup'
import idx from 'idx'

import { LOGIN } from './schema.gql'

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
})

const Login = () => {
  const history = useHistory()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const [login, loginResp] = useMutation(LOGIN, {
    onCompleted: (resp) => {
      const token = idx(resp, (_) => _.login.user.token)
      localStorage.setItem('token', token)
      setIsAuthenticated(true)
    },
  })

  const loginResolver = (data) => {
    const { email, password } = data
    login({
      variables: {
        email,
        password,
      },
    })
  }

  const { errors, register, handleSubmit } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {},
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    if (isAuthenticated) {
      history.replace('/logged-in')
    }
  }, [isAuthenticated])

  return (
    <div className="d-flex justify-content-center">
      <Form onSubmit={handleSubmit(loginResolver)}>
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="text"
            name="email"
            placeholder="Enter email"
            ref={register}
            isInvalid={!!errors.email}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
          <Form.Control.Feedback type="invalid">
            {errors.email?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            ref={register}
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default Login
