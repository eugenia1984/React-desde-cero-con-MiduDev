import {
  Badge,
  Button,
  Card,
  TextInput,
  Title
} from '@tremor/react'
import { useUsersActions } from '../hooks/useUsersActions';
import { useState } from 'react';

export function CreateNewUser() {
  const { addUser } = useUsersActions()
  const [result, setResult] = useState<'ok' | 'ko' | null>(null)

  const handleSubmit = (event: React.FormEvent<HTMLFormEvent>) => {
    event.preventDefault()

    setResult(null)

    const form = event.target
    const formData = new FormData(form)

    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const github = formData.get('github') as string

    if (!name || !email || !github) {
      return setResult('ko')
    }

    addUser({ name, email, github })
    setResult('ok')
    form.reset()
  }

  return (
    <Card style={ { marginTop: '16px' } }>
      <Title>Create new USer</Title>
      <form onSubmit={ handleSubmit } className="">
        <TextInput
          name="name"
          placeholder="Name here"
        />
        <TextInput
          name="email"
          placeholder="Email here"
        />
        <TextInput
          name="github"
          placeholder="GitHub user here"
        />
        <div>
          <Button
            type="submit"
            style={ { marginTop: '16px' } }
          >
            Create user
          </Button>
          <span>
            { result === 'ok' && <Badge color='green'>Save it ok</Badge> }
            { result === 'ko' && <Badge color='red'>Error with the fields</Badge> }
          </span>
        </div>
      </form>
    </Card>
  )
}