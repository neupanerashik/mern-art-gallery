import moment from 'moment';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllArts, deleteArt } from '../../../../redux/artSlice';

// import css
import './artList.css'
import UpdateArtwork from './updateArtwork';
import { toast } from 'react-toastify';

const ArtList = () => {
  const {id} = useParams()

  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('')
  const [arts, setArts] = useState([]);

  const { allArts, isLoading } = useSelector((state) => state.art);
  const { myData } = useSelector((state) => state.user);

  useEffect(() => { 
      dispatch(getAllArts({ keyword, category }));
  }, [dispatch, keyword, category]);

  useEffect(() => {
    if(allArts){
      if(id) {
        const arts = allArts.filter(art => art.creator.toString() === id)
        setArts(arts)
      }else{
        setArts(allArts)
      }
    }
  }, [allArts, id]);

  const handleDeleteArtwork = (artId) => {
    if(isLoading) return toast.warn("Please, wait for some moment!");
    const confirmDelete = window.confirm("Are you sure you want to delete the art? This action cannot be undone.");
    if(confirmDelete){
      dispatch(deleteArt(artId));
      setArts((prevArts) => prevArts.filter((art) => art._id !== artId));
    }
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
              <th>Discount</th>
              <th>Category</th>
              <th>Posted On</th>
              <th>Actions</th>
            </tr>
          </thead>
        <tbody>
          {
            arts[0] && arts.map((art, index) => {
              return (
                <tr key={index}>
                  <td><img src={art.images[0].url} alt="artPic" /></td>
                  <td>{art.name}</td>
                  <td>{art._id}</td>
                  <td>Rs {art.price}</td>
                  <td>{art.discount} %</td>
                  <td>{art.category}</td>
                  <td>{moment(art.uploadedAt).format('YYYY-MM-DD')}</td>
                  { myData?._id === art.creator &&
                    <td>
                      <UpdateArtwork currentArtwork={art} />
                      <i className="fa-solid fa-trash-can" onClick={() => handleDeleteArtwork(art._id)}></i>
                    </td>
                  }
                </tr>
              )
            })
          }

        </tbody>
      </table>

      {!arts[0] && <div className='noArts'>No artworks!</div>}
    </div>
  )
}

export default ArtList