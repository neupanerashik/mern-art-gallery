import React from 'react'
import moment from 'moment'

const NewUsers = ({newUsers}) => {
  return (
    <div className='newUsersContainer'>
        <h2>New Users</h2>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Email</th>
                    <th>Joined</th>
                </tr>
            </thead>
            <tbody>
            {
                newUsers.map((newUser, index) => {
                    return(
                        <tr key={index}>
                            <td>{newUser.name}</td>
                            <td>{newUser.role}</td>
                            <td>{newUser.email}</td>
                            <td>{moment(newUser.joinedAt).format('YYYY-MM-DD')}</td>
                        </tr>
                    );
                })
            }
            </tbody>
        </table>
    </div>
  )
}

export default NewUsers