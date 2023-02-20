import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// import css
import './hero.css'

const Hero = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');

  const handleSearch = (event) => {
    if (event.type === 'click' || (event.type === 'keydown' && event.key === 'Enter')) {
      if(keyword === ''){
        event.preventDefault(); // prevent page refresh
        return toast.warn('Please enter a keyword first.');
      } else if (keyword.trim()) {
        navigate(`/search/${keyword}`);
      }
  
      if (event.key === 'Enter') {
        event.preventDefault();
      }
    }
  };
  

  return (

    <>
        <div className='heroContainer'>
          <h2>Find the arts and support the independent artists.</h2>
          <form>
            <input type='text' placeholder='Search...' onChange={e => setKeyword(e.target.value)} value={keyword} onKeyDown={handleSearch} />
            <button onClick={handleSearch}>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
    </>
  )
}

export default Hero