import React from 'react'
import { type User } from '../types.d'

interface Props {
  showColors: boolean,
  users: User[]
}

function UsersList({ showColors, users }: Props) {
  return (
    <table width='100%'>
      <thead>
        <th>Avatar</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Country</th>
        <th>Action</th>
      </thead>
      <tbody>
        {
          users.map((user, index) => {
            const backgroundColor = index % 2 === 0 ? '#333' : '#555'
            const color = showColors ? backgroundColor : 'transparent'
            return (
              <tr key={ index } style={ { backgroundColor: color } }>
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