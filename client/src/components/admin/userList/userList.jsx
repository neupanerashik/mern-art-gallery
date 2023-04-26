import moment from 'moment';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getUsers } from '../../../redux/adminSlice';

// import css
import './userList.css'

const UserList = () => {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState('');
  const { allUsers } = useSelector(state => state.admin);
  const [users, setUsers] = useState(allUsers);

  useEffect(() => {
    dispatch(getUsers({keyword}))
  }, [dispatch, keyword]);

  useEffect(() => {
    setUsers(allUsers);
  }, [allUsers]);

  const handleDeleteUser = (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete the user? This action cannot be undone.");
    if(confirmDelete) {
      dispatch(deleteUser(userId));
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    }
  }


  return (
    <div className='userList'>
      <header>
        <div className='search'>
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type='text' placeholder='Search...' value={keyword} onChange={e => setKeyword(e.target.value)} />
        </div>
      </header>
      
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Joined On</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            users[0] && users.map((user, index) => {
              return (
                <tr key={user._id}> 
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{moment(user.joinedAt).format('YYYY-MM-DD')}</td>
                  <td><i className="fa-solid fa-trash-can" onClick={() => handleDeleteUser(user._id)}></i></td>
                </tr>
              )
            })
          }

        </tbody>
      </table>

      {!users[0] && <div className='noUsers'>No users!</div>}
    </div>
  )
}

export default UserList