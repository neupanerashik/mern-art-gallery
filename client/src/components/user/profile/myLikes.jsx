// import css and components
import './myLikes.css'
import Seo from '../../seo/seo';
import Card from '../../utility/card/card';

// dummy import
// import images from '../../../assets/images/images.js'
const images = [];

const Likes = () => {
  return (
    <>
      <Seo description="Page for demonstrating likes of a user.." />

      <div className="likesContainer">
          {images && images[0] &&
              <div className="myLikes">     
                  {
                      images.map((item, index) => {
                          return(
                              <Card key={index} data={item} style={{height: '25rem'}} />
                          )
                      })
                  } 
              </div>
          }

          {!images[0] && <div className="noWorks">You have not liked any art yet!</div>}
      </div>
    </>
  );
}

export default Likes;