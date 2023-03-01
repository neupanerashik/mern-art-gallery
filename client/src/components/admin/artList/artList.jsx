import moment from 'moment';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllArts } from '../../../redux/artSlice';
import { deleteArt } from '../../../redux/profileSlice';

// import css
import './artList.css'

const ArtList = () => {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('')
  const { allArts } = useSelector((state) => state.art);
  const [arts, setArts] = useState(allArts);

  useEffect(() => { 
      dispatch(getAllArts({ keyword, category }))
  }, [dispatch, keyword, category]);

  useEffect(() => {
    setArts(allArts);
  }, [allArts]);

  const handleDeleteArtwork = (artId) => {
    dispatch(deleteArt(artId)).then(() => {
      dispatch(getAllArts({keyword, category}));
    });

    setArts((prevArts) => prevArts.filter((art) => art._id !== artId));
  }


  return (
    <div className='artList'>
      <header>
        <div className='search'>
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type='text' placeholder='Search...' value={keyword} onChange={e => setKeyword(e.target.value)} />
        </div>

        <select value={category} onChange={e => setCategory(e.target.value)}>
            <option value='' disabled>Category</option>
            <option value=''>All</option>
            <option value='painting'>Painting</option>
            <option value='photography'>Photography</option>
            <option value='sculpture'>Sculpture</option>
            <option value='drawing'>Drawing</option>
            <option value='digital'>Digital</option>
        </select>
      </header>
      
      <table>
        <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>ID</th>
              <th>Price</th>
              <th>Category</th>
              <th>Posted On</th>
              <th>Actions</th>
            </tr>
          </thead>
        <tbody>
          {
            arts[0] && arts.map((art, index) => {
              return (
                <tr key={art._id}>
                  <td><img src={art.images[0].url} alt="artPic" /></td>
                  <td>{art.name}</td>
                  <td>{art._id}</td>
                  <td>Rs {art.price}</td>
                  <td>{art.category}</td>
                  <td>{moment(art.uploadedAt).format('YYYY-MM-DD')}</td>
                  <td><i className="fa-solid fa-trash-can" onClick={() => handleDeleteArtwork(art._id)}></i></td>
                </tr>
              )
            })
          }

        </tbody>
      </table>

      {!arts[0] && <div className='noUsers'>No artworks!</div>}
    </div>
  )
}

export default ArtList