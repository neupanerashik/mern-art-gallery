import moment from 'moment'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromLikes } from '../../../../redux/artSlice'; 

// import css and components
import './likes.css'
import Seo from '../../../seo/seo';
import { getMyProfile } from '../../../../redux/userSlice';

const Likes = () => {
  const dispatch = useDispatch()
  const [likes, setLikes] = useState([]);
  const {myData} = useSelector(state => state.user);

  const handleRemoveFromLikes = (artId) => {
    dispatch(removeFromLikes(artId)).then(() => {
      dispatch(getMyProfile());
    });
  };
  

  useEffect(() => {
    if (myData && myData?.likes) {
     setLikes(myData?.likes);
    }
  }, [myData]);

  return (
    <>
      <Seo description="Page for demonstrating likes of a user.." />

      <div className="likesContainer">
        {likes[0] && 
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>ID</th>
                <th>Price</th>
                <th>Category</th>
                <th>Liked On</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {likes.map((like) => (
                <tr key={like._id}>
                  <td><img src={like.artImage} alt="artPic" /></td>
                  <td>{like.artName}</td>
                  <td>{like.artId}</td>
                  <td>Rs {like.artPrice}</td>
                  <td>{like.artCategory}</td>
                  <td>{moment(like.artLikedOn).format('YYYY-MM-DD')}</td>
                  <td><i className="fa-solid fa-trash-can" onClick={() => handleRemoveFromLikes(like.artId)}></i></td>
                </tr>
              ))}
            </tbody>
          </table>
        }

        {!likes[0] && <div className="noLikes">You have not liked any art yet!</div>}
      </div>
    </>
  );
}

export default Likes;