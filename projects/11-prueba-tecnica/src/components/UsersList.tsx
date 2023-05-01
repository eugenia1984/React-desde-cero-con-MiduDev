import React from 'react'
import { type Result } from '../types.d'

interface Props {
  users: Result[]
}

function UsersList({ users }: Props) {
  return (
    <table>
      <thead>
        <th>Avatar</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Country</th>
        <th>Action</th>
      </thead>
      <tbody>
        {
          users.map(user => {
            return (
              <tr key={ user.id.value }>
                <td><img src={ user.picture.thumbnail } alt={ `${ user.name.first } ${ user.name.last }` } /></td>
                <td>{ user.name.first }</td>
                <td>{ user.name.last }</td>
                <td>{ user.location.country }</td>
                <td><button>Delete</button></td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}

export default UsersList