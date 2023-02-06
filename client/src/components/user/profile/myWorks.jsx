
// import css and components
import './myWorks.css'
import Seo from '../../seo/seo';
import Card from '../../utility/card/card'

// dummy imports
import images from '../../../assets/images/images.js'
// const images = []

const MyWorks = () => {
    return (
        <>
            <Seo description="Page for demonstrating works of an artist." />

            <div className="worksContainer">
                {images && images[0] &&
                    <div className="myWorks">     
                        {
                            images.map((item, index) => {
                                return(
                                    <Card key={index} data={item} style={{height: '25rem'}} />
                                )
                            })
                        } 
                    </div>
                }

                {!images[0] && <div className="noWorks">You have not uploaded any works yet!</div>}
            </div> 
        </>
    );
}
export default MyWorks;