import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers'
import * as yup from 'yup'

import idx from 'idx'

import { SIGNUP } from './schema.gql'

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  confirmPassword: yup
    .string()
    .min(8)
    .oneOf([yup.ref('password'), null], 'Passwords must match.')
    .required(),
})

const Signup = () => {
  const history = useHistory()

  const { errors, register, handleSubmit } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {},
    resolver: yupResolver(schema),
  })

  const [signup, signupResp] = useMutation(SIGNUP, {
    onCompleted: (resp) => {
      const user = idx(resp, (_) => _.signup.user)
      history.replace('/')
    },
  })

  const signupResolver = (data) => {
    const { email, password } = data
    signup({
      variables: {
        email,
        password,
      },
    })
  }

  return (
    <div className="d-flex justify-content-center">
      <Form onSubmit={handleSubmit(signupResolver)}>
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="text"
            name="email"
            placeholder="Enter email"
            ref={register}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email?.message}
          </Form.Control.Feedback>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
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
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            placeholder="ConfirmPassword"
            ref={register}
            isInvalid={!!errors.confirmPassword}
          />
          <Form.Control.Feedback type="invalid">
            {errors.confirmPassword?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default Signup
