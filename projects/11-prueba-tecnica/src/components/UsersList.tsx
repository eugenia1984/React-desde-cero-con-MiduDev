import React from 'react'
import { SortBy, type User } from '../types.d'

interface Props {
  showColors: boolean,
  users: User[],
  deleteUser: (email: string) => void,
  changeSorting: (sort: SortBy) => void
}

function UsersList({ showColors, users, deleteUser, changeSorting }: Props) {
  return (
    <table width='100%'>
      <thead>
        <th>Avatar</th>
        <th className='pointer' onClick={() => { changeSorting(SortBy.NAME)}}>First Name</th>
        <th className='pointer' onClick={() => { changeSorting(SortBy.LAST)}}>Last Name</th>
        <th className='pointer' onClick={() => { changeSorting(SortBy.COUNTRY)}}>Country</th>
        <th>Action</th>
      </thead>
      <tbody className={showColors? 'table-showColors': ''}>
        {
          users.map((user, index) => {
            return (
              <tr key={ user.email } >
                <td><img src={ user.picture.thumbnail } alt={ `${ user.name.first } ${ user.name.last }` } /></td>
                <td>{ user.name.first }</td>
                <td>{ user.name.last }</td>
                <td>{ user.location.country }</td>
                <td><button onClick={ () => { deleteUser(user.email) } }>Delete</button></td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}

export default UsersList