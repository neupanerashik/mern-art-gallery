import React, { useEffect, useState } from 'react'
import { Image } from 'antd'
import { useParams } from 'react-router-dom'
import { readArtwork } from '../../redux/artSlice';
import { useDispatch, useSelector } from 'react-redux';

// import css
import './download.css'
import axios from 'axios';

const Download = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [downloading, setDownloading] = useState(false);
  const {artwork} = useSelector(state => state.art);

  const handleDownload = async (imageUrl) => {
    try {
      setDownloading(true);
      const { data } = await axios({url: imageUrl, method: 'GET', responseType: 'blob'});
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'artwork.jpg');
      document.body.appendChild(link);
      link.click();
      setDownloading(false);
    } catch (error) {
      console.error(error);
      setDownloading(false);
    }
  };
  
  useEffect(() => {
    dispatch(readArtwork(id));
  }, [id, dispatch]);

  return (
    <>
      <div>
        {
          artwork && artwork.images && artwork.images.map((img, index) => {
            return (
              <div className='downloadContainer'>
                <div className="imgContainer">
                  <Image key={index} src={img.original_image_url}   />
                </div>

                <button disabled={downloading} onClick={() => handleDownload(img.original_image_url)}>
                  <i className="fa-solid fa-arrow-down"></i>
                  <span>Download</span>
                </button>
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default Download